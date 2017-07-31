import React from 'react'
import {render} from 'react-dom'

import './uikit.css'
import './base.css'

import Header from '../../src'



let Demo = React.createClass({
  render() {
    return <div className="uikit-body">
      <Header
        menu={
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/menu1">Menu 1</a></li>
            <li><a href="#/menu2">Menu 2</a></li>
            <li><a href="#/menu3">Menu 3</a></li>
            <li><a href="#/menu4">Menu 4</a></li>
          </ul>
        }
        name="Heading"
      />
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
