<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'price_usd',
        'price_cdf',
        'photos',
        'active',
    ];

    protected $casts = [
        'photos' => 'array',
        'active' => 'boolean',
        'price_usd' => 'decimal:2',
        'price_cdf' => 'decimal:2',
    ];
}
