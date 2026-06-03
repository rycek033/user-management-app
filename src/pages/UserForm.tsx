import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createUser, getUserById, updateUser } from '../services/api';

export function UserForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        companyName: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (isEditMode && id) {
            getUserById(id).then(user => {
                setFormData({
                    name: user.name,
                    email: user.email,
                    city: user.address.city,
                    companyName: user.company.name
                });
            }).catch(err => console.error(err));
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email format is invalid';
        }
        if (!formData.city.trim()) newErrors.city = 'City is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setNotification(null);

        const payload = {
            name: formData.name,
            email: formData.email,
            address: { city: formData.city },
            company: { name: formData.companyName }
        };

        try {
            if (isEditMode && id) {
                await updateUser(id, payload as any);
                setNotification('User updated successfully! (200 OK)');
            } else {
                await createUser(payload as any);
                setNotification('User created successfully! (200 OK)');
            }

            if (!isEditMode) {
                setFormData({ name: '', email: '', city: '', companyName: '' });
            }

            setTimeout(() => {
                navigate('/users');
            }, 2000);

        } catch (err) {
            setNotification('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
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
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                    >
                        {isSubmitting ? 'Submitting...' : 'Save User'}
                    </button>
                </form>
            </div>
        </div>
    );
}