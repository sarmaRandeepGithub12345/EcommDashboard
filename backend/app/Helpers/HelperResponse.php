<?php



    function HelperResponse($result,$message, $statusCode = 200, $data = [] ,$token=null){
        if($token){
            return response()->json([
                'result' => $result,
                'message' => $message,
                'data' => $data,
                'token' => $token
            ],$statusCode);
        }else{
            return response()->json([
                'result' => $result,
                'message' => $message,
                'data' => $data,
            ],$statusCode);
        }
    }

