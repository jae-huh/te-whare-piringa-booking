import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Calendar from './Calendar'
import Book from './Book'

const App = () => (
  <Router>
    <div className='app'>
      <h1>Hello World</h1>
      {/* <Switch> */}
        <Route path='/calendar' component={Calendar} />
        <Route path='/book' component={Book} />
      {/* </Switch> */}
    </div>
  </Router>
)

export default App
