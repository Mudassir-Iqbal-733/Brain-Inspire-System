<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index(int $blogId)
    {
        $blog = Blog::find($blogId);

        if (!$blog) {
            return response()->json([
                'status' => 'Fail',
                'message' => 'Blog not found'
            ], 404);
        }

        $comments = Comment::where('blog_id', $blogId)
            ->where('status', 'approved')
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json([
            'status' => 'Ok',
            'data' => $comments
        ], 200);
    }

    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'blog_id' => 'required|exists:blogs,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'comment' => 'required|string|min:3|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'Fail',
                'message' => 'Please fix errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $comment = Comment::create([
            'blog_id' => $req->blog_id,
            'name' => $req->name,
            'email' => $req->email,
            'comment' => $req->comment,
            'status' => 'pending'
        ]);

        return response()->json([
            'status' => 'Ok',
            'message' => 'Comment submitted successfully and is awaiting approval.',
            'data' => $comment
        ], 201);
    }

    
public function adminIndex(Request $req)
{
    $comments = Comment::with('blog')
        ->orderBy('created_at', 'DESC')
        ->get();

    return response()->json([
        'status' => 'Ok',
        'count' => $comments->count(),
        'data' => $comments
    ], 200);
}

    public function updateStatus(Request $req,int $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'status' => 'Fail',
                'message' => 'Comment not found'
            ], 404);
        }

        $validator = Validator::make($req->all(), [
            'status' => 'required|in:approved,rejected'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'Fail',
                'errors' => $validator->errors()
            ], 422);
        }

        $comment->status = $req->status;
        $comment->save();

        return response()->json([
            'status' => 'Ok',
            'message' => 'Comment status updated successfully',
            'data' => $comment
        ], 200);
    }

    public function destroy(int $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'status' => 'Fail',
                'message' => 'Comment not found'
            ], 404);
        }

        $comment->delete();

        return response()->json([
            'status' => 'Ok',
            'message' => 'Comment deleted successfully'
        ], 200);
    }
}
