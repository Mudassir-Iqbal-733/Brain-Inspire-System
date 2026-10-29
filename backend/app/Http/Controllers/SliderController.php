<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::orderBy('created_at', 'desc')->get();
        
        $sliders->transform(function ($slider) {
            if ($slider->image) {
                $slider->image = url('uploads/sliders/' . $slider->image);
            }
            return $slider;
        });

        return response()->json(['status' => 'Ok', 'data' => $sliders], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'image_id' => 'required|exists:temp_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $imageName = null;
        $directory = public_path('uploads/sliders');

        if ($request->filled('image_id')) {
            $tempImage = TempImage::find($request->image_id);
            $source = public_path('uploads/temp_images/' . $tempImage->name);

            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }

            if (file_exists($source)) {
                $imageName = $tempImage->name;
                rename($source, $directory . '/' . $imageName);
                $tempImage->delete();
            }
        }

        $slider = new Slider();
        $slider->title = $request->title ?? '';
        $slider->subtitle = $request->subtitle ?? '';
        $slider->image = $imageName;
        $slider->is_active = true;
        $slider->save();

        if ($slider->image) {
            $slider->image = url('uploads/sliders/' . $slider->image);
        }

        return response()->json(['status' => 'Ok', 'message' => 'Slider created!', 'data' => $slider], 201);
    }

    public function destroy($id)
    {
        $slider = Slider::find($id);
        
        if (!$slider) {
            return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);
        }

        if ($slider->image && file_exists(public_path('uploads/sliders/' . $slider->image))) {
            unlink(public_path('uploads/sliders/' . $slider->image));
        }

        $slider->delete();
        
        return response()->json(['status' => 'Ok', 'message' => 'Slider deleted'], 200);
    }
}