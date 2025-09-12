<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    use HasFactory;

    protected $table = 'dosen'; 

    protected $fillable = [
        'nama_lengkap',
        'keahlian_rekognisi',
        'email',
        'external_link',
        'photo',
    ];

    //protected $appends = ['photo_url'];

    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset("storage/{$this->photo}") : null;
    }

    // Contoh relasi: kalau dosen juga punya user account
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
