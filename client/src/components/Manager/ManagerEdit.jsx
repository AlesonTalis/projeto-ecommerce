import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

import {serverAddress,removeServerAddress,apiServerAddress} from '../lib/address'
import {splitImages} from '../lib/imageArray'

// const SVR_URL = 'http://localhost:3000/';

function ManagerEdit() {
  const navigate = useNavigate();
  const {pid} = useParams()

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState({})

  const [prodctName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productVisibility, setProductVisibility] = useState(1)
  const [productPrice, setProductPrice] = useState('')
  const [productOnsalePrice, setProductOnsalePrice] = useState('')
  const [productIsOnsale, setProductIsOnsale] = useState(false)
  const [productStock, setProductStock] = useState('')
  const [productImages, setProductImages] = useState([])


  const saveProduct = () => {
    var images = productImages.map(image => removeServerAddress(image))
    console.log(images);

    const saveProduct = {
      key: '12345',
      pid: pid,

      name: prodctName,
      description: productDescription,

      price: productPrice,
      // \{\"onsale\":\{\"isonsale\":true,\"old\":199.9,\"new\":99.9,\"dsc\":50\}\}
      onsale: JSON.stringify({
        onsale: {
          isonsale: productIsOnsale,
          new: productOnsalePrice,
          old: productPrice,
          dsc: (productPrice/100)*productOnsalePrice
        }
      }),
      stock: JSON.stringify({
        amount: productStock,
        content: null
      }),

      images: images.join(' '),

      sts: productVisibility
    }

    // console.log(saveProduct)

    axios.post(apiServerAddress('manager/product/save'), saveProduct)
    .then(res => {
      // console.log(res)
      if (res.data.status === 'success')
      {
        navigate('/manager/products')
        return true;
      }
      else
      {
        return false;
      }
    })
    .catch(err => {
      // console.log(err)
      return false;
    })
  }

  useEffect(() => {
    // console.log(serverAddress('api/manager/product/' + pid))

    var url = apiServerAddress(`manager/product`)
    console.log(url)
    axios.post(
      url,
      {
        key: '12345',
        pid: pid,
      })
      .then(res => {
        console.log(res.data)
        setProduct(res.data.data)
        var prod = res.data;

        setProductName(prod.name)
        setProductDescription(prod.description)
        setProductVisibility(prod.sts)
        setProductPrice(prod.price)
        setProductOnsalePrice(prod.onsale.new)
        setProductIsOnsale(prod.onsale.isonsale)
        setProductStock(prod.stock.amount)

        console.log(prod.images)
        var images = splitImages(prod.images)
        console.log(images)

        setProductImages(images)


        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>) : (
        <>
          <div className="add-product">
            <div className="add-product-details">
              <div className="add-product-details-content">
                <div className="details-content-title">
                  <h1 className="block-title">Adicionar Produto</h1>
                </div>

                <div className="details-content-visibility">
                  <div className="visibility-title">
                    <h1 className="block-title">Visibilidade</h1>
                  </div>
                  <div className="visibility-content">
                    <div className="visibility-content-item">
                        <a 
                          href={'#'}
                          onClick={(e) => {
                            e.preventDefault()
                            setProductVisibility(0)
                          }}
                          className={productVisibility === 0 ? 'active' : ''}
                          >
                          <span className="material-icons">
                            visibility_off
                          </span>
                        </a>
                        <a 
                          href={'#'}
                          onClick={(e) => {
                            e.preventDefault()
                            setProductVisibility(1)
                          }}
                          className={productVisibility === 1 ? 'active' : ''}
                          >
                          <span className="material-icons">
                            visibility
                          </span>
                        </a>
                        <a 
                          href={'#'}
                          onClick={(e) => {
                            e.preventDefault()
                            setProductVisibility(2)
                          }}
                          className={productVisibility === 2 ? 'active' : ''}
                          >
                          <span className="material-icons">
                            mode_edit
                          </span>
                        </a>
                    </div>
                  </div>
                </div>
                
                <div className="detail-content-name">
                  <div className="name-title">
                    <h1 className="block-title">Nome do Produto</h1>
                  </div>
                  <div className="name-content">
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      placeholder="Nome do produto" 
                      className="inp-text"
                      value={prodctName}
                      onChange={(e) => {
                        setProductName(e.target.value)
                      }}
                      />
                  </div>
                </div>

                <div className="detail-content-price-stock-sale">
                  <div className="content-stock">
                    <div className="stock-title">
                      <h1 className="block-title">Estoque</h1>
                    </div>
                    <div className="stock-content">
                      <input 
                        type="number" 
                        name="stock" 
                        id="stock" 
                        placeholder="Quantidade em estoque" 
                        className="inp-number"
                        value={productStock}
                        onChange={(e) => {
                          setProductStock(e.target.value)
                        }}
                        />
                    </div>
                  </div>
                  <div className="content-price">
                    <div className="price-title">
                      <h1 className="block-title">Preço</h1>
                    </div>
                    <div className="price-content">
                      <input 
                        type="number" 
                        name="price" 
                        id="price" 
                        placeholder="Preço do produto" 
                        className="inp-number"
                        value={productPrice}
                        onChange={(e) => {
                          setProductPrice(e.target.value)
                        }}
                        />
                    </div>
                  </div>
                  <div className="content-sale">
                    <div className="sale-title">
                      <a 
                        href={'#'}
                        onClick={(e) => {
                          e.preventDefault()
                          setProductIsOnsale(!productIsOnsale)
                        }}
                        >
                        <span>Tem desconto</span>
                      </a>
                    </div>
                    <div className="sale-content">
                      <input 
                        type="number" 
                        name="sale" 
                        id="sale" 
                        placeholder="Desconto do produto" 
                        className="inp-number"
                        value={productOnsalePrice}
                        onChange={(e) => {
                          setProductOnsalePrice(e.target.value)
                        }}
                        disabled={!productIsOnsale}
                        />
                    </div>
                  </div>
                </div>

                <div className="detail-content-description">
                  <div className="description-title">
                    <h1 className="block-title">Descrição</h1>
                  </div>
                  <div className="description-content">
                    <textarea 
                      name="description" 
                      id="description" 
                      placeholder="Descrição do produto" 
                      className="inp-textarea"
                      onChange={(e) => {
                        setProductDescription(e.target.value)
                      }}
                      value={productDescription}
                      ></textarea>
                  </div>
                </div>

              </div>
              <div className="add-product-details-images">
                <div className="details-images-blocks">
                  <div className="images-blocks-title">
                    <h1 className="block-title">Imagens</h1>
                  </div>
                  <div className="images-blocks-content">
                    {
                      productImages.map((image, index) => {
                        return (
                        <div className="images-blocks-content-item" key={index}>
                          <div className="images-blocks-content-item-img">
                            <img src={image} alt=""/>
                          </div>
                          <div className="images-blocks-content-item-actions">
                            {/* <a href="#">
                              <span className="material-icons">
                                edit
                              </span>
                            </a> */}
                            <a 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setProductImages(productImages.filter((img, i) => i !== index))
                              }}
                            >
                              <span className="material-icons">
                                delete
                              </span>
                            </a>
                          </div>
                        </div>
                        )})
                    }
                    
                    <div className="images-blocks-content-item">
                      <div className="images-blocks-content-item-new">
                        <span className="material-icons">add_circle</span>
                        <a href="#"></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-product-save">
              <div className="btn-group">
                <Link
                  to={'/manager/products?success=true&pid=' + pid}
                  className="btn btn-primary"
                  onClick={(e) => {
                    var s =saveProduct()
                    console.log(s);
                    if (s)
                    {
                      console.log('salvou')
                    }
                    else
                    {
                      e.preventDefault()
                    }
                  }}
                  >Salvar</Link>
                <Link to={'/manager/products'}
                  className="btn"
                  >Cancelar</Link>
              </div>
            </div>
          </div>
      </>)}
    </div>
  )
}

export default ManagerEdit
