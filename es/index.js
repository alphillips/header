function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import MenuSlide from 'react-burger-menu/lib/menus/slide';
import SearchBar from './SearchBar';
import { Link, hashHistory } from 'react-router';

import logo from './da-logo.svg';
import './header.css';
import './SearchBar/searchbar.css';
import './uikit.css';
import './application-side-menu.css';

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.componentDidMount = function () {
      _this.highlightHeader();
    };

    _this.componentWillReceiveProps = function (nextProps) {
      _this.highlightHeader();
    };

    _this.highlightHeader = function () {
      // DOM manipulation for showing current header item
      var links = document.querySelectorAll('div[class="top-menu-header"] a');
      if (links) {
        var curlink = document.querySelector('div[class="top-menu-header"] a[href="' + document.location.hash + '"]');
        for (var i = 0; i < links.length; i++) {
          links[i].classList.remove('current');
        }
        if (curlink) {
          curlink.className = curlink.className + ' current';
        }
      }
      _this.showMenuContext();
    };

    _this.onProfileClick = function (e) {
      // attach/remove event handler
      if (!_this.state.isProfileOpen) {
        document.addEventListener('click', _this.handleOutsideClickProfile, false);
      } else {
        document.removeEventListener('click', _this.handleOutsideClickProfile, false);
      }

      _this.setState(function (prevState, props) {
        return {
          isProfileOpen: !_this.state.isProfileOpen
        };
      });
    };

    _this.onHelpClick = function (e) {
      // attach/remove event handler
      if (!_this.state.isHelpOpen) {
        document.addEventListener('click', _this.handleOutsideClickHelp, false);
      } else {
        document.removeEventListener('click', _this.handleOutsideClickHelp, false);
      }

      _this.setState(function (prevState, props) {
        return {
          isHelpOpen: !_this.state.isHelpOpen
        };
      });
    };

    _this.handleOutsideClickProfile = function (e) {
      _this.onProfileClick(e);
    };

    _this.handleOutsideClickHelp = function (e) {
      _this.onHelpClick(e);
    };

    _this.onclick = function () {
      _this.setState(function (prevState, props) {
        return {
          isOpen: !_this.state.isOpen
        };
      });
    };

    _this.showMenuContext = function () {
      // DOM manipulation for showing current manu item
      var links = document.querySelectorAll('nav[class="global-menu"] a');
      if (links) {
        var curlink = document.querySelector('nav[class="global-menu"] a[href="' + document.location.hash + '"]');
        for (var i = 0; i < links.length; i++) {
          links[i].className = '';
        }
        if (curlink) {
          curlink.className = 'current';
        }
      }
    };

    _this.state = {
      isOpen: false,
      isProfileOpen: false,
      isHelpOpen: false,
      inboxUrl: _this.props.inboxUrl || "/inbox"
    };
    _this.showInbox = _this.props.showInbox;
    return _this;
  }

  Header.prototype.render = function render() {
    var _this2 = this;

    var showProfileOptions = this.props.abn || this.props.logonId || this.props.orgName || this.props.otherInfo || this.props.otherLinks || this.props.showLogOut;
    return React.createElement(
      'div',
      { className: window.IS_STAFF ? "staff-header header" : "header" },
      React.createElement(
        'div',
        { className: 'side-menu-container' },
        React.createElement(
          MenuSlide,
          { isOpen: this.state.isOpen, className: 'bm-menu', width: '50%', onClick: this.onclick },
          React.createElement(
            'div',
            { className: 'side-menu' },
            this.props.menu
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'top-menu-header' },
        React.createElement(
          'div',
          { className: 'top-links-wrapper' },
          React.createElement(
            'div',
            { className: 'top-links main-block' },
            React.createElement(
              'ul',
              null,
              React.createElement(
                'li',
                { className: 'home-portal' },
                window.IS_STAFF && React.createElement(
                  'a',
                  { href: '/staff-portal', className: 'staff-home-link' },
                  'Staff portal'
                ),
                !window.IS_STAFF && React.createElement(
                  'a',
                  { href: '/portal', className: 'staff-home-link' },
                  'Online Services'
                )
              ),
              React.createElement(
                'li',
                { className: 'header-app-name' },
                this.props.name
              ),
              React.createElement(
                'li',
                { className: 'autocomplete-li-link-search' },
                this.props.searchArray && React.createElement(SearchBar, {
                  searchArray: this.props.searchArray,
                  searchKey: this.props.searchKey,
                  searchDisplayAttributes: this.props.searchDisplayAttributes
                })
              ),
              React.createElement(
                'li',
                { className: 'header-app-inbox-container' },
                this.showInbox && React.createElement(
                  Link,
                  { to: this.state.inboxUrl, onClick: this.highlightHeader, className: 'header-app-inbox' },
                  this.props.unreadCount > 0 && React.createElement(
                    'span',
                    { className: "unread-count" + (this.props.unreadCount > 99 ? " medium" : '') },
                    React.createElement(
                      'span',
                      null,
                      this.props.unreadCount > 0 ? this.props.unreadCount : ''
                    )
                  )
                )
              ),
              this.props.helpPages && this.props.helpPages.length > 0 && React.createElement(
                'li',
                { className: 'header-app-help target-caret' },
                React.createElement(
                  Link,
                  { className: 'target-help', onClick: this.onHelpClick },
                  React.createElement('span', null)
                )
              ),
              React.createElement(
                'li',
                { className: showProfileOptions ? "header-app-username target-caret" : "header-app-username" },
                React.createElement(
                  Link,
                  { className: 'profile-container', title: this.props.userName, onClick: this.onProfileClick },
                  React.createElement(
                    'span',
                    { className: 'desktop-profile' },
                    this.props.userName
                  ),
                  React.createElement('span', { className: 'mobile-profile' })
                )
              )
            ),
            this.state.isProfileOpen && showProfileOptions && React.createElement(
              'div',
              { className: 'target-profile-content', ref: function ref(node) {
                  _this2.node = node;
                } },
              this.props.abn && React.createElement(
                'p',
                null,
                'ABN: ',
                this.props.abn
              ),
              this.props.logonId && React.createElement(
                'p',
                null,
                'Login ID: ',
                this.props.logonId
              ),
              this.props.orgName && React.createElement(
                'p',
                null,
                'Org Name: ',
                this.props.orgName
              ),
              this.props.otherInfo && this.props.otherInfo.map(function (info) {
                return React.createElement(
                  'p',
                  { key: info.label + info.value },
                  ' ',
                  info.label,
                  ': ',
                  info.value
                );
              }),
              this.props.otherLinks && React.createElement(
                'ul',
                null,
                this.props.otherLinks.map(function (otherLink) {
                  return React.createElement(
                    'li',
                    { className: 'other-links-li', key: otherLink.label + otherLink.value },
                    React.createElement(
                      'a',
                      { href: otherLink.value.indexOf("http") > -1 ? otherLink.value : "#" + otherLink.value },
                      otherLink.label
                    )
                  );
                })
              ),
              this.props.showLogOut && React.createElement(
                'ul',
                null,
                React.createElement(
                  'li',
                  { className: 'logout-li-link-staff' },
                  React.createElement(
                    'a',
                    { href: '/auth/faces/logout/' },
                    'Log Out'
                  )
                )
              )
            ),
            this.state.isHelpOpen && React.createElement(
              'div',
              { className: 'target-help-content', ref: function ref(node) {
                  _this2.node = node;
                } },
              this.props.helpPages && this.props.helpPages.length > 0 && React.createElement(
                'ul',
                null,
                this.props.helpPages.map(function (helpPage, i) {
                  return React.createElement(
                    'li',
                    { className: 'help-item', key: i },
                    React.createElement(
                      'a',
                      { target: '_blank', href: helpPage.value.indexOf("http") > -1 ? helpPage.value : "#" + helpPage.value },
                      helpPage.label
                    )
                  );
                })
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'header-block' },
        React.createElement(
          'nav',
          { role: 'navigation', className: 'global-menu' },
          this.props.menu
        )
      )
    );
  };

  return Header;
}(React.Component);

export default Header;