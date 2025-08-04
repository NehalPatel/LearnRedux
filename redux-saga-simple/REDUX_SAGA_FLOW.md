# Redux Saga Flow Diagram

## Action Dispatch Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Redux Store   │    │  Saga Middleware │    │    Reducer      │
│                 │    │                 │    │                 │    │                 │
│ 1. User clicks  │───▶│ 2. Action       │───▶│ 3. Saga         │───▶│ 4. State        │
│    button       │    │    dispatched   │    │    intercepts   │    │    updated      │
│                 │    │                 │    │                 │    │                 │
│ dispatch(       │    │ GET_USERS_FETCH │    │ takeEvery       │    │ users: [...]    │
│   getUsersFetch │    │                 │    │ catches action  │    │                 │
│ )               │    │                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │                       │
                                │                       │                       │
                                ▼                       ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
                       │   API Call      │    │   Saga Effects  │    │   UI Update     │
                       │                 │    │                 │    │                 │
                       │ 5. fetch()      │    │ 6. call()       │    │ 7. Component    │
                       │    API call     │    │    put()        │    │    re-renders   │
                       │                 │    │                 │    │                 │
                       │ jsonplaceholder │    │ GET_USERS_      │    │ Display users   │
                       │ .typicode.com   │    │ SUCCESS action  │    │ in list        │
                       └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Detailed Step-by-Step Flow

### 1. User Interaction
```
User clicks "Get Users" button
↓
App.js: dispatch(getUsersFetch())
```

### 2. Action Dispatch
```
Action dispatched: { type: 'GET_USERS_FETCH' }
↓
Redux Store receives action
```

### 3. Saga Middleware Intercepts
```
Saga middleware catches action
↓
takeEvery('GET_USERS_FETCH', workGetUsersFetch) triggers
↓
workGetUsersFetch saga starts
```

### 4. API Call (Side Effect)
```
Saga calls: yield call(usersFetch)
↓
fetch('https://jsonplaceholder.typicode.com/users')
↓
API returns user data
```

### 5. Success Action Dispatch
```
Saga dispatches: yield put({ type: 'GET_USERS_SUCCESS', users })
↓
Redux Store receives success action
```

### 6. Reducer Updates State
```
Reducer handles: case GET_USERS_SUCCESS
↓
State updated: { users: action.users }
↓
Store state changes
```

### 7. UI Updates
```
React component re-renders
↓
useSelector(state => state.myFirstReducer.users) gets new data
↓
Users displayed in UI
```

## Error Handling Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Call      │    │   Saga Error    │    │   Error Action  │
│                 │    │                 │    │                 │
│ fetch() fails   │───▶│ catch(error)    │───▶│ GET_USERS_      │
│                 │    │                 │    │ FAILURE         │
│ Network error   │    │ Error caught    │    │ { error: msg }  │
│ or API error    │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Key Concepts

- **Action**: Plain object describing what happened
- **Saga**: Generator function handling side effects
- **Middleware**: Intercepts actions before they reach reducers
- **Effects**: Redux Saga commands (call, put, takeEvery)
- **Reducer**: Pure function updating state

## File Responsibilities

- `actions.js`: Action types and creators
- `sagas.js`: Side effects and API calls
- `reducer.js`: State updates
- `store.js`: Redux store with middleware
- `App.js`: UI and user interactions