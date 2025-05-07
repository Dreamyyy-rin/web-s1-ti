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

        return response()->json([
            'message' => 'Admin berhasil dibuat!',
            'admin' => $user
        ], Response::HTTP_CREATED);
    }

    public function indexAdmin(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $search = $request->query('search');
        $sortBy = $request->query('sort_by', 'latest');
        $fromDate = $request->query('from_date');
        $toDate = $request->query('to_date');

        $query = User::where('role', 'admin');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        if ($fromDate && $toDate) {
            $query->whereBetween('created_at', [
                $fromDate . ' 00:00:00',
                $toDate . ' 23:59:59'
            ]);
        } elseif ($fromDate) {
            $query->where('created_at', '>=', $fromDate . ' 00:00:00');
        } elseif ($toDate) {
            $query->where('created_at', '<=', $toDate . ' 23:59:59');
        }

        if ($sortBy === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $admins = $query->paginate($perPage);

        return response()->json([
            'data' => $admins->items(),
            'meta' => [
                'current_page' => $admins->currentPage(),
                'per_page' => $admins->perPage(),
                'last_page' => $admins->lastPage(),
                'total' => $admins->total(),
            ]
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
            return response()->json(['message' => 'User belum  terdaftar'], Response::HTTP_UNAUTHORIZED);
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

    public function destroyAdmin($id)
    {
        $admin = User::where('role', 'admin')->findOrFail($id);

        $admin->delete();

        return response()->json(['message' => 'Admin berhasil dihapus!'], Response::HTTP_OK);
    }
}
