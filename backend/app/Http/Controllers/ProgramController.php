<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::query()->where('title', '!=', 'Dummy Program');

        if ($request->filled('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->keyword . '%')
                  ->orWhere('code', 'like', '%' . $request->keyword . '%');
            });
        }

        if ($request->filled('type')) {
            if ($request->type === 'certification') {
                $query->where(function ($q) {
                    $q->where('code', 'like', 'CERT%')
                      ->orWhere('code', 'like', 'C%');
                });
            } elseif ($request->type === 'diploma') {
                $query->where(function ($q) {
                    $q->where('code', 'like', 'DIP%')
                      ->orWhere('code', 'like', 'D%');
                });
            }
        }

        $programs = $query->orderBy('created_at', 'desc')->get();
        
        $programs->transform(function ($program) {
            if ($program->image) {
                $program->image = url('uploads/programs/' . $program->image);
            }
            return $program;
        });

        return response()->json(['status' => 'Ok', 'data' => $programs], 200);
    }

    public function getPageSeo()
    {
        $program = Program::where('title', 'Dummy Program')->first();
        
        if (!$program) {
            $program = Program::first();
        }
        
        return response()->json([
            'status' => 'Ok',
            'data' => [
                'seo_title' => $program ? $program->seo_title : '',
                'seo_description' => $program ? $program->seo_description : '',
                'seo_keywords' => $program ? $program->seo_keywords : '',
                'global_what_will_learn' => $program ? $program->what_will_learn : [],
            ]
        ], 200);
    }


        public function show($id)
    {
        $program = Program::find($id);
        
        if (!$program) {
            return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);
        }

        if ($program->image) {
            $program->image = url('uploads/programs/' . $program->image);
        }

        return response()->json(['status' => 'Ok', 'data' => $program], 200);
    }
    public function savePageSeo(Request $request)
    {
        $program = Program::firstOrCreate(
            ['title' => 'Dummy Program'], 
            [
                'code' => 'DUMMY-01',
                'duration' => 'N/A',
            ]
        );

        $program->seo_title = $request->seo_title;
        $program->seo_description = $request->seo_description;
        $program->seo_keywords = $request->seo_keywords;
        $program->what_will_learn = $request->global_what_will_learn ?? [];
        $program->save();

        return response()->json(['status' => 'Ok', 'message' => 'Page SEO Saved!', 'data' => $program], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'code' => 'required|string',
            'duration' => 'required|string',
            'registration_fee' => 'nullable|numeric',
            'misc_fee' => 'nullable|numeric',
            'course_fee' => 'nullable|numeric',
            'certificate_fee' => 'nullable|numeric',
            'total_fee' => 'nullable|numeric',
            'image_id' => 'nullable|exists:temp_images,id',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $imageName = null;
        if ($request->filled('image_id')) {
            $tempImage = TempImage::find($request->image_id);
            if ($tempImage) {
                $source = public_path('uploads/temp_images/' . $tempImage->name);
                $directory = public_path('uploads/programs');

                if (!is_dir($directory)) mkdir($directory, 0755, true);

                if (file_exists($source)) {
                    $imageName = $tempImage->name;
                    rename($source, $directory . '/' . $imageName);
                    $tempImage->delete();
                }
            }
        }

        $program = new Program();
        $program->title = $request->title;
        $program->code = $request->code;
        $program->duration = $request->duration;
        $program->course_content = $request->course_content ?? [];
        $program->what_will_learn = $request->what_will_learn ?? [];
        $program->registration_fee = $request->registration_fee ?? 0;
        $program->misc_fee = $request->misc_fee ?? 0;
        $program->course_fee = $request->course_fee ?? 0;
        $program->certificate_fee = $request->certificate_fee ?? 0;
        $program->total_fee = $request->total_fee ?? 0;
        $program->image = $imageName;
        $program->seo_title = $request->seo_title;
        $program->seo_description = $request->seo_description;
        $program->seo_keywords = $request->seo_keywords;
        $program->save();

        if ($program->image) $program->image = url('uploads/programs/' . $program->image);

        return response()->json(['status' => 'Ok', 'message' => 'Program created!', 'data' => $program], 201);
    }

    public function update(Request $request, $id)
    {
        $program = Program::find($id);
        if (!$program) return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string',
            'code' => 'sometimes|required|string',
            'duration' => 'sometimes|required|string',
            'registration_fee' => 'nullable|numeric',
            'misc_fee' => 'nullable|numeric',
            'course_fee' => 'nullable|numeric',
            'certificate_fee' => 'nullable|numeric',
            'total_fee' => 'nullable|numeric',
            'image_id' => 'nullable|exists:temp_images,id',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $imageName = $program->image;
        $directory = public_path('uploads/programs');

        if ($request->filled('image_id')) {
            $tempImage = TempImage::find($request->image_id);
            if ($tempImage) {
                $source = public_path('uploads/temp_images/' . $tempImage->name);

                if (!is_dir($directory)) mkdir($directory, 0755, true);

                if (file_exists($source)) {
                    $imageName = $tempImage->name;
                    rename($source, $directory . '/' . $imageName);
                    if ($program->image && file_exists($directory . '/' . $program->image)) {
                        unlink($directory . '/' . $program->image);
                    }
                    $tempImage->delete();
                }
            }
        }

        if ($request->has('title')) $program->title = $request->title;
        if ($request->has('code')) $program->code = $request->code;
        if ($request->has('duration')) $program->duration = $request->duration;
        if ($request->has('course_content')) $program->course_content = $request->course_content;
        if ($request->has('what_will_learn')) $program->what_will_learn = $request->what_will_learn;
        if ($request->has('registration_fee')) $program->registration_fee = $request->registration_fee;
        if ($request->has('misc_fee')) $program->misc_fee = $request->misc_fee;
        if ($request->has('course_fee')) $program->course_fee = $request->course_fee;
        if ($request->has('certificate_fee')) $program->certificate_fee = $request->certificate_fee;
        if ($request->has('total_fee')) $program->total_fee = $request->total_fee;
        if ($request->has('seo_title')) $program->seo_title = $request->seo_title;
        if ($request->has('seo_description')) $program->seo_description = $request->seo_description;
        if ($request->has('seo_keywords')) $program->seo_keywords = $request->seo_keywords;
        
        $program->image = $imageName;
        $program->save();

        if ($program->image) $program->image = url('uploads/programs/' . $program->image);

        return response()->json(['status' => 'Ok', 'message' => 'Program updated!', 'data' => $program], 200);
    }

    public function destroy($id)
    {
        $program = Program::find($id);
        if (!$program) return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);

        if ($program->image && file_exists(public_path('uploads/programs/' . $program->image))) {
            unlink(public_path('uploads/programs/' . $program->image));
        }

        $program->delete();
        return response()->json(['status' => 'Ok', 'message' => 'Deleted'], 200);
    }
}