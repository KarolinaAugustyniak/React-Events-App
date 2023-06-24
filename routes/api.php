<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoriteEventsController;
use App\Http\Controllers\FriendRequestController;
use App\Models\FavoriteEvents;
use App\Http\Resources\FavoriteEventsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Route::get('/favorite-events', [FavoriteEventsController::class, 'getFavoriteEvents']);


    //friendship
    Route::get('/get-friend-requests', [FriendRequestController::class, 'getFriendRequests']);
    Route::post('/send-friend-request/{userId}', [FriendRequestController::class, 'sendFriendRequest']);
    Route::patch('/accept-friend-request/{friendRequestId}', [FriendRequestController::class, 'acceptFriendRequest']);
    Route::get('/friend-list', [UserController::class, 'getFriendList']);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

//favorites events
Route::post('/favorite-events', [FavoriteEventsController::class, 'store']);
Route::delete('/favorite-events/{userId}/{eventId}',  [FavoriteEventsController::class, 'destroy']);
Route::get('/favorite-event/{userId}/{eventId}', [FavoriteEventsController::class, 'getFavoriteStatus']);

//user profile
Route::get('/user/{id}', [UserController::class, 'show']);

