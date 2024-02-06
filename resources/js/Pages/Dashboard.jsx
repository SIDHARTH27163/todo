import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard({ auth,  todos  , message} ) {
  console.log(todos)
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Dashboard" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">Add Todo</div>
                           
                            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

                          <div>
   
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {todos && todos.map(todo => (
                <tr key={todo.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{todo.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{todo.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{todo.is_completed==0?<p className='text-red-700 text-lg'>Not Completed</p>:<p className='text-green-600 text-lg'>Completed</p>}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{todo.is_completed==0?<Link to={`/change_status?id=${todo.id}`}  className='text-red-700 text-lg'>Mark Completed</Link>:<Link to={`/delete?id=${todo.id}`} className='text-sky-600 text-lg'>Delete</Link>}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
