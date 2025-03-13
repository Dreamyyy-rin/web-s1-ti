<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class PengumumanController extends Controller
{
    // Ambil semua pengumuman
    public function index()
    {
        return response()->json(Pengumuman::with('user:id,name')->latest()->get(), Response::HTTP_OK);
    }

    // Buat pengumuman
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('pengumuman_files', 'public');
        }

        $pengumuman = Pengumuman::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'file' => $filePath,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Pengumuman berhasil dibuat!',
            'pengumuman' => $pengumuman
        ], Response::HTTP_CREATED);
    }

    // Get detail pengumuman
    public function show($id)
    {
        $pengumuman = Pengumuman::with('user:id,name')->findOrFail($id);
        return response()->json($pengumuman, Response::HTTP_OK);
    }

    // Update pengumuman
    public function update(Request $request, $id)
    {
        $pengumuman = Pengumuman::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
        ]);

        if ($request->hasFile('file')) {
            if ($pengumuman->file) {
                Storage::disk('public')->delete($pengumuman->file);
            }
            $pengumuman->file = $request->file('file')->store('pengumuman_files', 'public');
        }

        $pengumuman->update([
            'judul' => $request->judul,
            'isi' => $request->isi,
        ]);

        return response()->json([
            'message' => 'Pengumuman berhasil diperbarui!',
            'pengumuman' => $pengumuman
        ], Response::HTTP_OK);
    }

    // Hapus pengumuman
    public function destroy($id)
    {
        $pengumuman = Pengumuman::findOrFail($id);

        if ($pengumuman->file) {
            Storage::disk('public')->delete($pengumuman->file);
        }

        $pengumuman->delete();

        return response()->json(['message' => 'Pengumuman berhasil dihapus!'], Response::HTTP_OK);
    }
}


