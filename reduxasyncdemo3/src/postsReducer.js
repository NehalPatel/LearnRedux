// Action Types
const FETCH_POSTS_START = 'FETCH_POSTS_START';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Thunk Action Creator
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

// Initial State
const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

// Reducer
export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS_START:
            return { ...state, status: 'loading', error: null };
        case FETCH_POSTS_SUCCESS:
            return { ...state, status: 'succeeded', items: action.payload };
        case FETCH_POSTS_FAILURE:
            return { ...state, status: 'failed', error: action.payload };
        default:
            return state;
    }
}