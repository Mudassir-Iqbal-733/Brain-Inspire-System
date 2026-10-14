<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function store(Request $req){
     $validator = Validator::make($req->all(),[
        "name" => "required|string|max:250",
        "parent_id" => "nullable|exists:categories,id"
     ]);
     if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $name = preg_replace('/\s+/', ' ', trim($req->name));
$slug = Str::slug($name);

if (
    Category::whereRaw('LOWER(TRIM(name)) = ?', [strtolower($name)])->exists()
    || Category::where('slug', $slug)->exists()
) {
    return response()->json([
        'status' => false,
        'message' => 'This category already exists.',
    ], 422);
}
           $category = Category::create([
            'name' => $name,
            'slug' => $slug,
            'parent_id' => $req->parent_id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Category created successfully.',
            'data' => $category,
        ], 201);
     }


     public function index()
{
    $categories = Category::with('subcategories')->whereNull('parent_id')->get();

    return response()->json([
        'status' => true,
        'data' => $categories,
    ], 200);
}

public function show($id)
{
    $category = Category::with('subcategories')->find($id);

    if (!$category) {
        return response()->json([
            'status' => false,
            'message' => 'Category not found.',
        ], 404);
    }

    return response()->json([
        'status' => true,
        'data' => $category,
    ], 200);
}

public function update(Request $req, $id)
{
    $category = Category::find($id);

    if (!$category) {
        return response()->json([
            'status' => false,
            'message' => 'Category not found.',
        ], 404);
    }

    $validator = Validator::make($req->all(), [
        'name' => 'sometimes|required|string|max:250',
        'parent_id' => 'sometimes|nullable|exists:categories,id',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'errors' => $validator->errors(),
        ], 422);
    }

    if ($req->has('name')) {
        $name = preg_replace('/\s+/', ' ', trim($req->name));
        $slug = Str::slug($name);

        if (
            Category::whereRaw('LOWER(TRIM(name)) = ?', [strtolower($name)])
                ->where('id', '!=', $id)
                ->exists()
            || Category::where('slug', $slug)
                ->where('id', '!=', $id)
                ->exists()
        ) {
            return response()->json([
                'status' => false,
                'message' => 'This category already exists.',
            ], 422);
        }

        $category->name = $name;
        $category->slug = $slug;
    }

    

    if ($req->exists('parent_id')) {
        if ((int) $req->parent_id === (int) $id) {
            return response()->json([
                'status' => false,
                'message' => 'A category cannot be its own parent.',
            ], 422);
        }

        $category->parent_id = $req->parent_id;
    }

    $category->save();

    return response()->json([
        'status' => true,
        'message' => 'Category updated successfully.',
        'data' => $category,
    ], 200);
}

public function destroy($id)
{
    $category = Category::find($id);

    if (!$category) {
        return response()->json([
            'status' => false,
            'message' => 'Category not found.',
        ], 404);
    }

    $category->delete();

    return response()->json([
        'status' => true,
        'message' => 'Category deleted successfully.',
    ], 200);
}
}
