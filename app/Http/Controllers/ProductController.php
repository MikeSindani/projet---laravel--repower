<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        // Parse photos JSON for each product
        $products = $products->map(function ($product) {
            if (is_string($product->photos)) {
                try {
                    $product->photos = json_decode($product->photos, true) ?? [];
                } catch (\Exception $e) {
                    $product->photos = [];
                }
            }
            return $product;
        });
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'price_usd' => 'required|numeric|min:0',
            'price_cdf' => 'required|numeric|min:0',
            'photos' => 'nullable|array',
            'active' => 'nullable|boolean',
        ]);

        // Convert photos array to JSON
        if (isset($validated['photos']) && is_array($validated['photos'])) {
            $validated['photos'] = json_encode($validated['photos']);
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'price_usd' => 'numeric|min:0',
            'price_cdf' => 'numeric|min:0',
            'photos' => 'nullable|array',
            'active' => 'boolean',
        ]);

        // Convert photos array to JSON
        if (isset($validated['photos']) && is_array($validated['photos'])) {
            $validated['photos'] = json_encode($validated['photos']);
        }

        $product->update($validated);
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
