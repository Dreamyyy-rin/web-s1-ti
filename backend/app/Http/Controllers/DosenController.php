<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class DosenController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $search = $request->query('search');

        $query = Dosen::query();

        if ($search) {
            $query->where('nama_lengkap', 'like', '%' . $search . '%')
                  ->orWhere('keahlian_rekognisi', 'like', '%' . $search . '%');
        }

        $dosen = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'data' => $dosen->items(),
            'meta' => [
                'current_page' => $dosen->currentPage(),
                'per_page' => $dosen->perPage(),
                'last_page' => $dosen->lastPage(),
                'total' => $dosen->total(),
            ]
        ], Response::HTTP_OK);
    }

    // Buat dosen
    public function store(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'keahlian_rekognisi' => 'nullable|string',
            'email' => 'required|email|unique:dosen,email',
            'external_link' => 'nullable|url',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $photoPath = $request->hasFile('photo')
            ? $request->file('photo')->store('dosen_photos', 'public')
            : null;

        $dosen = Dosen::create([
            'nama_lengkap' => $request->nama_lengkap,
            'keahlian_rekognisi' => $request->keahlian_rekognisi,
            'email' => $request->email,
            'external_link' => $request->external_link,
            'photo' => $photoPath,
        ]);

        return response()->json([
            'message' => 'Dosen berhasil ditambahkan!',
            'dosen' => $dosen
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $dosen = Dosen::findOrFail($id);

        return response()->json($dosen, Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $dosen = Dosen::findOrFail($id);

        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'keahlian_rekognisi' => 'nullable|string',
            'email' => 'required|email|unique:dosen,email,' . $dosen->id,
            'external_link' => 'nullable|url',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($dosen->photo) {
                Storage::disk('public')->delete($dosen->photo);
            }
            $dosen->photo = $request->file('photo')->store('dosen_photos', 'public');
        }

        $dosen->update([
            'nama_lengkap' => $request->nama_lengkap,
            'keahlian_rekognisi' => $request->keahlian_rekognisi,
            'email' => $request->email,
            'external_link' => $request->external_link,
        ]);

        return response()->json([
            'message' => 'Dosen berhasil diperbarui!',
            'dosen' => $dosen
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $dosen = Dosen::findOrFail($id);

        if ($dosen->photo) {
            Storage::disk('public')->delete($dosen->photo);
        }

        $dosen->delete();

        return response()->json(['message' => 'Dosen berhasil dihapus!'], Response::HTTP_OK);
    }
}
