<?php

namespace App\Http\Controllers;

use App\Models\AdmissionSetting;
use Illuminate\Http\Request;

class AdmissionSettingController extends Controller
{
    public function index()
    {
        $data = AdmissionSetting::first();
        return response()->json(['status' => 'Ok', 'data' => $data], 200);
    }

    public function store(Request $request)
    {
        $data = AdmissionSetting::firstOrCreate([]);
        
        $data->why_title = $request->why_title;
        $data->why_desc = $request->why_desc;
        $data->why_cards = $request->why_cards ?? [];
        
        $data->rules_notice = $request->rules_notice;
        $data->rules_categories = $request->rules_categories ?? [];
        
        $data->process_steps = $request->process_steps ?? [];
        $data->required_docs = $request->required_docs ?? [];
        
        $data->seo_title = $request->seo_title;
        $data->seo_description = $request->seo_description;
        $data->seo_keywords = $request->seo_keywords;
        
        $data->save();

        return response()->json(['status' => 'Ok', 'message' => 'Saved!', 'data' => $data->fresh()], 200);
    }
}