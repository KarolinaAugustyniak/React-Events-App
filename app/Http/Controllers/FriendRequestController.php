<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class FriendRequestController extends Controller
{
    public function sendFriendRequest(Request $request, $userId)
    {
        // Retrieve the authenticated user
        $sender = Auth::user();

        try {
            // Retrieve the user to send the friend request
            $user = User::findOrFail($userId);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                'user' => 'User not found.',
            ]);
        }

        // Check if the sender is already friends with the user
        if ($sender->friends()->where('friendships.id', $user->id)->exists()) {
            throw ValidationException::withMessages([
                'user' => 'You are already friends with this user.',
            ]);
        }

        // Check if a friend request already exists
        if (!$sender->friendRequests()->where('friendships.id', $user->id)->exists()) {
            $sender->friendRequests()->attach($user, ['status' => 'pending']);
        }

        return response()->json(['message' => 'Friend request sent.']);
    }
}
