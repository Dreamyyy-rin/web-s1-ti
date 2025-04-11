<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'in:admin,user'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'admin',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ], Response::HTTP_OK);
    }

    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ], Response::HTTP_OK);
    }
//Google Login
    public function googleLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'name' => 'required|string'
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make('Admin.312'),//default password
                'role' => 'admin'
            ]);
        }
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Login with Google successful',
            'token' => $token,
            'user' => $user
        ], Response::HTTP_OK);
    }
    
    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully'], Response::HTTP_OK);
    }

    // CHECK USER YANG LOGIN
    public function me(Request $request)
    {
        return response()->json($request->user(), Response::HTTP_OK);
    }
}
