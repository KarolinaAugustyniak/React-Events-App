<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Friendship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class FriendRequestController extends Controller
{
  
    public function sendFriendRequest(Request $request, $userId)
    {
        // Retrieve the authenticated user
        $sender = Auth::user();
        if(Auth::id() == $userId) return;

        try {
            // Retrieve the user to send the friend request
            $user = User::findOrFail($userId);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                'user' => 'User not found.',
            ]);
        }

        // Check if the sender is already friends with the user
        if ($sender->friends()->where('friendships.id', $userId)->exists()) {
            throw ValidationException::withMessages([
                'user' => 'You are already friends with this user.',
            ]);
        }

        // Check if a friend request already exists
        if (!$sender->friendRequests()->where('friendships.id', $userId)->exists()) {
            $sender->friendRequests()->attach($user, ['status' => 'pending']);
        }

        return response()->json(['message' => 'Friend request sent.']);
    }

     public function getIsRequestSent(Request $request, $userId){
        $sender = Auth::user();

        // Check if the sender has sent a friend request to the user
        $isSent = $sender->friendRequests()->where('users.id', $userId)->exists();

        return response()->json(['isSent' => $isSent]);

     }


    public function getFriendRequests()
    {
        $userId = Auth::id();        

        $friendRequests = Friendship::where('user_id', $userId)
            ->where('status', 'pending')
            ->with('friend') 
            ->get();

        $formattedRequests = $friendRequests->map(function ($request) {
            return [
                'id' => $request->id,
                'user_id' => $request->user_id,
                'friend_id' => $request->friend_id,
                'status' => $request->status,
                'created_at' => $request->created_at,
                'updated_at' => $request->updated_at,
                'friend_name' => $request->friend->name, 
            ];
        });

        return response()->json($formattedRequests);
    }

   public function acceptFriendRequest($friendRequestId)
    {
        if(Friendship::where('id',$friendRequestId)->exists()){
            $friendship = Friendship::find($friendRequestId);
            $friendship->status = 'accepted';
            $friendship->save();
            return response()->json([
                'message'=>' record updated succesfully'
            ], 200);
        }else{
            return response()->json([
                'message'=>'Record not found'
            ], 404);
        }
    }
    
}
