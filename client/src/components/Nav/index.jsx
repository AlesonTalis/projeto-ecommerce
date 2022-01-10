import React from 'react'

import {Link} from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <div className="top-menu">
          <div className="menu">
              <label htmlFor="open-menu" className="open-menu">
                  <span className="material-icons">
                      menu
                  </span>
              </label>
          </div>
          <div className="logo">
              <Link to="/">
                  HELLO!
              </Link>
          </div>
          <div className="actions">
              <Link to="/login">
                  <span className="material-icons">
                      account_circle
                  </span>
              </Link>
              <Link to="/cart">
                  <span className="material-icons">
                      shopping_cart
                  </span>
              </Link>
          </div>
      </div>
    </nav>
  )
}

export default Nav
