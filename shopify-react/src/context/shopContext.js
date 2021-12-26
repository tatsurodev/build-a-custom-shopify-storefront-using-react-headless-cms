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

  // context内のみでしかcheckoutは作成しない
  createCheckout = async () => {
    const checkout = await client.checkout.create()
    localStorage.setItem('checkout_id', checkout.id)
    this.setState({ checkout })
  }

  fetchCheckout = (checkoutId) => {
    client.checkout.fetch(checkoutId).then((checkout) => {
      this.setState({ checkout })
    })
  }

  addItemToCheckout = async (variantId, quantity) => {
    // customAttributes keyは、例えばcustom t-shirt等のprintするtextに使える
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    )
    this.setState({ checkout })
    this.openCart()
  }

  removeLineItem = async (lineItemIdsToRemove) => {
    const checkout = await client.checkout.removeLineItems(
      this.state.checkout.id,
      lineItemIdsToRemove
    )
    this.setState({ checkout })
  }

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll()
    this.setState({ products })
  }

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle)
    this.setState({ product })
  }

  closeCart = () => {
    this.setState({ isCartOpen: false })
  }

  openCart = () => {
    this.setState({ isCartOpen: true })
  }

  closeMenu = () => {}

  openMenu = () => {}

  render() {
    console.log(this.state.checkout)
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}

const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider
