<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use App\Models\UserHasRole;
use App\Models\Permission;
use App\Models\RoleHasPermission;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function roles(){
        $roles = Role::all();
        return response()->json($roles);
    }

    public function employees(){
       
        $employees = DB::table('users')
            ->join('user_has_roles', 'user_has_roles.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'user_has_roles.role_id')
            ->select('users.*', 'roles.role')
            ->where('users.id', '!=', Auth::user()->id)
            ->latest()
            ->get();

                        
        return response()->json($employees);
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

    public function employeedetail(REQUEST $request){
        
        $employeeId = $request->query('type');

        $employees = DB::table('users')
                ->join('user_has_roles', 'user_has_roles.user_id', '=', 'users.id')
                ->join('roles', 'roles.id', '=', 'user_has_roles.role_id')
                ->select('users.*','roles.role','users.id as user_id','roles.id as role_id')
                ->where('users.id', '=', $employeeId)
                ->get();

                $roleId = $employees->pluck('role_id');
                $roleIdsArray = $roleId->toArray();

        $permissions = DB::table('role_has_permissions')
                ->join('permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
                ->select('permissions.name')
                ->where('role_has_permissions.role_id', '=', $roleIdsArray)
                ->get();

        return response()->json($employees);
    }

    public function roleDelete(REQUEST $request){
        
        $id = $request->query('type');

        Role::whereId($id)->first()->delete();
        RoleHasPermission::where('role_id',$id)->delete();
        return response()->json('successfully deleted');
    }
    

    public function addEmployee(REQUEST $request){
        
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
            'city' => 'required',
            'role' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); 
        } else {

            $defaultRole = '20';

            $user = new User();
            $user->name = $request->name;
            $user->user_name = $request->username;
            $user->email = $request->email;
            $user->city = $request->city;
            $user->city = $request->city;
            $user->referral_count = '0';
            $user->provider = 'by_admin';
            $user->password = Hash::make($request->password);
            $user->referral_link = Str::random(5);
            $user->save();
            $user_id = $user->id;

            $role = $request->has('role') ? $request->role : $defaultRole;

            $userhasrole = new UserHasRole();
            $userhasrole->user_id = $user_id;
            $userhasrole->role_id = $request->role;
            $userhasrole->save();

            $details = [
                'title' => 'Mail from SurveyApp.com',
                'body' => 'Your account created successfully, password is'.' '.$request->password,
            ];
        
            \Mail::to($request->email)->send(new \App\Mail\MyTestMail($details));

            return response()->json('Employee created successfully');
        }
    }

    public function employeeStatusChange(REQUEST $request){
        // dd($request);
        $validator = Validator::make($request->all(), [
            'selectedStatus' => 'required',
            'employeeId' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); 
        } else {

            
            $user = User::where('id',$request->employeeId)->update(['status'=>$request->selectedStatus]);

            return response()->json('Employee status changed');
        }
    }

}
