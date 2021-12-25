import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext()

// https://shopify.github.io/js-buy-sdk/
const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
})

export class ShopProvider extends Component {
  state = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  }

  // localStorageからcheckout_idを取得、なければcheckoutを作成
  componentDidMount() {
    if (localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id)
    } else {
      this.createCheckout()
    }
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create()
    localStorage.setItem('checkout_id', checkout.id)
    this.setState({ checkout })
  }

  fetchCheckout = async (checkoutId) => {
    client.checkout.fetch(checkoutId).then((checkout) => {
      this.setState({ checkout })
    })
  }

  addItemToCheckout = async () => {}

  removeLineItem = async (lineItemIdsToRemove) => {}

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll()
    this.setState({ products })
  }

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle)
    this.setState({ product })
  }

  closeCart = () => {}

  openCart = () => {}

  closeMenu = () => {}

  openMenu = () => {}

  render() {
    console.log(this.state.checkout)
    return <ShopContext.Provider>{this.props.children}</ShopContext.Provider>
  }
}

const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider
