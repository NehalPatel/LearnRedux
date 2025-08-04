# Redux Saga Project

A React application with Redux and Redux Saga for state management and side effects.

## Project Setup

This project was created from a Create React App template and then cleaned up for Redux Saga development.

### Initial Cleanup Steps

1. **Removed unnecessary packages:**
   ```bash
   npm uninstall @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event web-vitals
   ```

2. **Removed unnecessary files:**
   - `src/logo.svg`
   - `src/App.test.js`
   - `src/setupTests.js`
   - `src/reportWebVitals.js`

3. **Cleaned up source files:**
   - Simplified `src/App.js` - removed logo import and React boilerplate
   - Cleaned `src/index.js` - removed reportWebVitals import and call
   - Updated `src/App.css` - removed logo animation styles
   - Updated `package.json` - removed test script

4. **Installed Redux dependencies:**
   ```bash
   npm install redux react-redux redux-saga
   ```

## Dependencies

- **React** (^19.1.1) - UI library
- **React DOM** (^19.1.1) - React rendering
- **Redux** (^5.0.1) - State management
- **React Redux** (^9.2.0) - React bindings for Redux
- **Redux Saga** (^1.3.0) - Side effects middleware
- **React Scripts** (5.0.1) - Build tools

## Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

Ejects from Create React App to get full control over build configuration.

## Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Application styles
├── index.js        # Application entry point
├── index.css       # Global styles
├── reducer.js      # Redux reducer
├── store.js        # Redux store with Saga middleware
├── sagas.js        # Redux Saga effects
└── actions.js      # Redux actions
```

## Next Steps

To complete the Redux Saga setup, you'll need to:

1. Create a Redux store
2. Set up Redux Saga middleware
3. Create reducers
4. Create sagas for side effects
5. Connect components to the store

### Step 1: Create Reducer

Create `src/reducer.js`:

```javascript
const myFirstReducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default myFirstReducer;
```

### Step 2: Create Store

Create `src/store.js`:

```javascript
import { combineReducers, createStore } from 'redux';
import myFirstReducer from './reducer';

const rootReducer = combineReducers({ myFirstReducer });
const store = createStore(rootReducer);
```

### Step 3: Add Redux Saga Middleware

Update `src/store.js` to include Redux Saga:

```javascript
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import myFirstReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ myFirstReducer });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(myFirstSaga);

export default store;
```

### Step 4: Create Sagas

Create `src/sagas.js`:

```javascript
import { takeEvery } from "redux-saga/effects";

function* myFirstSaga() {
    yield takeEvery('GET_USERS_FETCH', workGetUsersFetch);
}

export default myFirstSaga;
```

### Step 5: Create Actions

Create `src/actions.js`:

```javascript
export const GET_USERS_FETCH = 'GET_USERS_FETCH';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const getUsersFetch = () => ({
    type: GET_USERS_FETCH,
});
```

### Step 6: Update sagas.js

```javascript
import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USERS_FAILURE, GET_USERS_FETCH, GET_USERS_SUCCESS } from "./actions";

function usersFetch() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
}

function* workGetUsersFetch() {
    try {
        const users = yield call(usersFetch);
        yield put({ type: GET_USERS_SUCCESS, users });
    } catch (error) {
        yield put({ type: GET_USERS_FAILURE, error: error.message });
    }
}
```

### Step 7: Update reducer.js

```javascript
import { GET_USERS_FETCH, GET_USERS_SUCCESS } from "./actions";

const myFirstReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case GET_USERS_FETCH:
            return {
                ...state
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users
            };
        default:
            return state;
    }
};
```

### Step 8: Update App.js

```javascript
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

function App() {

  const dispatch = useDispatch();
  const users = useSelector(state => state.myFirstReducer.users)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Redux App</h1>
        <p>Welcome to your Redux application!</p>

        <p>Users:</p>
        <ol>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}

        </ol>

      </header>
    </div>
  );
}

export default App;
```

### Step 9: Add import and button in App.js

```javascript
import { getUsersFetch } from './actions';

<button onClick={() => dispatch(getUsersFetch())}>Get Users</button>
```

## Learn More

- [Redux Documentation](https://redux.js.org/)
- [Redux Saga Documentation](https://redux-saga.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)
