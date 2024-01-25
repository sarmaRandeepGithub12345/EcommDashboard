<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    function register(Request $request){
        $validation = Validator::make($request->all(),[     
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8'
        ]);
        if($validation->fails()){

            return HelperResponse('error',$validation->errors()->first(),422,
            $validation->errors()->messages()
        );
        }
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();
        
        return HelperResponse("success","User Registration Success",201);
    }
    function login(Request $request){
        
        $validation = Validator::make($request->all(),[     
            'email' => 'required|string|email|max:100',
            'password' => 'required|string|min:8'
        ]);
        if($validation->fails()){
            return HelperResponse('error',$validation->errors()->first(),422,
            $validation->errors()->messages()
        );
        }
        //if user exists or credentials match and take out only first entry
        $user = User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password,$user->password)){
           return HelperResponse("error","Email or Password is wrong",422);
        }
        //JWTAuth and attempt
        //JWT_TTL=86400
        $token = JWTAuth::attempt([
            "email" => $request->email,
            "password" => $request->password
        ]);
        if(!$token){
            return HelperResponse("error","Token not available",422);
        }
        
        return HelperResponse("success","Login Success",200,$user,$token);
    }
    
    function refreshToken(){

    }
    function logout(){
        auth()->logout();
        return HelperResponse('success', 'User Logout Successfull', 200);
    }

}
