
import { Route, Switch, } from 'react-router-dom'

import './App.css'

import Admin from './pages/admin'
import Login from './pages/login'

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </>
  );
}


