<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function login(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'Fail',
                'message' => 'Please fix errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $req->email)
            ->where('is_admin', true)
            ->first();

        if (!$user || !Hash::check($req->password, $user->password)) {
            return response()->json([
                'status' => 'Fail',
                'message' => 'Invalid email or password',
            ], 401);
        }
        
        $user->tokens()->delete();
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'status' => 'Ok',
            'message' => 'Admin login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ], 200);
    }


    public function logout(Request $req)
{
    $req->user()->currentAccessToken()->delete();

    return response()->json([
        'status' => 'Ok',
        'message' => 'Logged out successfully.'
    ], 200);
}
}