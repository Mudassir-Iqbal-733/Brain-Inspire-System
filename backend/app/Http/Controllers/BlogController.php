<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\TempImage;
use App\Models\AboutSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function blogs(Request $req)
    {
        $blogs = Blog::with('category')->orderBy('created_at', 'DESC');

        if ($req->filled('keyword')) {
            $blogs->where(function ($query) use ($req) {
                $query->where('title', 'like', '%' . $req->keyword . '%')
                      ->orWhere('keywords', 'like', '%' . $req->keyword . '%');
            });
        }
        if ($req->filled('category_id')) {
            $blogs->where('category_id', $req->category_id);
        }

        $blogs = $blogs->get();

        $blogs->transform(function ($blog) {
            $blog->image = $blog->image ? url('uploads/blogs/' . $blog->image) : null;
            $blog->descImg = $blog->descImg ? url('uploads/blogs/' . $blog->descImg) : null;
            return $blog;
        });

        return response()->json([
            'status' => 'Ok',
            'data' => $blogs
        ], 200);
    }

    public function blog($id)
    {
        $blog = Blog::with('category')->find($id);

        if (!$blog) {
            return response()->json(['status' => 'Fail', 'message' => 'Blog not found'], 404);
        }

        $blog->increment('views_count');
        $blog->refresh();

        $blog->image = $blog->image ? url('uploads/blogs/' . $blog->image) : null;
        $blog->descImg = $blog->descImg ? url('uploads/blogs/' . $blog->descImg) : null;

        return response()->json(['status' => 'Ok', 'data' => $blog], 200);
    }

    public function getPageSeo()
    {
        $setting = AboutSetting::first();
        
        return response()->json([
            'status' => 'Ok',
            'data' => [
                'seo_title' => $setting ? $setting->seo_title : '',
                'seo_description' => $setting ? $setting->seo_description : '',
                'seo_keywords' => $setting ? $setting->seo_keywords : '',
            ]
        ], 200);
    }

    public function savePageSeo(Request $request)
    {
        $setting = AboutSetting::firstOrCreate([]);
        
        $setting->seo_title = $request->seo_title;
        $setting->seo_description = $request->seo_description;
        $setting->seo_keywords = $request->seo_keywords;
        $setting->save();

        return response()->json(['status' => 'Ok', 'message' => 'Page SEO Saved!', 'data' => $setting], 200);
    }

    public function addBlog(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'title' => 'required|string|min:10',
            'shortDesc' => 'required|string|min:10',
            'description' => 'required|string|min:20',
            'author' => 'required|string|min:3',
            'image_id' => 'nullable|exists:temp_images,id',
            'descImg_id' => 'nullable|exists:temp_images,id',
            'category_id' => 'required|exists:categories,id',
            'keywords' => 'nullable|string|max:500',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'message' => 'Please fix errors', 'errors' => $validator->errors()], 422);
        }

        $tempImage = null;
        $imageName = null;
        $descTempImage = null;
        $descImgName = null;

        $directory = public_path('uploads/blogs');

        if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
            return response()->json(['status' => 'Fail', 'message' => 'Unable to create image directory.'], 500);
        }

        if ($req->filled('image_id')) {
            $tempImage = TempImage::find($req->image_id);
            $source = public_path('uploads/temp_images/' . $tempImage->name);

            if (!file_exists($source)) {
                return response()->json(['status' => 'Fail', 'message' => 'Temporary image file not found.'], 404);
            }

            $imageName = $tempImage->name;
            $destination = $directory . '/' . $imageName;

            if (file_exists($destination)) {
                return response()->json(['status' => 'Fail', 'message' => 'An image with this name already exists.'], 409);
            }

            if (!rename($source, $destination)) {
                return response()->json(['status' => 'Fail', 'message' => 'Unable to move image.'], 500);
            }
        }

        if ($req->filled('descImg_id')) {
            $descTempImage = TempImage::find($req->descImg_id);
            $descSource = public_path('uploads/temp_images/' . $descTempImage->name);

            if (!file_exists($descSource)) {
                return response()->json(['status' => 'Fail', 'message' => 'Description image file not found.'], 404);
            }

            $descImgName = 'desc_' . $descTempImage->name;
            $descDestination = $directory . '/' . $descImgName;

            if (file_exists($descDestination)) {
                return response()->json(['status' => 'Fail', 'message' => 'Description image already exists.'], 409);
            }

            if (!rename($descSource, $descDestination)) {
                return response()->json(['status' => 'Fail', 'message' => 'Unable to move description image.'], 500);
            }
        }

        $blog = new Blog();
        $blog->title = $req->title;
        $blog->shortDesc = $req->shortDesc;
        $blog->description = $req->description;
        $blog->author = $req->author;
        $blog->image = $imageName;
        $blog->descImg = $descImgName;
        $blog->keywords = $req->keywords;
        $blog->category_id = $req->category_id;
        $blog->seo_title = $req->seo_title;
        $blog->seo_description = $req->seo_description;
        $blog->seo_keywords = $req->seo_keywords;
        $blog->save();

        if ($tempImage) {
            $tempImage->delete();
        }

        if ($descTempImage) {
            $descTempImage->delete();
        }

        $blog->image = $blog->image ? url('uploads/blogs/' . $blog->image) : null;
        $blog->descImg = $blog->descImg ? url('uploads/blogs/' . $blog->descImg) : null;

        return response()->json(['status' => 'Ok', 'message' => 'New Blog created successfully', 'data' => $blog], 201);
    }

    public function updateBlog($id, Request $req)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['status' => 'Fail', 'message' => 'Blog not found'], 404);
        }

        $validator = Validator::make($req->all(), [
            'title' => 'sometimes|required|string|min:10',
            'shortDesc' => 'sometimes|required|string|min:10',
            'description' => 'sometimes|required|string|min:20',
            'author' => 'sometimes|required|string|min:3',
            'image_id' => 'nullable|exists:temp_images,id',
            'descImg_id' => 'nullable|exists:temp_images,id',
            'category_id' => 'sometimes|required|exists:categories,id',
            'keywords' => 'sometimes|nullable|string|max:500',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Fail', 'message' => 'Please fix errors', 'errors' => $validator->errors()], 422);
        }

        $directory = public_path('uploads/blogs');

        if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
            return response()->json(['status' => 'Fail', 'message' => 'Unable to create image directory.'], 500);
        }

        if ($req->filled('image_id')) {
            $tempImage = TempImage::find($req->image_id);
            $source = public_path('uploads/temp_images/' . $tempImage->name);

            if (!file_exists($source)) {
                return response()->json(['status' => 'Fail', 'message' => 'Image file not found.'], 404);
            }

            $destination = $directory . '/' . $tempImage->name;

            if (file_exists($destination)) {
                return response()->json(['status' => 'Fail', 'message' => 'Image file already exists.'], 409);
            }

            if (!rename($source, $destination)) {
                return response()->json(['status' => 'Fail', 'message' => 'Unable to move image.'], 500);
            }

            $blog->image = $tempImage->name;
            $tempImage->delete();
        }

        if ($req->filled('descImg_id')) {
            $descTempImage = TempImage::find($req->descImg_id);
            $descSource = public_path('uploads/temp_images/' . $descTempImage->name);

            if (!file_exists($descSource)) {
                return response()->json(['status' => 'Fail', 'message' => 'Description image file not found.'], 404);
            }

            $descImgName = 'desc_' . $descTempImage->name;
            $descDestination = $directory . '/' . $descImgName;

            if (file_exists($descDestination)) {
                return response()->json(['status' => 'Fail', 'message' => 'Description image file already exists.'], 409);
            }

            if (!rename($descSource, $descDestination)) {
                return response()->json(['status' => 'Fail', 'message' => 'Unable to move description image.'], 500);
            }

            $blog->descImg = $descImgName;
            $descTempImage->delete();
        }

        if ($req->has('title')) {
            $blog->title = $req->title;
            $blog->slug = Str::slug($req->title) . '-' . time();
        }
        if ($req->has('shortDesc')) $blog->shortDesc = $req->shortDesc;
        if ($req->has('description')) $blog->description = $req->description;
        if ($req->has('author')) $blog->author = $req->author;
        if ($req->has('keywords')) $blog->keywords = $req->keywords;
        if ($req->has('category_id')) $blog->category_id = $req->category_id;
        if ($req->has('seo_title')) $blog->seo_title = $req->seo_title;
        if ($req->has('seo_description')) $blog->seo_description = $req->seo_description;
        if ($req->has('seo_keywords')) $blog->seo_keywords = $req->seo_keywords;

        $blog->save();

        $blog->image = $blog->image ? url('uploads/blogs/' . $blog->image) : null;
        $blog->descImg = $blog->descImg ? url('uploads/blogs/' . $blog->descImg) : null;

        return response()->json(['status' => 'Ok', 'message' => 'Blog updated successfully', 'data' => $blog], 200);
    }

    public function deleteBlog($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['status' => 'Fail', 'message' => 'Blog not found'], 404);
        }

        if ($blog->image) {
            $imagePath = public_path('uploads/blogs/' . basename($blog->image));
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        if ($blog->descImg) {
            $descImagePath = public_path('uploads/blogs/' . basename($blog->descImg));
            if (file_exists($descImagePath)) {
                unlink($descImagePath);
            }
        }

        $blog->delete();

        return response()->json(['status' => 'Ok', 'message' => 'Blog deleted successfully'], 200);
    }
}