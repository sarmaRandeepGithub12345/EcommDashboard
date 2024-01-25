<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);


Route::post("add_product",[ProductController::class,'addProduct']);
Route::get("get_all_products",[ProductController::class,'list']);
Route::delete("delete/{id}",[ProductController::class,'delete']);
Route::get("get_single_product/{id}",[ProductController::class, 'single_product']);
Route::put("update_product/{id}",[ProductController::class, 'update_product']);
Route::get("search/{key}",[ProductController::class,'search']);
Route::group([
    "middleware" => ["auth:api"]
],function(){
   
    
    Route::get("logout",[UserController::class,'logout']);
});