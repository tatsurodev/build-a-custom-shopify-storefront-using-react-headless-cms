import React, { Component } from 'react'
import Client from 'shopify-buy'

// https://shopify.github.io/js-buy-sdk/
const client = Client.buildClient({
  domain: 'your-shop-name.myshopify.com',
  storefrontAccessToken: 'your-storefront-access-token',
})

export class ShopProvider extends Component {
  render() {
    return <div></div>
  }
}

export default ShopProvider
