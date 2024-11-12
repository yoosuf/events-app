<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryCollection;


class CategoryController extends Controller
{
    /**
     * Display a paginated listing of categories.
     *
     * @param Request $request
     * @return CategoryCollection
     */
    public function index(Request $request)
    {
        // Set pagination limit (optional)
        $perPage = $request->get('per_page', 10);

        // Eager load related data and paginate results
        $categories = Category::with(['coverImage', 'thumbnail'])->paginate($perPage);

        // Return the categories in a structured format using CategoryCollection
        return new CategoryCollection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
