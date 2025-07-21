// Action Types
export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Action Creators
export const fetchPostsStart = () => ({ type: FETCH_POSTS_START });
export const fetchPostsSuccess = (posts) => ({ type: FETCH_POSTS_SUCCESS, payload: posts });
export const fetchPostsFailure = (error) => ({ type: FETCH_POSTS_FAILURE, payload: error });

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