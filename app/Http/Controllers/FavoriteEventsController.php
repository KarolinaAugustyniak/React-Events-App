<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FavoriteEvents;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteEventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return FavoriteEvents::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {       
       $input = $request->all();

       $validator = Validator::make($input,[
        'user_id'=>'required',
        'event_id'=>'required',
       ]);
       if($validator->fails()){
        return $this->sendError('Validation Error', $validator->errors());
       }
       $favoriteEvents = FavoriteEvents::create($input);
       return response()->json([
        'success'=>true,
        'message'=>'Favorite event record created successfully',
        'FavoriteEvents'=>$favoriteEvents
       ]);
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return FavoriteEvents::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function destroy($userId, $eventId)
    {
        try {
            // Check if the user ID and event ID exist and perform the deletion
            $favoriteEvent = FavoriteEvents::where('user_id', $userId)
                ->where('event_id', $eventId)
                ->firstOrFail();

            $favoriteEvent->delete();

            return response()->json([
                'success' => true,
                'message' => 'Favorite event record deleted successfully',
            ]);
        } catch (\Exception $e) {
            return $this->sendError('Delete Error', 'An error occurred while deleting the favorite event');
        }
    }

    public function getFavoriteEvents(Request $request)
    {
        
        $user =Auth::user();
        $favoriteEvents = $user->favoriteEvents;
        return response()->json($favoriteEvents);
    }

   public function getFavoriteStatus($userId, $eventId)
    {
        // Check if the favorite event exists in the database
        $favoriteEvent = FavoriteEvents::where('user_id', $userId)
            ->where('event_id', $eventId)
            ->exists();

        return $favoriteEvent;
    }
}
