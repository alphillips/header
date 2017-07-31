import React from 'react'
import Menu from 'react-burger-menu/lib/menus/slide'
import logo from './da-logo.svg'
import './header.css'
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
        let links = document.querySelectorAll('.header nav[class="global-menu"] a')
        let link = document.querySelector('.header nav[class="global-menu"] a[href="' + document.location.hash + '"]')
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
      <div className="header">
        <div className="side-menu-container">
          <Menu isOpen={ this.state.isOpen } className="bm-menu" width={ '50%' } onClick={this.onclick}>
            <div className="side-menu">
              {this.props.menu}
            </div>
          </Menu>
        </div>
        <div className="header-block uikit-grid">
          <div className="container">
            <div className="row">
              <div className="header-logo grids col-md-9">
                <a href="http://www.agriculture.gov.au/">
                  <img src={logo} className="header-logo-img" alt="Go to home page" aria-hidden="true" />
                </a>
              </div>
              {/*
              <div className="grids col-md-7">
                <nav role="navigation" className="global-menu">
                 {this.props.menu}
                </nav>
              </div>
              */}
              <div className="grids col-md-3">
                {/*<a href="#" className="return-to-link uikit-direction-link uikit-direction-link--left">Return to Client Portal</a>*/}
                <div className="nexdoc-header-name">
                  {this.props.name}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="grids col-md-20">
                <nav role="navigation" className="global-menu">
                 {this.props.menu}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
     )
   }
}
export default Header
