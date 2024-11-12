<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('events', EventController::class)->only(['index', 'show']);
Route::post('events/{event}/join', [EventController::class, 'joinEvent'])->middleware('auth:sanctum');
Route::get('events/verify/{token}', [EventController::class, 'verifyParticipant'])->name('event.verify');
Route::get('/my-events', [EventController::class, 'getJoinedEvents'])->middleware('auth:sanctum');
Route::apiResource('categories', CategoryController::class)->only(['index']);

