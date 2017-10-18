import React from 'react'
import Menu from 'react-burger-menu/lib/menus/slide'
import SearchBar from './SearchBar'
import { Link, hashHistory } from 'react-router'

import logo from './da-logo.svg'
import './header.css'
import './SearchBar/searchbar.css'
import './uikit.css'
import './application-side-menu.css'

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          isOpen: false
        }
    }

    componentDidMount() {
      this.showMenuContext()
    }

    onclick = () => {
      this.setState((prevState, props) => ({
        isOpen:false
      }))
    }

    componentWillReceiveProps = (nextProps) => {
      this.showMenuContext()
    }

    showMenuContext = () => {
      try {
        // DOM manipulation for showing current manu item
        let links = document.querySelectorAll('nav[class="global-menu"] a')
        let link = document.querySelector('nav[class="global-menu"] a[href="' + document.location.hash + '"]')
        let i
        if(links && link){
          for (i=0;i<links.length;i++){
            links[i].className = ''
          }
          link.className = 'current'
        }
      } catch(e){}
    }

    render() {

      if(window.IS_STAFF){
        return (
        <div className="staff-header header">
          <div className="top-menu-header">
            <div className="top-links-wrapper">
              <div className="top-links main-block">
                <ul>
                  <li><Link to="/" className="staff-home-link">Home</Link></li>
                  <li className="autocomplete-li-link-search">
                  {this.props.searchArray &&
                    <SearchBar
                      searchArray={this.props.searchArray}
                      searchKey={this.props.searchKey}
                      searchDisplayAttributes={this.props.searchDisplayAttributes}
                    />
                  }
                  </li>
                  <li className="header-app-username">{this.props.userName}</li>
                  <li className="logout-li-link-staff"><a href="/auth/faces/logout/">Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="logo header-block">
            <h1>{this.props.name}</h1>
            <nav role="navigation" className="global-menu">
             {this.props.menu}
            </nav>
          </div>

        </div>
       )
      } else {

        return (
        <div className="header">
          <div className="side-menu-container">
            <Menu isOpen={ this.state.isOpen } className="bm-menu" width={ '50%' } onClick={this.onclick}>
              <div className="side-menu">
                {this.props.menu}
              </div>
            </Menu>
          </div>
          <div className="top-menu-header">
            <div className="top-links-wrapper">
              <div className="top-links main-block">
                <ul>
                  <li><a href="/OSS/faces/homePage" className="staff-home-link">Client portal</a></li>
                  <li className="header-app-name">{this.props.name}</li>
                  <li className="autocomplete-li-link-search">
                    {this.props.searchArray &&
                      <SearchBar
                        searchArray={this.props.searchArray}
                        searchKey={this.props.searchKey}
                        searchDisplayAttributes={this.props.searchDisplayAttributes}
                      />
                    }
                  </li>
                  <li className="header-app-username">{this.props.userName}</li>
                  <li className="logout-li-link-staff"><a href="/auth/faces/logout/">Logout</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="header-block uikit-grid">
            <nav role="navigation" className="global-menu">
             {this.props.menu}
            </nav>
          </div>
        </div>
       )

      }

   }
}
export default Header
