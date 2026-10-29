<?php

namespace App\Http\Controllers;

use App\Models\DirectorMessage;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DirectorMessageController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type', 'director');
        $data = DirectorMessage::where('type', $type)->first();
        
        if ($data && $data->image) {
            $data->image = url('uploads/directors/' . $data->image);
        }

        return response()->json([
            'status' => 'Ok',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|in:director,managing-director',
            'name' => 'nullable|string',
            'title' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'message' => 'nullable|string',
            'image_id' => 'nullable|exists:temp_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $director = DirectorMessage::firstOrCreate(['type' => $request->type]);
        
        $imageName = $director->image;

        if ($request->filled('image_id')) {
            $tempImage = TempImage::find($request->image_id);
            $source = public_path('uploads/temp_images/' . $tempImage->name);
            $directory = public_path('uploads/directors');

            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }

            if (file_exists($source)) {
                $imageName = $tempImage->name;
                rename($source, $directory . '/' . $imageName);
                
                if ($director->image && file_exists($directory . '/' . $director->image)) {
                    unlink($directory . '/' . $director->image);
                }
                
                $tempImage->delete();
            }
        }

        $director->name = $request->name;
        $director->title = $request->title;
        $director->email = $request->email;
        $director->phone = $request->phone;
        $director->message = $request->message;
        $director->image = $imageName;
        $director->save();

        if ($director->image) {
            $director->image = url('uploads/directors/' . $director->image);
        }

        return response()->json([
            'status' => 'Ok',
            'message' => 'Director data saved successfully!',
            'data' => $director
        ], 200);
    }

   
    public function update(Request $request, $type)
    {
        $director = DirectorMessage::where('type', $type)->first();

        if (!$director) {
            return response()->json(['status' => 'Fail', 'message' => 'Data not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string',
            'title' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'message' => 'nullable|string',
            'image_id' => 'nullable|exists:temp_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $directory = public_path('uploads/directors');

        if ($request->filled('image_id')) {
            $tempImage = TempImage::find($request->image_id);
            $source = public_path('uploads/temp_images/' . $tempImage->name);

            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }

            if (file_exists($source)) {
                $newImageName = $tempImage->name;
                $destination = $directory . '/' . $newImageName;

                rename($source, $destination);

                if ($director->image && file_exists($directory . '/' . $director->image)) {
                    unlink($directory . '/' . $director->image);
                }

                $director->image = $newImageName;
                $tempImage->delete();
            }
        }

    
        if ($request->has('name')) $director->name = $request->name;
        if ($request->has('title')) $director->title = $request->title;
        if ($request->has('email')) $director->email = $request->email;
        if ($request->has('phone')) $director->phone = $request->phone;
        if ($request->has('message')) $director->message = $request->message;

        $director->save();

        if ($director->image) {
            $director->image = url('uploads/directors/' . $director->image);
        }

        return response()->json([
            'status' => 'Ok',
            'message' => 'Updated successfully!',
            'data' => $director
        ], 200);
    }
}