Without createAsyncThunk — Manual Thunk Example
1️⃣ Define Action Types
javascript
Copy
Edit
export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
2️⃣ Action Creators
javascript
Copy
Edit
export const fetchPostsStart = () => ({
    type: FETCH_POSTS_START,
});

export const fetchPostsSuccess = (posts) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
});

export const fetchPostsFailure = (error) => ({
    type: FETCH_POSTS_FAILURE,
    payload: error,
});
3️⃣ Thunk Async Action Creator (Manual)
javascript
Copy
Edit
export const fetchPosts = () => {
    return async (dispatch) => {
        dispatch(fetchPostsStart());
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            dispatch(fetchPostsSuccess(data));
        } catch (error) {
            dispatch(fetchPostsFailure(error.message));
        }
    };
};
4️⃣ Reducer
javascript
Copy
Edit
const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_START:
            return { ...state, status: 'loading' };
        case FETCH_POSTS_SUCCESS:
            return { ...state, status: 'succeeded', items: action.payload };
        case FETCH_POSTS_FAILURE:
            return { ...state, status: 'failed', error: action.payload };
        default:
            return state;
    }
};

export default postsReducer;
✅ What is the difference?
With createAsyncThunk	Without createAsyncThunk
You write one thunk	You write 3 actions + thunk
Toolkit dispatches actions internally	You dispatch each action manually
Clean, minimal code	More boilerplate but full control
Handles status action types automatically	You write action types manually