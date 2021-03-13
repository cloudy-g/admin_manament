
import { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { fetchUserAction } from './redux/action/user'
import './App.css';
import localStore from './utils/localStorageUtils';

import Loading from './components/isLoading';
import { useDispatch } from 'react-redux';
const Login = lazy(() => import('./pages/login'));
const Admin = lazy(() => import('./pages/admin'));

export default function App() {
  const history = useHistory();
  // let account = localStore.getUser();
  let account = localStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(() => {
    if (account == null) {
      history.replace('/login')
    } else {
      dispatch(fetchUserAction(null, e => console.log(e), s => console.log(s)));
    }
  }, []);

  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <Switch>
          <Route path="/login" exact render={() => <Login ></Login>}></Route>
          <Route path="/" render={() => <Admin></Admin>}></Route>
        </Switch>
      </Suspense>
    </>
  );
}


