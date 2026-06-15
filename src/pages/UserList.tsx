import { useState } from 'react';
import { BiEnvelope, BiBuildingHouse, BiMap, BiEdit, BiTrash, BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';

export function UserList() {
    const { users, isLoading, error, deleteUser } = useUsers()
    const [searchQuery, setSearchQuery] = useState('')
    const [userToDelete, setUserToDelete] = useState<{ id: number; name: string } | null>(null)

    const handleConfirmDelete = async () => {
        if (userToDelete) {
            await deleteUser(String(userToDelete.id))
            setUserToDelete(null);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-xl text-gray-500">Downloading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-md border border-red-200">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-semibold">Users</h2>
                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BiSearch className="text-gray-400 text-xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            {filteredUsers.length === 0 ? (
                <div className="text-center p-12 text-gray-500 bg-white rounded-lg border border-gray-200">
                    No users found matching "{searchQuery}"
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-500">@{user.username}</p>
                            </div>

                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <BiEnvelope className="text-blue-500 text-lg" />
                                    <span>{user.email}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <BiBuildingHouse className="text-blue-500 text-lg" />
                                    <span>{user.company.name}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <BiMap className="text-blue-500 text-lg" />
                                    <span>{user.address.city}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <Link
                                    to={`/users/${user.id}`}
                                    className="flex-1 block text-center py-2 bg-blue-50 text-blue-600 rounded font-medium hover:bg-blue-100 transition-colors"
                                >
                                    View Details
                                </Link>

                                <Link
                                    to={`/users/edit/${user.id}`}
                                    className="px-3 py-2 bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-200 transition-colors flex items-center justify-center"
                                    title="Edit User"
                                >
                                    <BiEdit className="text-xl" />
                                </Link>

                                <button
                                    onClick={() => setUserToDelete({ id: user.id, name: user.name })}
                                    className="px-3 py-2 bg-red-50 text-red-600 rounded border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center"
                                    title="Delete User"
                                >
                                    <BiTrash className="text-xl" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {userToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete user "{userToDelete.name}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setUserToDelete(null)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}