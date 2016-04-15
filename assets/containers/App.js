import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render () {
    const { children } = this.props;
    return (
      <div>
        <header className="app-header navbar" role="menu">
          <div className="navbar-header bg-dark">
            <Link to="/" className="navbar-brand text-lt">
              <i className="fa fa-btc" />
            <span className="hidden-folded m-l-xs">
              Ad Manager
            </span>
            </Link>
          </div>
        </header>

        <aside className="app-aside hidden-xs bg-dark">
          <div className="aside-wrap">
            <div className="navi-wrap">
              <Nav />
            </div>
          </div>
        </aside>

        <div className="app-content" role="main">{children}</div>
      </div>
    );
  }
}

export default App;
