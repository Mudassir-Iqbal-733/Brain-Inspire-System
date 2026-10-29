<?php

namespace App\Http\Controllers;

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GalleryController extends Controller
{
    // Frontend ke liye (Categories aur Images dono)
    public function index()
    {
        $categories = GalleryCategory::all();
        $images = GalleryImage::with('category')->orderBy('created_at', 'desc')->get();
        
        $images->transform(function ($img) {
            $img->image = url('uploads/gallery/' . $img->image);
            return $img;
        });

        return response()->json([
            'status' => 'Ok',
            'categories' => $categories,
            'images' => $images
        ], 200);
    }

    // Admin ke liye
    public function adminIndex()
    {
        $categories = GalleryCategory::all();
        $images = GalleryImage::orderBy('created_at', 'desc')->get();
        
        $images->transform(function ($img) {
            $img->image = url('uploads/gallery/' . $img->image);
            return $img;
        });

        return response()->json(['status' => 'Ok', 'categories' => $categories, 'images' => $images], 200);
    }

    public function storeCategory(Request $request)
    {
        $validator = Validator::make($request->all(), ['name' => 'required|string|unique:gallery_categories']);
        if ($validator->fails()) return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);

        $cat = GalleryCategory::create(['name' => $request->name]);
        return response()->json(['status' => 'Ok', 'data' => $cat], 201);
    }

    public function destroyCategory($id)
    {
        $cat = GalleryCategory::find($id);
        if (!$cat) return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);
        $cat->delete();
        return response()->json(['status' => 'Ok', 'message' => 'Deleted'], 200);
    }

    public function storeImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:gallery_categories,id',
            'title' => 'nullable|string',
            'image_id' => 'required|exists:temp_images,id',
        ]);
        if ($validator->fails()) return response()->json(['status' => 'Fail', 'errors' => $validator->errors()], 422);

        $imageName = null;
        if ($request->filled('image_id')) {
            $tempImage = TempImage::find($request->image_id);
            $source = public_path('uploads/temp_images/' . $tempImage->name);
            $directory = public_path('uploads/gallery');

            if (!is_dir($directory)) mkdir($directory, 0755, true);

            if (file_exists($source)) {
                $imageName = $tempImage->name;
                rename($source, $directory . '/' . $imageName);
                $tempImage->delete();
            }
        }

        $image = GalleryImage::create([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'image' => $imageName
        ]);

        $image->image = url('uploads/gallery/' . $image->image);
        return response()->json(['status' => 'Ok', 'data' => $image], 201);
    }

    public function destroyImage($id)
    {
        $image = GalleryImage::find($id);
        if (!$image) return response()->json(['status' => 'Fail', 'message' => 'Not found'], 404);

        if ($image->image && file_exists(public_path('uploads/gallery/' . $image->image))) {
            unlink(public_path('uploads/gallery/' . $image->image));
        }
        $image->delete();
        return response()->json(['status' => 'Ok', 'message' => 'Deleted'], 200);
    }

        public function getPageSeo()
    {
        $category = GalleryCategory::first();
        
        return response()->json([
            'status' => 'Ok',
            'data' => [
                'seo_title' => $category ? $category->seo_title : '',
                'seo_description' => $category ? $category->seo_description : '',
                'seo_keywords' => $category ? $category->seo_keywords : '',
            ]
        ], 200);
    }

    public function savePageSeo(Request $request)
    {
        $category = GalleryCategory::firstOrCreate(
            ['name' => 'Gallery Page'],
            [
                'name' => 'Gallery Page',
            ]
        );

        $category->seo_title = $request->seo_title;
        $category->seo_description = $request->seo_description;
        $category->seo_keywords = $request->seo_keywords;
        $category->save();

        return response()->json(['status' => 'Ok', 'message' => 'Page SEO Saved!', 'data' => $category], 200);
    }
}