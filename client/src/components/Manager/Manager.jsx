import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

import {serverAddress,apiServerAddress} from '../lib/address'
import { splitImages } from '../lib/imageArray'


function Manager() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    
    // console.log(serverAddress('api/manager/product/'))
    
    var url = apiServerAddress('manager/products')
    console.log(url)
    axios.post(
      url,
      {
        key: '12345',
        search: 'null',
    })
    .then(res => {
      console.log(res.data)
      setProducts(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="container">
      <div className="all-products">
        <div className="all-products-search">
          <form action="">
            <div className="inp-search">
              <input type="text" name="search" placeholder="Buscar"/>
              <button type="submit">
                <span className="material-icons">
                  search
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="all-products-container">
          {/* HEADER */}
          {ManagerHeader()}
          {/* PRODUCTS */}

          {products.map((product,index) => {
            return (
              <div className="product-content-view" key={index}>
                <div className="content-view-image">
                  <img src={splitImages(product.images)[0]} alt=""/>
                </div>
                <div className="content-view-title">
                  <Link to={`/manager/edit/${product.id}`}>
                    <h2>{product.name}</h2>
                  </Link>
                  {/* <span>Tenis</span> */}
                </div>
                <div className="content-view-price">
                  <span>R$</span>
                  <span>{product.price}</span>
                </div>
                <div className="content-view-price">
                  <span>R$</span>
                  <span>{product.onsale.new}</span>
                </div>
                <div className="content-view-stock">
                  <span>{product.stock.amount}</span>
                </div>
                <div className="content-view-visibility">
                  <span className="material-icons">
                    {visibilitySwitch(product.sts)}
                  </span>
                </div>
                <div className="content-view-actions">
                  <span className="material-icons">
                    more_horiz
                  </span>
                </div>
              </div>
            )}
          )}

          
        </div>
      </div>
      <div className="add-new-product">
        <Link 
          to="/manager/add"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault()
            axios.post(apiServerAddress('manager/product/new'), {
              key: '12345',
            })
            .then(res => {
              navigate(`/manager/edit/${res.data.pid}`)
            })
            .catch(err => {
              console.log(err)
            })
          }}
          >
          <span className="material-icons">
            add
          </span>
          Add new product
        </Link>
      </div>
    </div>
  )
}

export default Manager

function ManagerHeader(){
  return (
    <div className="product-content-view header">
      <div></div>
      <div className="content-view-title">
        <span>Nome do produto</span>
      </div>
      <div className="content-view-price">
        <span>Valor normal</span>
      </div>
      <div className="content-view-price">
        <span>Valor promocional</span>
      </div>
      <div className="content-view-stock">
        <span>Estoque</span>
      </div>
      <div className="content-view-visibility">
        <span>Visibilidade</span>
      </div>
      <div className="content-view-actions">
        <span>Ações</span>
      </div>
    </div>
  )
}

function visibilitySwitch(visibility){
  switch (Number(visibility)) {
    case 0:// hidden
      return 'visibility_off'
      break;

    case 1:// visible
      return 'visibility'
      break;
    
    case 2:// draft
      return 'mode_edit'
      break;
  }
}