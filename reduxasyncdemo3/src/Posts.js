import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Thunk function moved here for demonstration purposes.
// In real projects, keep thunks in separate files for better organization.
const FETCH_POSTS_START = 'FETCH_POSTS_START';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPosts = () => async (dispatch) => {
    dispatch({ type: FETCH_POSTS_START });
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: FETCH_POSTS_FAILURE, payload: err.message });
    }
};

function Posts() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (status === 'loading') return <div className="flex justify-center items-center h-64 text-lg font-semibold">Loading...</div>;
    if (status === 'failed') return <div className="flex justify-center items-center h-64 text-lg text-red-600 font-semibold">Error: {error}</div>;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Posts</h2>
                <ul className="space-y-3">
                    {items.map((post) => (
                        <li key={post.id} className="bg-blue-50 hover:bg-blue-100 transition rounded px-4 py-2 text-gray-800 shadow-sm">
                            {post.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Posts;