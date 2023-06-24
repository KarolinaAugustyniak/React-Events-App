<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function show($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    //get friends
    public function getFriendList(Request $request)
    {
        $userId = $request->user()->id;
        $user = User::find($userId);
        $friendList = $user->friends;

        return response()->json($friendList);
    }

}
