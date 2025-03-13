<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*', 'files/*'],
    'allowed_methods' => ['GET, POST, PUT, OPTIONS'], // Bisa diganti dengan ['GET', 'POST', 'PUT', 'DELETE'] jika perlu
    'allowed_origins' => ['http://localhost:8000'], // Local Hostnya di ganti ya 
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Origin, Content-Type, X-Auth-Token , Cookie'],
    'exposed_headers' => ['Content-Disposition'], // Untuk fiel bisa diakses langsung
    'max_age' => 0,
    'supports_credentials' => true, // Biarkan true jika pakai authentication seperti Sanctum
];
