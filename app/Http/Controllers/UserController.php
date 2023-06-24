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

    //remove user from friends
    public function removeFriend(Request $request, $friendId)
    {
        $userId = $request->user()->id;
        $user = User::find($userId);

        // Check if the friend exists
        if ($user->friends()->where('friend_id', $friendId)->exists()) {
            // Remove the friend
            $user->friends()->detach($friendId);

            return response()->json(['message' => 'Friend removed successfully.']);
        }

        return response()->json(['message' => 'Friend not found.'], 404);
    }
}
