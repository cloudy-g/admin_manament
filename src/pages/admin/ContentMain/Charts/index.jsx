import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Bar from './Bar'
import Line from './Line'
import Pie from './Pie'

export default function Charts(props) {

  return (
    <div>
      <Switch>
        <Route path="/charts/bar" component={Bar}></Route>
        <Route path="/charts/line" component={Line}></Route>
        <Route path="/charts/pie" component={Pie}></Route>
        <Redirect to="/charts/bar"></Redirect>
      </Switch>
    </div>
  )
}
