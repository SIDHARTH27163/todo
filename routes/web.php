<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Route::get('todos' , [TodoController::class , 'index'])->name('todo');
});

Route::get('/todos', function () {
    return Inertia::render('todos/Todos');
})->middleware(['auth', 'verified'])->name('todos');

Route::get('/dashboard', [TodoController::class , 'get_todo_list'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/change_status', [TodoController::class , 'change_status'])->middleware(['auth', 'verified']);
Route::get('/delete', [TodoController::class , 'delete'])->middleware(['auth', 'verified']);
Route::post('add_todo' , [TodoController::class , 'index'])->middleware(['auth', 'verified'])->name('add_todo');
Route::get('edit_todo' , [TodoController::class , 'edit'])->middleware(['auth', 'verified'])->name('edit_todo');
Route::put('todo.update{id}' , [TodoController::class , 'edit_todo'])->middleware(['auth', 'verified'])->name('todo.update');
require __DIR__.'/auth.php';
