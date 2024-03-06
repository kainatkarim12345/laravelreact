<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Permission;
use App\Models\RoleHasPermission;

class AdminController extends Controller
{
    public function roles(){
        $roles = Role::all();
        return response()->json($roles);
    }

    public function permissions(){
        $permissions = Permission::all();
        return response()->json($permissions);
    }
    
    public function addrole(REQUEST $request){
        
        $validator = Validator::make($request->all(), [
            'role' => 'required',
            'permissions' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); 
        } else {

            $role = new Role();
            $role->role = $request->role;
            $role->save();
            $role_id = $role->id;

            foreach ($request->permissions as $permission_id) {
                $rolePermission = new RoleHasPermission();
                $rolePermission->role_id = $role_id;
                $rolePermission->permission_id = $permission_id;
                $rolePermission->save();
            }

            return response()->json('Role successfully created');
        }
    }

    public function roledetail(REQUEST $request){
        
        $roleId = $request->query('type');

        $roledata = DB::table('role_has_permissions')
                ->join('roles', 'roles.id', '=', 'role_has_permissions.role_id')
                ->join('permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
                ->select('roles.*','permissions.name')
                ->where('role_has_permissions.role_id', '=', $roleId)
                ->get();
    
        return response()->json($roledata);
    }

    public function roleDelete(REQUEST $request){
        
        $id = $request->query('type');

        Role::whereId($id)->first()->delete();
        RoleHasPermission::where('role_id',$id)->delete();
        return response()->json('successfully deleted');
    }
}
