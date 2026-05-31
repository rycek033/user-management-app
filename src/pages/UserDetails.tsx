import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import type { User } from '../types'
import { getUserById } from '../services/api'
import { BiEnvelope, BiPhone, BiGlobe } from 'react-icons/bi';
import { UserPosts } from "../components/UserPosts";

export function UserDetails() {

    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                const data = await getUserById(id)
                setUser(data)
            } catch(err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    },[id])

    if (loading) return <div className='p-12 text-center text-gray-500'>Loading user details...</div>
    if (error) return <div className='p-4 bg-red-100 text-red-700 rounded-md'>Error: {error}</div>
    if (!user) return <div className='p-4'>No user found.</div>

    return(
        <div>
            <Link to = '/users' className='text-blue-600 hover:underLine mb-6 inline-block font-medium'>
                &larr; Back to Users
            </Link>

            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>{user.name}</h2>
                <p className="text-gray-500 mb-8">@{user.username}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Contact details</h3>
                        <p className="mb-2"><BiEnvelope className="inline mr-2"/> {user.email}</p>
                        <p className="mb-2"><BiPhone className="inline mr-2"/> {user.phone}</p>
                        <p className="mb-2"><BiGlobe className="inline mr-2"/> {user.website}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Address</h3>
                        <p>{user.address.street}, {user.address.suite}</p>
                        <p>{user.address.city}, {user.address.zipcode}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Company</h3>
                        <p className="font-medium text-gray-900">{user.company.name}</p>
                        <p className="text-gray-600 italic">{user.company.catchPhrase}</p>
                        <p className="text-gray-500 text-sm mt-1">{user.company.bs}</p>
                    </div>
                </div>
            </div>
            <UserPosts userId={user.id.toString()} />
        </div>
    )
}