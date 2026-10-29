<?php

namespace App\Http\Controllers;

use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
public function addImage(Request $req)
{
    $validator = Validator::make($req->all(), [
        'image' => 'required|mimes:jpg,jpeg,png,webp,svg|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 'Fail',
            'message' => 'Please fix errors.',
            'errors' => $validator->errors(),
        ], 422);
    }

    $image = $req->file('image');
    $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

    $image->move(public_path('uploads/temp_images'), $imageName);

    $tempImage = TempImage::create([
        'name' => $imageName,
    ]);

    return response()->json([
        'status' => 'Ok',
        'message' => 'Image uploaded successfully.',
        'image' => $tempImage,
    ], 201);
}


    
}
