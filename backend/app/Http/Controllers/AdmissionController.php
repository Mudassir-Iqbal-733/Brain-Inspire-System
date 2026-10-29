<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use Illuminate\Http\Request;

class AdmissionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullName'          => 'required|string|max:255',
            'fatherName'        => 'required|string|max:255',
            'cnic'              => 'nullable|string|max:20',
            'dob'               => 'nullable|date',
            'gender'            => 'nullable|string|in:Male,Female,Other',
            'email'             => 'nullable|email|max:255',
            'phone'             => 'required|string|max:20',
            'whatsapp'          => 'nullable|string|max:20',
            'address'           => 'nullable|string|max:500',
            'city'              => 'nullable|string|max:100',
            'province'          => 'nullable|string|max:100',
            'lastQualification' => 'nullable|string|max:100',
            'lastInstitute'     => 'nullable|string|max:255',
            'passingYear'       => 'nullable|string|max:10',
            'marks'             => 'nullable|string|max:50',
            'course'            => 'required|string|max:255',
            'duration'          => 'nullable|string|max:50',
            'source'            => 'nullable|string|max:100',
            'notes'             => 'nullable|string|max:2000',
        ]);

        $data = [
            'full_name'          => $validated['fullName'],
            'father_name'        => $validated['fatherName'],
            'cnic'               => $validated['cnic'] ?? null,
            'dob'                => $validated['dob'] ?? null,
            'gender'             => $validated['gender'] ?? null,
            'email'              => $validated['email'] ?? null,
            'phone'              => $validated['phone'],
            'whatsapp'           => $validated['whatsapp'] ?? null,
            'address'            => $validated['address'] ?? null,
            'city'               => $validated['city'] ?? null,
            'province'           => $validated['province'] ?? null,
            'last_qualification' => $validated['lastQualification'] ?? null,
            'last_institute'     => $validated['lastInstitute'] ?? null,
            'passing_year'       => $validated['passingYear'] ?? null,
            'marks_grade'        => $validated['marks'] ?? null,
            'course'             => $validated['course'],
            'preferred_duration' => $validated['duration'] ?? null,
            'source'             => $validated['source'] ?? null,
            'additional_notes'   => $validated['notes'] ?? null,
            'status'             => 'pending',
        ];

        $admission = Admission::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Admission submitted successfully.',
            'data'    => $admission,
        ], 201);
    }

    public function index()
    {
        return response()->json([
            'success' => true,
            'data'    => Admission::orderByDesc('id')->get(),
        ]);
    }

    public function destroy($id)
    {
        Admission::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Admission deleted successfully.',
        ]);
    }
}