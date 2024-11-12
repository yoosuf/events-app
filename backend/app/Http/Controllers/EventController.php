<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Category;
use App\Models\Participant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\EventCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Resources\EventResource;
use Illuminate\Support\Facades\Auth;


class EventController extends Controller {
    /**
    * Display a listing of the events with optional filters for upcoming, passed, and current events.
    *
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */

    public function index(Request $request)
    {
        // Get the current date and time
        $now = Carbon::now();

        // Start the query, eagerly loading related data and counting participants
        $query = Event::with(['category', 'coverImage', 'thumbnail'])
                      ->withCount('participants');

        // Apply date-based filters based on the request
        if ($request->has('filter')) {
            switch ($request->input('filter')) {
                case 'upcoming':
                    $query->where('start_date', '>', $now);
                    break;

                case 'passed':
                    $query->where('end_date', '<', $now);
                    break;

                case 'current':
                    $query->where('start_date', '<=', $now)
                          ->where('end_date', '>=', $now);
                    break;
            }
        }

        // Apply category filter by ID if category_id is present
        if ($request->has('category_id')) {
            $query->where('categories_id', $request->input('category_id'));
        }

        // Apply category filter by slug if category_slug is present
        if ($request->has('category_slug')) {
            $category = Category::where('slug', $request->input('category_slug'))->first();

            if ($category) {
                $query->where('categories_id', $category->id);
            } else {
                // Return an empty LengthAwarePaginator if no category is found for the given slug
                $perPage = $request->get('per_page', 10);
                $emptyPaginator = new LengthAwarePaginator([], 0, $perPage);

                return new EventCollection($emptyPaginator);
            }
        }

        // Set pagination limit (optional)
        $perPage = $request->get('per_page', 10);

        // Paginate the results
        $events = $query->paginate($perPage);

        return new EventCollection($events);
    }

    /**
    * Display the specified resource.
    */

    public function show( string $id ) {
        $event = Event::with(['category', 'coverImage', 'thumbnail'])->findOrFail($id);
        return new EventResource($event);
    }


    /**
     * Allows a user to join an event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $eventId
     * @return \Illuminate\Http\JsonResponse
     */
    public function joinEvent(Request $request, $eventId)
    {
        // Get the authenticated user's ID
        $userId = Auth::id();

        // Check if the event exists
        $event = Event::findOrFail($eventId);

        // Check if the user is already a participant
        $existingParticipant = Participant::where('event_id', $eventId)
                                          ->where('user_id', $userId)
                                          ->first();

        if ($existingParticipant) {
            return response()->json([
                'status' => 'error',
                'message' => 'User is already a participant in this event.',
            ], 409);
        }

        // Create a new participant record
        $participant = Participant::create([
            'event_id' => $eventId,
            'user_id' => $userId,
            'status' => 'pending',
            'is_confirmed' => false,
            'hashToken' => bin2hex(random_bytes(32)),
        ]);

        // Dispatch the email job with a delay of 5 minutes
        SendJoinEventVerificationEmail::dispatch($participant)->delay(now()->addMinutes(5));

        return response()->json([
            'status' => 'success',
            'message' => 'User successfully joined the event. A verification email has been sent.',
            'participant' => $participant,
        ], 201);
    }


    public function verifyParticipant($token)
    {
        $participant = Participant::where('hashToken', $token)->firstOrFail();

        $participant->update([
            'status' => 'confirmed',
            'is_confirmed' => true,
            'confirmed_at' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Your participation has been confirmed.',
        ]);
    }


        /**
     * Get the events that the authenticated user has joined.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getJoinedEvents()
    {
        // Get the authenticated user's ID
        $userId = Auth::id();

        // Check if the user is authenticated
        if (!$userId) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not authenticated.',
            ], 401);
        }

        // Get the events that the user has joined
        $joinedEvents = Event::with(['category', 'coverImage', 'thumbnail'])
            ->whereHas('participants', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->get();

        return response()->json([
            'status' => 'success',
            'events' => EventResource::collection($joinedEvents),
        ]);
    }
}
