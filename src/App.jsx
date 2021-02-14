
import { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';

import './App.css';
import localStore from './utils/localStorageUtils';

import Loading from './components/isLoading';
const Login = lazy(() => import('./pages/login'));
const Admin = lazy(() => import('./pages/admin'));

export default function App() {
  const history = useHistory();
  let account = localStore.getUser();

  useEffect(() => {
    if (account == null) {
      history.replace('/login')
    }
  }, []);

  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <Switch>
          <Route path="/login" exact render={() => <Login ></Login>}></Route>
          <Route path="/" render={() => <Admin ></Admin>}></Route>
        </Switch>
      </Suspense>
    </>
  );
}


