<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\LowonganController;
use Illuminate\Support\Facades\Route;

// AUTH
Route::post('/register', [AuthController::class, 'register']); // Register 
Route::post('/login', [AuthController::class, 'login']); // Login 

// PENGUMUMAN/Lowongan
Route::get('/pengumuman', [PengumumanController::class, 'index']); // Get all pengumuman
Route::get('/pengumuman/{id}', [PengumumanController::class, 'show']); // Get salah satu pengumuman
Route::get('/lowongan', [LowonganController::class, 'index']); // Get semua lowongan
Route::get('/lowongan/{id}', [LowonganController::class, 'show']); // Get detail lowongan

// Hanya bisa diakses setelah login
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']); // Logout 
    Route::get('/me', [AuthController::class, 'me']); //untuk test data user yang sedang login

    // Hanya admin yang bisa buat/edit/hapus pengumuman/lowongan
    Route::middleware('admin')->group(function () {
        Route::post('/pengumuman', [PengumumanController::class, 'store']); // Create pengumuman
        Route::post('/pengumuman/{id}', [PengumumanController::class, 'update']); // Update pengumuman
        Route::delete('/pengumuman/{id}', [PengumumanController::class, 'destroy']); // Delete pengumuman
        Route::post('/lowongan', [LowonganController::class, 'store']); // Buat lowongan
        Route::post('/lowongan/{id}', [LowonganController::class, 'update']); // Update lowongan
        Route::delete('/lowongan/{id}', [LowonganController::class, 'destroy']); // Hapus lowongan
    });
});

