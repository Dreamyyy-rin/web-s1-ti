<?php

namespace App\Http\Controllers;

use App\Models\Lowongan;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class LowonganController extends Controller
{
    // Get semua lowongan
    public function index()
    {
        $lowongan = Lowongan::with('user:id,name')->latest()->get();

        return response()->json($lowongan, Response::HTTP_OK);
    }

    // Buat lowongan
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
            'link_pendaftaran' => 'nullable|url',
        ]);

        $filePath = $request->hasFile('file') 
            ? $request->file('file')->store('lowongan_files', 'public') 
            : null;

        $lowongan = Lowongan::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'file' => $filePath,
            'link_pendaftaran' => $request->link_pendaftaran,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Lowongan berhasil dibuat!',
            'lowongan' => $lowongan
        ], Response::HTTP_CREATED);
    }

    // Get detail lowongan
    public function show($id)
    {
        $lowongan = Lowongan::with('user:id,name')->findOrFail($id);
        return response()->json($lowongan, Response::HTTP_OK);
    }

    // Update lowongan
    public function update(Request $request, $id)
    {
        $lowongan = Lowongan::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
            'link_pendaftaran' => 'nullable|url',
        ]);

        // Hapus file lama jika ada & upload file baru
        if ($request->hasFile('file')) {
            if ($lowongan->file) {
                Storage::disk('public')->delete($lowongan->file);
            }
            $lowongan->file = $request->file('file')->store('lowongan_files', 'public');
        }

        $lowongan->update([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'file' => $lowongan->file,
            'link_pendaftaran' => $request->link_pendaftaran,
        ]);

        return response()->json([
            'message' => 'Lowongan berhasil diperbarui!',
            'lowongan' => $lowongan
        ], Response::HTTP_OK);
    }

    // Hapus lowongan
    public function destroy($id)
    {
        $lowongan = Lowongan::findOrFail($id);

        if ($lowongan->file) {
            Storage::disk('public')->delete($lowongan->file);
        }

        $lowongan->delete();

        return response()->json(['message' => 'Lowongan berhasil dihapus!'], Response::HTTP_OK);
    }


}