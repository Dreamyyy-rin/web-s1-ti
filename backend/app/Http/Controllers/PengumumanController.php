<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class PengumumanController extends Controller
{
    // Get semua pengumuman
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $search = $request->query('search');
        $sortBy = $request->query('sort_by', 'latest'); // default: latest
        $fromDate = $request->query('from_date'); 
        $toDate = $request->query('to_date');     
    
        $query = Pengumuman::with('user:id,name')
            ->where('kategori', 'pengumuman');
    
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', '%' . $search . '%')
                  ->orWhere('kategori', 'like', '%' . $search . '%');
            });
        }
    
        // Filter tanggal
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
    
        // Urutan data
        if ($sortBy === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }
    
        $pengumuman = $query->paginate($perPage);


    
        return response()->json([
            'data' => $pengumuman->items(),
            'meta' => [
                'current_page' => $pengumuman->currentPage(),
                'per_page' => $pengumuman->perPage(),
                'last_page' => $pengumuman->lastPage(),
                'total' => $pengumuman->total(),
            ]
        ], Response::HTTP_OK);
    }
    
    
    

    // Buat pengumuman
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'kategori' => 'nullable|string|max:255',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
        ]);

        $filePath = $request->hasFile('file') 
            ? $request->file('file')->store('pengumuman_files', 'public') 
            : null;

        $pengumuman = Pengumuman::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'file' => $filePath,
            'kategori' => 'pengumuman',
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
        $pengumuman = Pengumuman::with('user:id,name')
        ->where('kategori', 'pengumuman')
        ->findOrFail($id);

        return response()->json($pengumuman, Response::HTTP_OK);
    }

    // Update pengumuman
    public function update(Request $request, $id)
    {
        $pengumuman = Pengumuman::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'kategori' => 'nullable|string|max:255',
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
            'kategori' => 'pengumuman',
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
