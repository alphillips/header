import React from 'react'

import logo from './da-logo.svg'
import './header.css'

const Header = (props) => {

    return (
      <div className="header">
        <div className="header-block">
          <div className="header-logo">
            <a href="http://www.agriculture.gov.au/">
              <img src={logo} className="header-logo-img" alt="Go to home page" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    )
}
export default Header
