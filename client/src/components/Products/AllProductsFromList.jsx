import React from 'react'

import {Link} from 'react-router-dom'
import {serverAddress,apiServerAddress,removeServerAddress} from '../lib/address'
import {splitImages} from '../lib/imageArray'


function AllProductsFromList({productsList}) {
  // function that replace spaces with '-'
  const replaceSpaces = (string) => {
    return string.replace(/\s+/g, '-').toLowerCase()
  }
  const getStars = (rate) => {
    console.log(rate)
    var stars = rate.split(' ').map((star, index) => {
      return parseInt(star, 10)
    })
    return stars
  }

  return (
    <>
      {productsList.map((product, index) => {
        console.log(product)
        return(
          <div className="grid-block" key={index}>
            <div className="grid-block-image">
              <img src={splitImages(product.images)[0]}/>
            </div>
            <div className="grid-block-title">
              <span>{product.name}</span>
            </div>
            <div className="grid-block-rate">
              {getStars(product.rate).map((rate, index) => {
                return(
                  <span key={index} className="material-icons">
                    {/* 2 for full, 1 for half, 0 for empty */}
                    {rate === 2 ? 'star' : (rate === 0 ? 'star_border' : 'star_half')}
                  </span>
                )
              })}
            </div>
            <Link to={`/detail/${replaceSpaces(product.name)}/${product.id}`} className="grid-block-link-full"></Link>
            <div className="grid-block-price">
              <span>R$</span>
              <span>{product.price}</span>
            </div>
            <div className="grid-block-buy-hide">
              <Link to={`/quick-buy/p/${product.id}`} className="btn btn-rounded btn-primary">
                <span className="buy">Comprar</span>
                <span className="price">{Number(product.price).toFixed(2)}</span>
              </Link>
            </div>
            <div className="grid-block-buy">
              <Link to={`/detail/${replaceSpaces(product.name)}/${product.id}`} className="grid-block-link-full"></Link>
              <div className="block-buy-title">
                <span>{product.name}</span>
              </div>
                <div className="block-buy-button">
                  <Link to={`/quick-buy/p/${product.id}`} className="btn btn-rounded btn-primary">
                    Comprar
                  </Link>
                  <Link to={`/cart/product/${product.id}`} className="btn btn-rounded">
                    <span className="material-icons">
                      add_shopping_cart
                    </span>
                  </Link>
                  <Link to={`/add-favorite/p/${product.id}`} className="btn btn-rounded">
                    <span className="material-icons">
                      favorite
                    </span>
                  </Link>
                </div>
                <div className="block-buy-small-description">
                  <span>
                    {product.description}
                  </span>
                </div>
                <div className="block-buy-price">
                  <span>R$</span>
                  <span>{
                    // price
                    Number(product.price).toFixed(2)
                    }</span>
                </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default AllProductsFromList
