<?php

namespace App\Http\Controllers;

use App\Models\FooterSetting;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FooterSettingsController extends Controller
{
    public function index()
    {
        $footer = FooterSetting::first();
        
        if ($footer && $footer->logo_image) {
            $footer->logo_image = url('uploads/footer/' . $footer->logo_image);
        }

        return response()->json([
            'status' => 'Ok',
            'data' => $footer
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string',
            'copyright_text' => 'nullable|string',
            'image_id' => 'nullable|exists:temp_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        if (FooterSetting::count() > 0) {
            return response()->json(['status' => 'Fail', 'message' => 'Data already exists. Use update instead.'], 400);
        }

        $imageName = null;

        if ($request->filled('image_id')) {
            $tempImage = TempImage::find($request->image_id);
            $source = public_path('uploads/temp_images/' . $tempImage->name);
            $directory = public_path('uploads/footer');

            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }

            if (file_exists($source)) {
                $imageName = $tempImage->name;
                rename($source, $directory . '/' . $imageName);
                $tempImage->delete();
            }
        }

        $footer = new FooterSetting();
        $footer->description = $request->description;
        $footer->copyright_text = $request->copyright_text;
        $footer->logo_image = $imageName;
        $footer->save();

        if ($footer->logo_image) {
            $footer->logo_image = url('uploads/footer/' . $footer->logo_image);
        }

        return response()->json([
            'status' => 'Ok',
            'message' => 'Footer settings created successfully!',
            'data' => $footer
        ], 201);
    }

    public function update($id, Request $request)
    {
        $footer = FooterSetting::find($id);

        if (!$footer) {
            return response()->json(['status' => 'Fail', 'message' => 'Footer settings not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string',
            'copyright_text' => 'nullable|string',
            'image_id' => 'nullable|exists:temp_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $directory = public_path('uploads/footer');

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

                if ($footer->logo_image && file_exists($directory . '/' . $footer->logo_image)) {
                    unlink($directory . '/' . $footer->logo_image);
                }

                $footer->logo_image = $newImageName;
                $tempImage->delete();
            }
        }

        if ($request->has('description')) $footer->description = $request->description;
        if ($request->has('copyright_text')) $footer->copyright_text = $request->copyright_text;

        $footer->save();

        if ($footer->logo_image) {
            $footer->logo_image = url('uploads/footer/' . $footer->logo_image);
        }

        return response()->json([
            'status' => 'Ok',
            'message' => 'Footer settings updated successfully!',
            'data' => $footer
        ], 200);
    }
}