<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lowongan extends Model
{
    use HasFactory;

    protected $table = 'lowongan'; 

    protected $fillable = [
        'judul',
        'deskripsi',
        'file',
        'link_pendaftaran',
        'user_id',
    ];
    //kalau mau liat urlnya di json reponse
    //protected $appends = ['file_url'];

    
    public function getFileUrlAttribute()
    {
    return $this->file ? asset("storage/{$this->file}") : null;
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
