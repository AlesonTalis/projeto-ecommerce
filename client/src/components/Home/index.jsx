import React, {useEffect, useState} from 'react'
import Saldo from '../Saldo'
import {TopBar, SideBar, BottomBar} from '../Bars'
import {AllProductsFromList} from '../Products'
// axios
import axios from 'axios'
const API_URL = 'http://localhost:5000/api';

function Home() {
  // random number generator for products price, ranging from 0 to 100 plus 20
  const randomNumber = () => {return (Math.floor(Math.random() * (100 - 1 + 1)) + 20)}

  // function that return a array of 5 numbers ranging from 0 to 2
  const randomArray = () => {
    let array = []
    for (let i = 0; i < 5; i++) {
      var n = Math.floor(Math.random() * (2 - 0 + 1)) + 0
      // first two needs to be 2
      if (i < 2) {
        n = 2
      }
      // if array contains the number 1, then it needs to be 0
      if (array.includes(1) && n === 1) {
        array.push(0);
      }
      else
      {
        array.push(n);
      }
    }
    // order array by desc
    array.sort((a, b) => b - a)
    // return array
    return array
  }

  const products = [
    {'id': 1, 'name': 'Tenis 1', 'price': randomNumber(), 'rate': randomArray(), 'image': './assets/images/shoes.png', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'id': 2, 'name': 'Tenis 2', 'price': randomNumber(), 'rate': randomArray(), 'image': './assets/images/shoes.png', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'id': 3, 'name': 'Tenis 3', 'price': randomNumber(), 'rate': randomArray(), 'image': './assets/images/shoes.png', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'id': 4, 'name': 'Tenis 4', 'price': randomNumber(), 'rate': randomArray(), 'image': './assets/images/shoes.png', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'id': 3, 'name': 'Tenis 5', 'price': randomNumber(), 'rate': randomArray(), 'image': './assets/images/shoes.png', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'id': 4, 'name': 'Tenis 6', 'price': randomNumber(), 'rate': randomArray(), 'image': './assets/images/shoes.png', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
  ]

  const [productsList, setProductsList] = useState([])

  useEffect(() => {
    // setProductsList(products)
    // axios fetch products from database
    axios.post(API_URL + '/products', {
      key: '12345'
    })
    .then(res => {
      console.log(res.data)
      setProductsList(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  },[])


  return (
    <div className="container">
      {/* <Saldo/> */}
      <div className="content">
        <input type="checkbox" name="content-grid-list" id="content-grid-list"/>
        <TopBar/>
        <div className="content-area">
          <SideBar/>
          <div className="content-body">
            <div className="content-body-grid">
              <AllProductsFromList productsList={productsList}/>
            </div>
          </div>
        </div>
      </div>
      <BottomBar/>
    </div>
  )
}

export default Home
