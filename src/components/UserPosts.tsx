import { useState, useEffect} from "react";
import type {Post, Comment} from '../types'
import { getUserPosts, getPostComments } from '../services/api'
import { BiComment } from 'react-icons/bi';

function PostItem({ post }: {post: Post}) {
    const [comments, setComments] = useState<Comment[]>([])
    const [showComments, setShowComments] = useState(false)
    const [loadingComments, setLoadingComments] = useState(false)
    
    const handleToggleComments = async () => {
        if(!showComments && comments.length === 0){
            setLoadingComments(true)
            try{
                const data = await getPostComments(post.id)
                setComments(data)
            }catch(err){
                console.error('Error fetching comments:', err)
            }finally{
                setLoadingComments(false)
            }
        }
        setShowComments(!showComments)
    }

    return(
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-bold text-lg text-gray-900 mb-2 capitalize">{post.title}</h4>
            <p className="text-gray-700 mb-4">{post.body}</p>

            <button 
                onClick={handleToggleComments}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                <BiComment className="inline mr-1"/> {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
            
            {showComments && (
                <div className="mt-4 pl-4 border-l-2 border-blue-200 space-y-4">
                    {loadingComments && <p className="text-sm text-gray-500">Loading comments...</p>}
                    {comments.map((comment) => (
                        <div key={comment.id} className="text-sm">
                            <span className="font-semibold text-gray-800">{comment.email}</span>
                            <p className="text-gray-600 mt-1">{comment.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export function UserPosts({ userId }: {userId: string}) {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const data = await getUserPosts(userId)
                setPosts(data)
            }catch(err){
                console.error('Error fetching posts:', err)
            }finally{
                setLoading(false)
            }
        }
        fetchPosts()
    },[userId])

    if(loading) return <div className="mt-8 text-gray-500">Loading posts...</div>

    return(
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 border-b pb-2">Posts</h3>
            <div className="space-y-4">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}