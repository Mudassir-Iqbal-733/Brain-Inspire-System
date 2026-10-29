<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::orderBy('created_at', 'desc')->get();
        
        $videos->transform(function ($video) {
            if ($video->video_file) {
                $video->video_url = url('uploads/videos/' . $video->video_file);
            } else {
                $video->video_url = null;
            }
            return $video;
        });

        return response()->json(['status' => 'Ok', 'data' => $videos], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string',
            'video' => 'required|file|max:51200', // 50MB limit
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'Fail', 
                'message' => $validator->errors()->first()
            ], 422);
        }

        $directory = public_path('uploads/videos');
        if (!File::isDirectory($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        $file = $request->file('video');
        $extension = $file->getClientOriginalExtension() ?: 'mp4'; 
        $fileName = time() . '_' . uniqid() . '.' . $extension;
        
        $file->move($directory, $fileName);

        $video = Video::create([
            'title' => $request->title,
            'video_file' => $fileName
        ]);

        $video->video_url = url('uploads/videos/' . $video->video_file);

        return response()->json([
            'status' => 'Ok', 
            'message' => 'Video uploaded successfully!', 
            'data' => $video
        ], 201);
    }

    public function destroy($id)
    {
        $video = Video::find($id);
        if (!$video) {
            return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);
        }

        $filePath = public_path('uploads/videos/' . $video->video_file);
        if (File::exists($filePath)) {
            File::delete($filePath);
        }

        $video->delete();
        return response()->json(['status' => 'Ok', 'message' => 'Deleted successfully'], 200);
    }
}