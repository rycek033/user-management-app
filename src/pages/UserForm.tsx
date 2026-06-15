import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createUser, getUserById, updateUser } from '../services/api';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Email format is invalid'),
    city: z.string().min(1, 'City is required'),
    companyName: z.string().optional()
});

type UserFormValues = z.infer<typeof userSchema>;

export const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [notification, setNotification] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: '',
            email: '',
            city: '',
            companyName: ''
        }
    });

    useEffect(() => {
        if (isEditMode && id) {
            getUserById(id).then(user => {
                reset({
                    name: user.name,
                    email: user.email,
                    city: user.address.city,
                    companyName: user.company.name
                });
            }).catch(err => console.error(err));
        }
    }, [id, isEditMode, reset]);

    const onSubmit = async (data: UserFormValues) => {
        setNotification(null);

        const payload = {
            name: data.name,
            email: data.email,
            address: { city: data.city },
            company: { name: data.companyName }
        };

        try {
            if (isEditMode && id) {
                await updateUser(id, payload as any);
                setNotification('User updated successfully! (200 OK)');
            } else {
                await createUser(payload as any);
                setNotification('User created successfully! (200 OK)');
                if (!isEditMode) reset(); // Czyścimy pola po utworzeniu
            }

            setTimeout(() => {
                navigate('/users');
            }, 2000);

        } catch (err) {
            setNotification('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link to='/users' className="text-blue-600 hover:underline mb-6 inline-block font-medium">
                &larr; Back to Users
            </Link>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit User' : 'Create User'}</h2>
                
                {notification && (
                    <div className={`p-4 mb-6 rounded-md ${notification.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {notification}
                    </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input
                            {...register('name')}
                            type="text"
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                            {...register('email')}
                            type="email"
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                        <input
                            {...register('city')}
                            type="text"
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            {...register('companyName')}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                    >
                        {isSubmitting ? 'Saving...' : 'Save User'}
                    </button>
                </form>
            </div>
        </div>
    );
};