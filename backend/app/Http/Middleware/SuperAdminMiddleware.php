<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && auth()->user()->role === 'superadmin') {
            return $next($request);
        }

        return response()->json(['message' => 'Akses ditolak! Hanya admin yang diperbolehkan.'], 403);
    }
}

