import React from 'react'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

export default function Admin() {
  return (
    <div>
      Admin...
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/category'>Category</NavLink>
      <Switch>
        <Route path="/home">Home</Route>
        <Route path="/category">Category</Route>
        <Redirect to="/home"></Redirect>
      </Switch>
    </div>
  )
}
