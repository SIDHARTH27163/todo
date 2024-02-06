import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center max-w-xl px-4">
                        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Welcome to My Todo App</h1>
                        {!auth.user && (
                            <div className="mb-8">
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Please authenticate to start creating todos:</p>
                                <div className="flex justify-center space-x-4">
                                    <Link
                                        href={route('login')}
                                        className="text-lg text-red-500 font-semibold hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Log in
                                    </Link>
                                    <span className="text-lg text-gray-500 dark:text-gray-400">or</span>
                                    <Link
                                        href={route('register')}
                                        className="text-lg text-red-500 font-semibold hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
