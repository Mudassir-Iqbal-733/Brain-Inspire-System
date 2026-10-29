<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'issue' => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);
        }

        $feedback = new Feedback();
        $feedback->name = $request->name;
        $feedback->email = $request->email;
        $feedback->phone = $request->phone;
        $feedback->issue = $request->issue;
        $feedback->save();

        return response()->json([
            'status' => 'Ok',
            'message' => 'Feedback submitted successfully!',
            'data' => $feedback
        ], 201);
    }

    public function index()
    {
        $feedbacks = Feedback::orderBy('created_at', 'desc')->get();
        return response()->json(['status' => 'Ok', 'data' => $feedbacks], 200);
    }

    public function destroy($id)
    {
        $feedback = Feedback::find($id);
        if (!$feedback) {
            return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);
        }

        $feedback->delete();
        return response()->json(['status' => 'Ok', 'message' => 'Deleted successfully'], 200);
    }
}