<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\TempImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//admin login

Route::post('/admin/login', [AdminController::class, 'login']);

//blog

Route::get('/blogs',[BlogController::class,"blogs"]);
Route::get('/blog/{id}',[BlogController::class,"blog"]);

//categories

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

//comments

Route::post('/comments', [CommentController::class, 'store']);
Route::get('/blogs/{blogId}/comments', [CommentController::class, 'index']);


Route::middleware(['auth:sanctum', 'admin'])->group(function () {

Route::post('/admin/logout', [AdminController::class, 'logout']);

Route::post('/blog/add',[BlogController::class,"addBlog"]);
Route::put('/blog/{id}',[BlogController::class,"updateBlog"]);
Route::delete('/blog/{id}',[BlogController::class,"deleteBlog"]);
Route::post('/image/add',[TempImageController::class,"addImage"]);

Route::post('/categories/add', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

Route::get('/admin/comments', [CommentController::class, 'adminIndex']);
Route::patch('/admin/comments/{id}/status', [CommentController::class, 'updateStatus']);
Route::delete('/admin/comments/{id}', [CommentController::class, 'destroy']);

});
