<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    function addProduct(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'price' => 'required|integer|min:0',
            'description' => 'required|string|max:100',
            'file' => 'required|file'
        ]);
        if ($validation->fails()) {
            return HelperResponse(
                'error',
                $validation->errors()->first(),
                422,
                $validation->errors()->messages()
            );
        }

        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;

        $product->file_path = $request->file('file')->store('products');
        $product->save();
        return HelperResponse("success", "Product Uploaded", 201);
    }

    function list()
    {
        $products = Product::all();
        return HelperResponse("success", "All products sent", 200, $products);
    }
    function delete($id)
    {
        $product = Product::where('id', $id)->first();
        if (!$product) {
            return HelperResponse("error", "Product does not exists", 422);
        }
        if (Storage::exists($product->file_path)) {
            Storage::delete($product->file_path);
        } else {
            return HelperResponse("error", "File does not exists", 422);
        }
        $result = $product->delete();
        if ($result) {
            return HelperResponse("success", "Product deleted successfully", 200);
        }
        return HelperResponse("error", "Product deletion failed", 422);
    }
    function single_product($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return HelperResponse("error", "Product not found", 422);
        }
        return HelperResponse("success", "Product found!", 200, $product);
    }
    function update_product($id, Request $request)
    {

        $validation = Validator::make($request->all(), [
            'name' => 'string|max:100',
            'price' => 'integer|min:0',
            'description' => 'string|max:100',

        ]);
        if ($validation->fails()) {
            return HelperResponse(
                'error',
                $validation->errors()->first(),
                422,
                $validation->errors()->messages()
            );
        }

        $product = Product::find($id);
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        if ($request->hasFile('file')) {
            if (Storage::exists($product->file_path)) {
                Storage::delete($product->file_path);
                $product->file_path = $request->file('file')->store('products');
            } else {
                return HelperResponse("error", "File not found", 422);
            }
        }
        $product->save();
        return HelperResponse(
            'success',
            "Product Updated",
            200

        );
    }
    function search($key)
    {
        $products = new Product;
        
        if ($key == "none") {
            $products = Product::all();
        } else {
            $products = Product::where('name', 'LIKE', "%$key%")->get();
        }
        return HelperResponse("success", "Results", 200, $products);
    }
}
