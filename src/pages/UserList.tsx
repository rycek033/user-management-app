import {useState, useEffect} from 'react'
import type {User} from '../types'
import {getUsers, deleteUser} from '../services/api'
import { BiEnvelope, BiBuildingHouse, BiMap, BiEdit, BiTrash} from 'react-icons/bi';
import { Link } from 'react-router-dom';

export function UserList() {

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const data = await getUsers();
                setUsers(data);
            }catch (err){
                setError(err instanceof Error ? err.message : 'Unknown error');
            }finally{
                setLoading(false);
            }
        }

        fetchUsers();
    }, [])

    const handleDelete = async (id: number, name: string) => {
        if(window.confirm(`Are you sure you want to delete user "${name}"?`)){
            try{
                await deleteUser(id.toString())
                setUsers(users.filter(user => user.id !== id))
                alert(`User "${name}" has been deleted.`)
            }catch(err){
                alert(`Failed to delete user "${name}". Please try again.`)
            }
        }
    }

    if (loading) {
        return(
            <div className = "flex justify-center p-12">
                <p className = "text-xl text-gray-500">Downloading users..</p>
            </div>
        )
    }

    if(error){
        return(
            <div className="p-4 bg-red-100 text-red-700 rounded-mb border border-red-200">
                <p>Error: {error}</p>
            </div>
        )
    }

    return(
        <div>
            <h2 className="text-2xl font-semibold mb-6">Users</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {users.map((user) => (
                    <div key = {user.id} 
                    className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'
                    >
                    <div className='mb-4'>
                        <h3 className='text-lg font-bold text-gray-900'>{user.name}</h3>
                        <p className='text-sm text-gray-500'>@{user.username}</p>
                    </div>

                    <div className='space-y-3 text-sm text-gray-700'>
                        <div className='flex items-center gap-2'>
                        <BiEnvelope className='text-blue-500 text-lg'/>
                        <span>{user.email}</span>
                        </div>

                        <div className='flex items-center gap-2'>
                        <BiBuildingHouse className='text-blue-500 text-lg'/>
                        <span>{user.company.name}</span>
                        </div>

                        <div className='flex items-center gap-2'>
                        <BiMap className='text-blue-500 text-lg'/>
                        <span>{user.address.city}</span>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-2'>
                      <Link
                        to={`/users/${user.id}`}
                        className='flex-1 block text-center py-2 bg-blue-50 text-blue-600 rounded font-medium hover:bg-blue-100 transition-colors'
                        >
                          View Details
                        </Link>
                        
                        <Link
                            to={`/users/edit/${user.id}`}
                            className='px-3 py-2 bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-200 transition-colors flex items-center justify-center'
                            title ="Edit User"
                            >
                            <BiEdit className='text-xl'/>
                            </Link>

                        <button
                            onClick={()=> handleDelete(user.id, user.name)}
                            className='px-3 py-2 bg-red-50 text-red-600 rounded border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center'
                            title='Delete User'
                            >
                            <BiTrash className='text-xl'/>
                            </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}