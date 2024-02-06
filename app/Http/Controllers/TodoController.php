<?php

namespace App\Http\Controllers;
use Illuminate\Validation\Rules;
use App\Models\Todo;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Providers\RouteServiceProvider;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class TodoController extends Controller
{
    //
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function index(Request $request)
    {
     try{
       $data = $request->only('title' , 'description');
       $validator = Validator::make($data, [  
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:2055',
   ]);
   if ($validator->fails()) {

       // get the error messages from the validator
       $messages = $validator->messages();

       // redirect our user back to the form with the errors from the validator
     
           return redirect()->back()->withErrors($messages);
           //return ($messages);
   }else{
    $todo = Todo::create([
        'title' => $data['title'],
        'description' => $data['description'],
        'user_id' => auth()->id(), 
    ]);
    return Inertia::location(route('dashboard'));
   }

}catch(\Exception $e){
    dd($e);
}
    
    }

    public function get_todo_list(){
        try{
            $user = Auth::user();
            $todos=  DB::table('todos')->where('user_id' , $user->id )->orderBy('id' , 'desc')->get();

            return Inertia::render('Dashboard', ['todos' => $todos]);
        }catch(\Exception $e){
            dd($e);
        }
    }
    public function edit(Request $request){
        try{
            $todoId = $request->query('id');
            $todo = Todo::find($todoId);

            return Inertia::render('todos/Edit', ['todo' => $todo]);
        }catch(\Exception $e){
            dd($e);
        }
    }
    public function edit_todo(Request $request ,  $id){
        try{
            $validator = Validator::make($request->all(), [  
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:2055',
            ]);
    
            // If validation fails, return error response
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            // Find the todo by id
            $todo = Todo::find($id);
    
            // If todo not found, return error response
            if (!$todo) {
                return response()->json(['error' => 'Todo not found'], 404);
            }
    
            // Update the todo with new data
            $todo->title = $request->title;
            $todo->description = $request->description;
            $todo->save();
    
            // Return success response
            return response()->json(['message' => 'Todo updated successfully']);
        }catch(\Exception $e){
            dd($e);
        }
    }
    public function change_status( Request $request){
        $todoId = $request->query('id');
        DB::update('update todos set is_completed = 1 where id = ?', [$todoId]);
        $message = 'Todo status updated successfully.';
        
        $todos = Todo::all(); // Retrieve all todos (or filtered todos)
        
        return Inertia::render('Dashboard', [
            'message' => $message,
            'todos' => $todos,
        ]);


    }
    public function delete( Request $request){
        $todoId = $request->query('id');
        DB::delete('delete from todos where id = ?',[ $todoId]);
        $message = 'Todo deleted successfully.';
        $todos = Todo::all(); // Retrieve all todos (or filtered todos)
        
        return Inertia::render('Dashboard', [
            'message' => $message,
            'todos' => $todos,
        ]);
    }
}
