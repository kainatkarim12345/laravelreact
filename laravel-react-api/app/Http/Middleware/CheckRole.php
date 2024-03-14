<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckRole
{
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check()){
            $user_id = $request->user()->id;
           
            $userRoles = DB::table('user_roles')
                        ->join('users','users.id','=','user_roles.user_id')
                        ->join('roles','roles.id','=','user_roles.role_id')
                        ->where('user_roles.user_id', $user_id)
                        ->select('roles.name')
                        ->pluck('name');

            $user = User::with('roles.permissions')->where('users.id','=', $request->user()->id)->get();

            if ($userRoles->isEmpty()) {
                return redirect('/'); 
            }
            
            $firstRole = $userRoles[0];
            
            switch ($firstRole) {
                case 'Administration':
                    $response = [
                        'user' => $user,
                        'role' => $firstRole
                    ];
                    return response()->json($response);
                case 'Viewer':
                    $response = [
                        'user' => $user,
                        'role' => $firstRole
                    ];
                    return response()->json($response);

                case 'Editor':
                    $response = [
                        'user' => $user,
                        'role' => $firstRole
                    ];
                    return response()->json($response);

                default:
                    return redirect('/login');
            }
        }else{
            return redirect('/login');
        }
    }
}
