import React from 'react'
import { view } from 'react-easy-state'
import { Route, Switch } from 'react-router-dom'
import Index from './Index'
import Checkout from './Checkout'

export default view(() => (
  <div>
    <Switch>
      <Route exact path="/" component={Index}/>
      <Route path="/checkout" component={Checkout} />
    </Switch>
  </div>
))
