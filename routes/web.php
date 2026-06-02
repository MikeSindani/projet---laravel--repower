<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('welcome', [
        'products' => Product::where('active', true)->get()
    ]);
})->name('home');

Route::inertia('/about', 'about')->name('about');

Route::get('/nos-produits', function () {
    return inertia('nos-produits', [
        'products' => Product::where('active', true)->get()
    ]);
})->name('products');

Route::get('/produit/{id}', function ($id) {
    $product = Product::where('active', true)->whereKey($id)->firstOrFail();
    $relatedProducts = Product::where('category', $product->category)
        ->where('id', '!=', $product->id)
        ->where('active', true)
        ->get();
    return inertia('product-detail', [
        'product' => $product,
        'relatedProducts' => $relatedProducts
    ]);
})->name('product-detail');
Route::inertia('/nos-services', 'nos-services')->name('services');
Route::inertia('/demander-un-devis', 'demander-un-devis')->name('quote-request');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// API Routes for Products
Route::prefix('api')->group(function () {
    Route::apiResource('products', ProductController::class);
});

require __DIR__.'/settings.php';
