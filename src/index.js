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
        isOpen: false,
        isProfileOpen: false,
        isHelpOpen: false
      }
      this.handleOutsideClickProfile = this.handleOutsideClickProfile.bind(this)
      this.handleOutsideClickHelp = this.handleOutsideClickHelp.bind(this)
      this.showInbox = this.props.showInbox || false
    }

    onProfileClick = () => {
      // attach/remove event handler
      if (!this.state.isProfileOpen ) {
        document.addEventListener('click', this.handleOutsideClickProfile, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClickProfile, false);
      }

      this.setState((prevState, props) => ({
        isProfileOpen:!this.state.isProfileOpen
      }))
    }

    onHelpClick = () => {
      // attach/remove event handler
      if (!this.state.isHelpOpen) {
        document.addEventListener('click', this.handleOutsideClickHelp, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClickHelp, false);
      }

      this.setState((prevState, props) => ({
        isHelpOpen:!this.state.isHelpOpen
      }))
    }

    handleOutsideClickProfile = (e) => {
      // ignore clicks on the component itself
      if (this.node.contains(e.target)) {
        return;
      }

      this.onProfileClick();
    }

    handleOutsideClickHelp = (e) => {
      // ignore clicks on the component itself
      if (this.node.contains(e.target)) {
        return;
      }

      this.onHelpClick();
    }

    componentDidMount() {
      this.showMenuContext()
    }

    onclick = () => {
      this.setState((prevState, props) => ({
        isOpen:!this.state.isOpen
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
                  <li className="header-app-inbox-container">
                    {this.showInbox &&
                      <a href="#" className="header-app-inbox"><span></span></a>
                    }
                  </li>
                  <li className="header-app-help target-caret"><a href="#" className="target-help" onClick={this.onHelpClick}><span ></span></a></li>
                  <li className="header-app-username target-caret"><a href="#" onClick={this.onProfileClick}><span className="desktop-profile">{this.props.userName}</span><span className="mobile-profile"></span></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="logo header-block">
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
                  <li className="header-app-inbox-container">
                  {this.showInbox &&
                    <a href="#" className="header-app-inbox"><span></span></a>
                  }
                  </li>
                  <li className="header-app-help target-caret"><a href="#" className="target-help" onClick={this.onHelpClick}><span ></span></a></li>
                  <li className="header-app-username target-caret"><a href="#" onClick={this.onProfileClick}><span className="desktop-profile">{this.props.userName}</span><span className="mobile-profile"></span></a></li>
                </ul>

                {this.state.isProfileOpen&&
                  <div className="target-profile-content" ref={node => { this.node = node; }}>
                    <ul>
                      <li className="logout-li-link-staff"><a href="/auth/faces/logout/">Log Out</a></li>
                    </ul>
                  </div>
                }
                {this.state.isHelpOpen&&
                  <div className="target-help-content" ref={node => { this.node = node; }}>
                    <ul>
                      <li className="logout-li-link-staff"><a href="/auth/faces/logout/">Help items</a></li>
                    </ul>
                  </div>
                }
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
