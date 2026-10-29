<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HeaderSetting;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HeaderSettingsController extends Controller
{
    public function index()
    {
        $header = HeaderSetting::first();
        
        if ($header && $header->logo_image) {
            $header->logo_image = url('uploads/header/' . $header->logo_image);
        }

        return response()->json([
            'status' => 'Ok',
            'data' => $header
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'logo_text' => 'nullable|string',
            'image_id' => 'nullable|exists:temp_images,id',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'map_address' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        if (HeaderSetting::count() > 0) {
            return response()->json(['status' => 'Fail', 'message' => 'Data already exists. Use update instead.'], 400);
        }

        $imageName = null;

        if ($request->filled('image_id')) {
            $tempImage = TempImage::find($request->image_id);
            $source = public_path('uploads/temp_images/' . $tempImage->name);
            $directory = public_path('uploads/header');

            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }

            if (file_exists($source)) {
                $imageName = $tempImage->name;
                rename($source, $directory . '/' . $imageName);
                $tempImage->delete();
            }
        }

        $header = new HeaderSetting();
        $header->logo_text = $request->logo_text;
        $header->phone = $request->phone;
        $header->email = $request->email;
        $header->map_address = $request->map_address;
        $header->logo_image = $imageName;
        $header->save();

        if ($header->logo_image) {
            $header->logo_image = url('uploads/header/' . $header->logo_image);
        }

        return response()->json([
            'status' => 'Ok',
            'message' => 'Header settings created successfully!',
            'data' => $header
        ], 201);
    }

    public function update($id, Request $request)
    {
        $header = HeaderSetting::find($id);

        if (!$header) {
            return response()->json(['status' => 'Fail', 'message' => 'Header settings not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'logo_text' => 'nullable|string',
            'image_id' => 'nullable|exists:temp_images,id',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'map_address' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $directory = public_path('uploads/header');

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

                if ($header->logo_image && file_exists($directory . '/' . $header->logo_image)) {
                    unlink($directory . '/' . $header->logo_image);
                }

                $header->logo_image = $newImageName;
                $tempImage->delete();
            }
        }

        if ($request->has('logo_text')) $header->logo_text = $request->logo_text;
        if ($request->has('phone')) $header->phone = $request->phone;
        if ($request->has('email')) $header->email = $request->email;
        if ($request->has('map_address')) $header->map_address = $request->map_address;

        $header->save();

        if ($header->logo_image) {
            $header->logo_image = url('uploads/header/' . $header->logo_image);
        }

        return response()->json([
            'status' => 'Ok',
            'message' => 'Header settings updated successfully!',
            'data' => $header
        ], 200);
    }
}