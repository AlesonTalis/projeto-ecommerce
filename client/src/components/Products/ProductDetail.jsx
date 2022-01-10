import React, {useEffect, useState} from 'react'
import {StarRate} from '../Modules'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'

import {serverAddress,apiServerAddress} from '../lib/address'
import { splitImages } from '../lib/imageArray'

function ProductDetail() {
  const {name, id} = useParams()
  const [loading, setLoading] = useState(true)
  const [productDetail, setProductDetail] = useState({})
  const [productImages, setProductImages] = useState([])
  const [productImageActive, setProductImageActive] = useState(0)

  const [amount, setAmount] = useState(1)

  // products variaitons selection
  const [productSelectedColor, setProductSelectedColor] = useState(0)
  const [productSelectedSize, setProductSelectedSize] = useState(0)


  useEffect(() => {
    axios.post(apiServerAddress(`products/single`), {
      pname: name, 
      pid: id,
      key: '12345'
    })
    .then(res => {
      console.log(res.data)
      setProductDetail(res.data)
      setProductImages(splitImages(res.data.images))
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="product-detail">
            <div className="product-detail-top">
              <div className="detail-top-images">
                <div className="top-images-main">
                  {productImages.length > 0 ? (
                    <img src={productImages[productImageActive]} alt="shoes"/>
                  ) : (
                    <div>No images</div>
                  )}
                </div>
                <div className="top-images-others">
                  <ul>
                    {productImages.map((image, index) => (
                      <li className={productImageActive == index ? 'selected' : ''} key={index}>
                        <a href={'#'} onClick={
                          (e) => {
                            e.preventDefault()
                            setProductImageActive(index)
                          }
                        }>
                          <img src={image} alt={`${ProductDetail.name} image ${index}`}/>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="detail-top-content">
                <div className="top-content-brand">
                  <h3>Marca</h3>
                </div>
                <div className="top-content-title">
                  <h2>{productDetail.name}</h2>
                </div>
                <div className="top-content-rate-reviews">
                  <div className="content-rate rate">
                    <StarRate rateAmount={productDetail.rate}/>
                  </div>
                  <div className="content-reviews">
                    <span>25 reviews</span>
                  </div>
                </div>
                <div className="top-content-variations">
                  {
                    // productDetail.stock.map((variation, index) => {
                    //   return (
                    //     <div className="content-variations" key={index}>
                    //       <span>{variation.name}</span>
                    //       <ul className={variation.type}>
                    //         {variation.values.map((value, index) => {
                    //           return (
                    //             <li 
                    //               key={index}
                    //               className={
                    //                 ((variation.type === 'colors' && productSelectedColor === index) || (variation.type === 'sizes' && productSelectedSize === index) ? 'selected' : "")
                    //               }
                    //               >
                    //               <a 
                    //                 href={'#'}
                    //                 onClick={(e) => {
                    //                   e.preventDefault()
                    //                   if (variation.type === 'colors')
                    //                   {
                    //                     setProductSelectedColor(index)
                    //                   }
                    //                   else if (variation.type === 'sizes')
                    //                   {
                    //                     setProductSelectedSize(index)
                    //                   }
                    //                 }}
                    //                 >
                    //                 <span 
                    //                   className={
                    //                     (variation.type === 'colors' ? `sphere ${value[0]}` : '')
                    //                   }>{
                    //                     (variation.type === 'sizes' ? value[1] : '')
                    //                   }</span>
                    //                 {variation.type === 'colors' ? (
                    //                   <span className="material-icons">check</span>
                    //                 ) : ""}
                    //               </a>
                    //             </li>
                    //           )
                    //         })}
                    //       </ul>
                    //     </div>
                    //   )
                    // })
                  }
                </div>
                <div className="top-content-price-sale-qnt-buy">
                  <div className="content-price">
                    <span>R$</span>
                    <span>{
                      productDetail.onsale.isonsale ? 
                      (Number(productDetail.onsale.new).toFixed(2).replace('.',','))
                      : (Number(productDetail.price).toFixed(2).replace('.',','))
                    }</span>
                  </div>
                  {
                    productDetail.onsale.isonsale ? (
                      <>
                        <div className="content-price-old">
                          <span>R$</span>
                          <span>{Number(productDetail.onsale.old).toFixed(2).replace('.',',')}</span>
                        </div>
                        <div className="content-sale">
                          <span>- {productDetail.onsale.dsc}%</span>
                        </div>
                      </>
                    ) : ""
                  }
                  
                </div>
                <div className="top-content-price-sale-qnt-buy">
                  <div className="content-qnt inp-add-rem inp">
                    <button 
                      className="remove" 
                      onClick={(e) => {
                        e.preventDefault()
                        if (amount > 1)
                          setAmount(amount - 1)
                      }}
                      >
                      <span className="material-icons">remove</span>
                    </button>
                    <input type="number" value={amount} min="1" max="10" placeholder="1" readOnly={true}/>
                    <button 
                      className="add" 
                      onClick={(e) => {
                        e.preventDefault()
                        setAmount(amount + 1)
                      }}
                      >
                      <span className="material-icons">
                        add
                      </span>
                    </button>
                  </div>

                  <div className="content-buy">
                    <Link to={
                      // SVR_URL + 
                      '/checkout/p/' + productDetail.id + 
                      '/color_' + productSelectedColor + 
                      '/size_' + productSelectedSize + 
                      '/qnt_' + amount
                    } className="btn btn-primary btn-rounded" href="#">
                      <span className="material-icons">add_shopping_cart</span>
                      <span>Comprar</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductDetail
