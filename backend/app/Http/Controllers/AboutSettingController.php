<?php

namespace App\Http\Controllers;

use App\Models\AboutSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutSettingController extends Controller
{
    public function index()
    {
        $about = AboutSetting::first();
        return response()->json(['status' => 'Ok', 'data' => $about], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'introduction_para' => 'nullable|string',
            'core_values' => 'nullable|array',
            'core_values.*.title' => 'required|string',
            'core_values.*.desc' => 'required|string',
            'core_values.*.icon' => 'required|string',
            'mission_para' => 'nullable|string',
            'vision_para' => 'nullable|string',
            'future_plans' => 'nullable|array',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $about = AboutSetting::firstOrCreate([]);

        $about->introduction_para = $request->introduction_para;
        $about->core_values = $request->core_values ?? [];
        $about->mission_para = $request->mission_para;
        $about->vision_para = $request->vision_para;
        $about->future_plans = $request->future_plans ?? [];
        $about->seo_title = $request->seo_title;
        $about->seo_description = $request->seo_description;
        $about->seo_keywords = $request->seo_keywords;
        $about->save();

        return response()->json(['status' => 'Ok', 'message' => 'Saved successfully!', 'data' => $about], 200);
    }

    public function update(Request $request, $id)
    {
        $about = AboutSetting::find($id);
        if (!$about) {
            return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'introduction_para' => 'nullable|string',
            'core_values' => 'nullable|array',
            'core_values.*.title' => 'required|string',
            'core_values.*.desc' => 'required|string',
            'mission_para' => 'nullable|string',
            'vision_para' => 'nullable|string',
            'future_plans' => 'nullable|array',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        if ($request->has('introduction_para')) $about->introduction_para = $request->introduction_para;
        if ($request->has('core_values')) $about->core_values = $request->core_values;
        if ($request->has('mission_para')) $about->mission_para = $request->mission_para;
        if ($request->has('vision_para')) $about->vision_para = $request->vision_para;
        if ($request->has('future_plans')) $about->future_plans = $request->future_plans;
        if ($request->has('seo_title')) $about->seo_title = $request->seo_title;
        if ($request->has('seo_description')) $about->seo_description = $request->seo_description;
        if ($request->has('seo_keywords')) $about->seo_keywords = $request->seo_keywords;

        $about->save();

        return response()->json(['status' => 'Ok', 'message' => 'Updated successfully!', 'data' => $about], 200);
    }
}