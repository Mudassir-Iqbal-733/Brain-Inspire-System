<?php

namespace App\Http\Controllers;

use App\Models\ContactSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactSettingController extends Controller
{
    public function index()
    {
        $contact = ContactSetting::first();
        
        return response()->json([
            'status' => 'Ok',
            'data' => $contact
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'map_url' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $contact = ContactSetting::firstOrCreate([]);

        $contact->address = $request->address;
        $contact->phone = $request->phone;
        $contact->email = $request->email;
        $contact->map_url = $request->map_url;
        $contact->seo_title = $request->seo_title;
        $contact->seo_description = $request->seo_description;
        $contact->seo_keywords = $request->seo_keywords;
        $contact->save();

        return response()->json([
            'status' => 'Ok',
            'message' => 'Contact settings saved successfully!',
            'data' => $contact
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $contact = ContactSetting::find($id);

        if (!$contact) {
            return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'map_url' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        if ($request->has('address')) $contact->address = $request->address;
        if ($request->has('phone')) $contact->phone = $request->phone;
        if ($request->has('email')) $contact->email = $request->email;
        if ($request->has('map_url')) $contact->map_url = $request->map_url;
        if ($request->has('seo_title')) $contact->seo_title = $request->seo_title;
        if ($request->has('seo_description')) $contact->seo_description = $request->seo_description;
        if ($request->has('seo_keywords')) $contact->seo_keywords = $request->seo_keywords;

        $contact->save();

        return response()->json([
            'status' => 'Ok',
            'message' => 'Contact settings updated successfully!',
            'data' => $contact
        ], 200);
    }
}