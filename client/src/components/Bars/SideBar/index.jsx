import React from 'react'
import {Link} from 'react-router-dom'

function SideBar() {
  const linkies = [
    {'path': '?category=all', 'name': 'Todos'},
    {'path': '?category=calcados', 'name': 'Calçados'},
    {'path': '?category=roupas', 'name': 'Roupas'},
    {'path': '?category=acessorios', 'name': 'Acessórios'},
  ]

  return (
    <div className="content-filter">
      <div className="content-filter-block">
        <input type="checkbox" name="expand-categories" id="expand-categories" className="hide"/>
        <div className="content-filter-block-title">
          <span>Categorias</span>
          <label htmlFor="expand-categories" className="content-filter-block-expand">
            <span className="material-icons expand">
              expand_more
            </span>
            <span className="material-icons collapse">
              expand_less
            </span>
          </label>
        </div>
        <div className="content-filter-block-content">
          <ul>
            {linkies.map((link, index) => {
              return (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
