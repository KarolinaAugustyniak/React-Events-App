<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Friendship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class FriendRequestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
  
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

    

public function getFriendRequests()
{
    $userId = Auth::id();        

    $friendRequests = Friendship::where('user_id', $userId)
        ->where('status', 'pending')
        ->with('friend') // eager load the 'friend' relationship
        ->get();

    $formattedRequests = $friendRequests->map(function ($request) {
        return [
            'id' => $request->id,
            'user_id' => $request->user_id,
            'friend_id' => $request->friend_id,
            'status' => $request->status,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
            'friend_name' => $request->friend->name, // include the friend's name
        ];
    });

    return response()->json($formattedRequests);
}

    public function acceptFriendRequest(FriendRequest $friendRequest)
    {
        $friendRequest->update(['status' => 'accepted']);
        
        // You can perform additional actions here, such as adding the friendship relationship
        
        return response()->json(['message' => 'Friend request accepted.']);
    }

}
