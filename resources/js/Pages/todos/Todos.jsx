import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';

export default function Todos({ auth, errors, message }) {
    const { data, setData, post, processing } = useForm({
        title: '',
        description: '',
    });
  
   
    const submit = (e) => {
        e.preventDefault();
        post(route('add_todo'));
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Todos</h2>}>
                <Head title="Todos" />
                {/* Display message inside AuthenticatedLayout */}
              
                <div className="py-12">
                    <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 flex items-center justify-center">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-3/4 p-5">
                              {message && (
                    <div className="bg-green-200 text-green-800 p-4 mb-4">
                        {message}
                    </div>
                )}
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    <InputError message={errors && errors.title} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors && errors.description} className="mt-2" />
                                </div>
                                <div className="flex items-center justify mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Submit
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
