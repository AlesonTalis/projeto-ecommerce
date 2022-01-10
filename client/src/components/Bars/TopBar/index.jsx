import React from 'react'

function TopBar() {
  return (
    <div className="content-header">
      <div className="content-block">
          <div className="content-block-title">
              <span>Filter</span>
          </div>
          <div className="content-block-button">
              <a href="#" className="">
                  <span className="material-icons">
                      filter_list
                  </span>
              </a>
          </div>
      </div>
      <div className="content-block">
          <div className="content-block-title">
              <span>Ordenar por</span>
          </div>
          <div className="content-block-button">
              <a href="#" className="">
                  <span className="material-icons">
                      sort
                  </span>
              </a>
          </div>
      </div>
      <div className="content-block">
          <div className="content-block-title">
              <span>Paginação</span>
          </div>
          <div className="content-block-button">
              <a href="#" className="">
                  <span className="material-icons">
                      keyboard_arrow_left
                  </span>
              </a>
              <a href="#" className="">
                  <span className="material-icons">
                      keyboard_arrow_right
                  </span>
              </a>
          </div>
      </div>

      <div className="content-block">
          <div className="content-block-buttons">
              <label htmlFor="content-grid-list" className="content-grid-list">
                  <span className="material-icons">
                      view_list
                  </span>
              </label>
              <label htmlFor="content-grid-list" className="content-grid-list">
                  <span className="material-icons">
                      view_module
                  </span>
              </label>
          </div>
      </div>
    </div>
  )
}

export default TopBar
