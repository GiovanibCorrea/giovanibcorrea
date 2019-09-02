import { store } from 'react-easy-state'
import { findIndex, pullAt } from 'lodash'

const appStore = store({
  products: [
    {
      id: 0,
      idCategory: 0,
      name: 'Coca-cola lata',
      description: 'Coca-cola lata 350ml',
      price: 3.50,
      image: ''
    },
    {
      id: 1,
      idCategory: 0,
      name: 'Fanta uva lata',
      description: 'Fanta uva lata 350ml',
      price: 3.00,
      image: ''
    }
  ],
  
  categories: [
    {
      id: -1,
      name: 'Todos'
    },
    {
      id: 0,
      name: 'Bebidas'
    },
    {
      id: 1,
      name: 'Doces'
    },
    {
      id: 2,
      name: 'Salgados'
    }
  ],

  counter: '',
  counterState: '',

  startCounter: () => null,
  stopCounter: () => null,

  selectedCategory: 0,

  setSelectedCategory(categoryId) {
    appStore.selectedCategory = categoryId
  },
  cart: [],

  addToCart(product) {
    appStore.startCounter()

    let existentItem = findIndex(appStore.cart, item => {
      return item.id === product.id
    })

    if(existentItem > -1){
      appStore.cart[existentItem].quantity++
    }
    else{
      appStore.cart.push({
        ...product,
        quantity: 1
      })
    }
  },

  cleanAllCart(){
    appStore.cart = []
  },

  removeFromCart(product) {
    appStore.cart[appStore.cart.indexOf(product)].quantity--
    if(appStore.cart[appStore.cart.indexOf(product)].quantity < 1){
      pullAt(appStore.cart, appStore.cart.indexOf(product))
    }
  }
})

export default appStore
