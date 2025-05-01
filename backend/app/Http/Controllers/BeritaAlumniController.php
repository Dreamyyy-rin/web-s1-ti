<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class BeritaAlumniController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $search = $request->query('search');
        $sortBy = $request->query('sort_by', 'latest');
        $fromDate = $request->query('from_date');
        $toDate = $request->query('to_date');
    
        $query = Pengumuman::with('user:id,name')
            ->where('kategori', 'berita_alumni');
    
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', '%' . $search . '%')
                  ->orWhere('kategori', 'like', '%' . $search . '%');
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
    
        $berita = $query->paginate($perPage);
    
        return response()->json([
            'data' => $berita->items(),
            'meta' => [
                'current_page' => $berita->currentPage(),
                'per_page' => $berita->perPage(),
                'last_page' => $berita->lastPage(),
                'total' => $berita->total(),
            ]
        ], Response::HTTP_OK);
    }
    

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'kategori' => 'nullable|string|max:255',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
        ]);

        $filePath = $request->hasFile('file')
            ? $request->file('file')->store('berita_alumni_files', 'public')
            : null;

        $berita = Pengumuman::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'file' => $filePath,
            'kategori' => 'berita_alumni',
            'user_id' => auth()->id(), 
        ]);

        return response()->json([
            'message' => 'Berita alumni berhasil dibuat!',
            'berita' => $berita
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $berita = Pengumuman::with('user:id,name')
            ->where('kategori', 'berita_alumni')
            ->findOrFail($id);

        return response()->json($berita, Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $berita = Pengumuman::where('kategori', 'berita_alumni')->findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'kategori' => 'nullable|string|max:255',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
        ]);

        if ($request->hasFile('file')) {
            if ($berita->file) {
                Storage::disk('public')->delete($berita->file);
            }
            $berita->file = $request->file('file')->store('berita_alumni_files', 'public');
        }

        $berita->update([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'file' => $berita->file,
            'kategori' => 'berita_alumni',
        ]);

        return response()->json([
            'message' => 'Berita alumni berhasil diperbarui!',
            'berita' => $berita
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $berita = Pengumuman::where('kategori', 'berita_alumni')->findOrFail($id);

        if ($berita->file) {
            Storage::disk('public')->delete($berita->file);
        }

        $berita->delete();

        return response()->json(['message' => 'Berita alumni berhasil dihapus!'], Response::HTTP_OK);
    }

}
