import React from 'react'

import {Link} from 'react-router-dom'

function Header() {
  const linkies = [
    {'path': '/', 'name': 'Home'},
    {'path': '/roupas', 'name': 'Roupas'},
    {'path': '/calcados', 'name': 'Calçados'},
    {'path': '/acessorios', 'name': 'Acessórios'},
  ]

  return (
    <header>
      <h1>Roupas e Roupas</h1>
      <ul>
        {linkies.map((link, index) => {
          return (
            <li key={index}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          )
        })}
      </ul>
    </header>
  )
}

export default Header
