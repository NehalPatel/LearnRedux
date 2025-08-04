import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getUsersFetch } from './actions';

function App() {

  const dispatch = useDispatch();
  const users = useSelector(state => state.myFirstReducer.users)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Redux App</h1>
        <p>Welcome to your Redux application!</p>

        <p>Users:</p>
        <button onClick={() => dispatch(getUsersFetch())}>Get Users</button>
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
