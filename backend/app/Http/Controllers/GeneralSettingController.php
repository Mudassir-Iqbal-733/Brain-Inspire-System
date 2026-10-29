<?php

namespace App\Http\Controllers;

use App\Models\GeneralSetting;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class GeneralSettingController extends Controller
{
    public function index()
    {
        $setting = GeneralSetting::first();
        
        if ($setting) {
            if ($setting->page_header_image) {
                $setting->page_header_image = url('uploads/general/' . $setting->page_header_image);
            }
            if ($setting->favicon) {
                $setting->favicon = url('uploads/general/' . $setting->favicon);
            }
        }

        return response()->json(['status' => 'Ok', 'data' => $setting], 200);
    }

    public function store(Request $request)
    {
        $setting = GeneralSetting::firstOrCreate([]);
        $directory = public_path('uploads/general');

        // Directory check
        if (!File::isDirectory($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        // 1. Page Header Image Upload
        if ($request->filled('header_image_id')) {
            $tempImage = TempImage::find($request->header_image_id);
            if ($tempImage) {
                $source = public_path('uploads/temp_images/' . $tempImage->name);
                if (file_exists($source)) {
                    // Extension nikalne ke liye
                    $extension = pathinfo($source, PATHINFO_EXTENSION);
                    $newName = 'header_' . time() . '.' . $extension;
                    
                    rename($source, $directory . '/' . $newName);
                    
                    // Purani image delete karein
                    if ($setting->page_header_image && file_exists($directory . '/' . $setting->page_header_image)) {
                        unlink($directory . '/' . $setting->page_header_image);
                    }
                    
                    $setting->page_header_image = $newName;
                    $tempImage->delete();
                }
            }
        }

        // 2. Favicon Upload
        if ($request->filled('favicon_id')) {
            $tempImage = TempImage::find($request->favicon_id);
            if ($tempImage) {
                $source = public_path('uploads/temp_images/' . $tempImage->name);
                if (file_exists($source)) {
                    $extension = pathinfo($source, PATHINFO_EXTENSION);
                    $newName = 'favicon_' . time() . '.' . $extension;
                    
                    rename($source, $directory . '/' . $newName);
                    
                    if ($setting->favicon && file_exists($directory . '/' . $setting->favicon)) {
                        unlink($directory . '/' . $setting->favicon);
                    }
                    
                    $setting->favicon = $newName;
                    $tempImage->delete();
                }
            }
        }

        $setting->save();

        if ($setting->page_header_image) {
            $setting->page_header_image = url('uploads/general/' . $setting->page_header_image);
        }
        if ($setting->favicon) {
            $setting->favicon = url('uploads/general/' . $setting->favicon);
        }

        return response()->json(['status' => 'Ok', 'message' => 'Settings Saved!', 'data' => $setting], 200);
    }
}