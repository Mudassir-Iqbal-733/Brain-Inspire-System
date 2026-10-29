<?php

namespace App\Http\Controllers;

use App\Models\SocialSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SocialSettingController extends Controller
{
    public function index()
    {
        $social = SocialSetting::first();
        
        return response()->json([
            'status' => 'Ok',
            'data' => $social
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'links' => 'nullable|array',
            'links.*.platform' => 'required|string',
            'links.*.url' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $social = SocialSetting::firstOrCreate([]);
        $social->links = $request->links ?? [];
        $social->save();

        return response()->json([
            'status' => 'Ok',
            'message' => 'Social settings saved successfully!',
            'data' => $social
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $social = SocialSetting::find($id);

        if (!$social) {
            return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'links' => 'nullable|array',
            'links.*.platform' => 'required|string',
            'links.*.url' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        if ($request->has('links')) $social->links = $request->links;
        $social->save();

        return response()->json([
            'status' => 'Ok',
            'message' => 'Social settings updated successfully!',
            'data' => $social
        ], 200);
    }
}