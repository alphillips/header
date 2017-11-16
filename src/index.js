import React from 'react'
import MenuSlide from 'react-burger-menu/lib/menus/slide'
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
      this.onHelpClick = this.onHelpClick.bind(this)
      this.onProfileClick = this.onProfileClick.bind(this)
      this.showInbox = this.props.showInbox || false
    }

    onProfileClick = (e) => {
      // attach/remove event handler
      if (!this.state.isProfileOpen ) {
        document.addEventListener('click', this.handleOutsideClickProfile, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClickProfile, false);
      }

      this.setState((prevState, props) => ({
        isProfileOpen:!this.state.isProfileOpen
      }))
      e.preventDefault()
    }

    onHelpClick = (e) => {
      // attach/remove event handler
      if (!this.state.isHelpOpen) {
        document.addEventListener('click', this.handleOutsideClickHelp, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClickHelp, false);
      }

      this.setState((prevState, props) => ({
        isHelpOpen:!this.state.isHelpOpen
      }))
      e.preventDefault()
    }

    handleOutsideClickProfile = (e) => {
      // ignore clicks on the component itself
      if (this.node.contains(e.target)) {
        return;
      }
      this.onProfileClick(e)
    }

    handleOutsideClickHelp = (e) => {
      // ignore clicks on the component itself
      if (this.node.contains(e.target)) {
        return;
      }
      this.onHelpClick(e)
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
      return (
      <div className={(window.IS_STAFF) ? "staff-header header":"header"}>
        <div className="side-menu-container">
          <MenuSlide isOpen={ this.state.isOpen } className="bm-menu" width={ '50%' } onClick={this.onclick}>
            <div className="side-menu">
              {this.props.menu}
            </div>
          </MenuSlide>
        </div>
        <div className="top-menu-header">
          <div className="top-links-wrapper">
            <div className="top-links main-block">
              <ul>
                <li className="home-portal">
                {window.IS_STAFF &&
                  <Link to="/" className="staff-home-link">Home</Link>
                }
                {!window.IS_STAFF &&
                  <a href="/portal" className="staff-home-link">Client portal</a>
                }
                </li>

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
                  <a className="header-app-inbox"><span></span></a>
                }
                </li>
                <li className="header-app-help target-caret"><a href="#" className="target-help" onClick={this.onHelpClick.bind(this)}><span ></span></a></li>
                <li className="header-app-username target-caret">
                  <a href="#" onClick={this.onProfileClick.bind(this)}>
                    <span className="desktop-profile">{this.props.userName}</span>
                    <span className="mobile-profile"></span>
                  </a>
                </li>
              </ul>

              {this.state.isProfileOpen &&
                <div className="target-profile-content" ref={node => { this.node = node; }}>
                  {this.props.abn &&
                    <p>ABN: {this.props.abn}</p>
                  }
                  {this.props.logonid &&
                    <p>User Name: {this.props.logonid}</p>
                  }
                  {this.props.orgName &&
                    <p>Org Name: {this.props.orgName}</p>
                  }
                  {this.props.otherInfo  &&
                    this.props.otherInfo.map ((info) =>
                      <p key={info.label + info.value}> {info.label}: {info.value}</p>
                    )
                  }
                  <ul>
                    <li className="logout-li-link-staff"><a href="/auth/faces/logout/">Log Out</a></li>
                  </ul>
                </div>
              }
              {this.state.isHelpOpen &&
                <div className="target-help-content" ref={node => { this.node = node; }}>
                  <ul>
                    <li className="help-item"><a href="#">Help items</a></li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>

        <div className="header-block">
          <nav role="navigation" className="global-menu">
           {this.props.menu}
          </nav>
        </div>
      </div>
     )

   }
}
export default Header
