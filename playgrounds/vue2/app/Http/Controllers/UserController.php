<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index()
    {
        return view('pages.users');
    }

    public function store(UserStoreRequest $storeRequest): JsonResponse
    {
        // Create users.
        return response()->json([]);
    }
}
