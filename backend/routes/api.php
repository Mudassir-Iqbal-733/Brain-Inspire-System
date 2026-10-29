<?php

use App\Http\Controllers\AboutSettingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\AdmissionSettingController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactSettingController;
use App\Http\Controllers\DirectorMessageController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FooterSettingsController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\GeneralSettingController;
use App\Http\Controllers\HeaderSettingsController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SocialSettingController;
use App\Http\Controllers\TempImageController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/admin/login', [AdminController::class, 'login']);

// BLOGS
Route::get('/blogs', [BlogController::class, "blogs"]);
Route::get('/blogs/page-seo', [BlogController::class, 'getPageSeo']); // Naya Route (Specific pehle)
Route::get('/blog/{id}', [BlogController::class, "blog"]); // Dynamic baad mein

// CATEGORIES
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

// COMMENTS
Route::post('/comments', [CommentController::class, 'store']);
Route::get('/blogs/{blogId}/comments', [CommentController::class, 'index']);


Route::get('/header-settings', [HeaderSettingsController::class, 'index']);
Route::get('/footer-settings', [FooterSettingsController::class, 'index']);
Route::get('/director-message', [DirectorMessageController::class, 'index']);
Route::get('/contact-settings', [ContactSettingController::class, 'index']);
Route::get('/sliders', [SliderController::class, 'index']);
Route::get('/general-settings', [GeneralSettingController::class, 'index']);

Route::post('/feedback', [FeedbackController::class, 'store']);

Route::get('/about-settings', [AboutSettingController::class, 'index']);
Route::get('/social-settings', [SocialSettingController::class, 'index']);

// PROGRAMS
Route::get('/programs', [ProgramController::class, 'index']);
Route::get('/programs/page-seo', [ProgramController::class, 'getPageSeo']);
Route::get('/programs/{id}', [ProgramController::class, 'show']);

Route::get('/admission-settings', [AdmissionSettingController::class, 'index']);
Route::post('/admissions', [AdmissionController::class, 'store']);

// GALLERY
Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/gallery/page-seo', [GalleryController::class, 'getPageSeo']);

Route::get('/videos', [VideoController::class, 'index']);


// ADMIN PROTECTED ROUTES 
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    
    Route::post('/admin/profile', [AdminController::class, 'updateProfile']);
    Route::post('/admin/logout', [AdminController::class, 'logout']);

    // BLOG ACTIONS
    Route::post('/blog/add', [BlogController::class, "addBlog"]);
    Route::put('/blog/{id}', [BlogController::class, "updateBlog"]);
    Route::delete('/blog/{id}', [BlogController::class, "deleteBlog"]);
    Route::post('/admin/blogs/page-seo', [BlogController::class, 'savePageSeo']); 
    Route::post('/image/add', [TempImageController::class, "addImage"]);
    
    Route::post('/categories/add', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    
    Route::get('/admin/comments', [CommentController::class, 'adminIndex']);
    Route::patch('/admin/comments/{id}/status', [CommentController::class, 'updateStatus']);
    Route::delete('/admin/comments/{id}', [CommentController::class, 'destroy']);
    
    Route::post('/admin/header-settings', [HeaderSettingsController::class, 'store']);
    Route::post('/admin/header-settings/{id}', [HeaderSettingsController::class, 'update']);

    Route::post('/admin/footer-settings', [FooterSettingsController::class, 'store']);
    Route::post('/admin/footer-settings/{id}', [FooterSettingsController::class, 'update']);
    Route::post('/admin/director-message', [DirectorMessageController::class, 'store']);
    Route::post('/admin/director-message/{type}', [DirectorMessageController::class, 'update']);

    Route::post('/admin/contact-settings', [ContactSettingController::class, 'store']);
    Route::post('/admin/contact-settings/{id}', [ContactSettingController::class, 'update']);

    Route::get('/admin/feedbacks', [FeedbackController::class, 'index']);
    Route::delete('/admin/feedbacks/{id}', [FeedbackController::class, 'destroy']);


    Route::post('/admin/about-settings', [AboutSettingController::class, 'store']);
    Route::post('/admin/about-settings/{id}', [AboutSettingController::class, 'update']);
    
    Route::post('/admin/social-settings', [SocialSettingController::class, 'store']);
    Route::post('/admin/social-settings/{id}', [SocialSettingController::class, 'update']);
     
    Route::post('/admin/sliders', [SliderController::class, 'store']);
    Route::delete('/admin/sliders/{id}', [SliderController::class, 'destroy']);

    Route::post('/admin/programs', [ProgramController::class, 'store']);
    Route::post('/admin/programs/page-seo', [ProgramController::class, 'savePageSeo']);
    Route::post('/admin/programs/{id}', [ProgramController::class, 'update']);
    Route::delete('/admin/programs/{id}', [ProgramController::class, 'destroy']);

    Route::post('/admin/admission-settings', [AdmissionSettingController::class, 'store']);
    Route::post('/admin/admission-settings/{id}', [AdmissionSettingController::class, 'update']);

    Route::get('/admin/admissions', [AdmissionController::class, 'index']);
    Route::delete('/admin/admissions/{id}', [AdmissionController::class, 'destroy']);

    // ADMIN GALLERY ROUTES
    Route::get('/admin/gallery', [GalleryController::class, 'adminIndex']);
    Route::post('/admin/gallery/page-seo', [GalleryController::class, 'savePageSeo']);
    Route::post('/admin/gallery/categories', [GalleryController::class, 'storeCategory']);
    Route::delete('/admin/gallery/categories/{id}', [GalleryController::class, 'destroyCategory']);
    Route::post('/admin/gallery/images', [GalleryController::class, 'storeImage']);
    Route::delete('/admin/gallery/images/{id}', [GalleryController::class, 'destroyImage']);

    Route::post('/admin/videos', [VideoController::class, 'store']);
    Route::delete('/admin/videos/{id}', [VideoController::class, 'destroy']);

    Route::post('/admin/general-settings', [GeneralSettingController::class, 'store']);
});