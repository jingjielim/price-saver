import React, { useState, useEffect, Fragment } from 'react'
import { showItem } from '../../api/items'

const Item = props => {
  const [item, setItem] = useState(null)
  const [priceTable, setPriceTable] = useState(
    <tr>
      <td>-</td>
      <td>-</td>
    </tr>
  )

  useEffect(() => {
    showItem(props.user, props.match.params.id)
      .then(res => {
        const { item } = res.data
        if (item.prices.length > 0) {
          const priceTable = item.prices.map(price => (
            <tr key={price.id}>
              <td data-store={price.store.id}>{price.store_name}</td>
              <td>${price.value}</td>
            </tr>
          ))
          setPriceTable(priceTable)
          setItem(
            <Fragment>
              <h1 data-id={item.id}>{item.name}</h1>
              <h3>${item.lowest.price}</h3>
              <h5>{item.lowest.store}</h5>
            </Fragment>
          )
        } else {
          setItem(
            <Fragment>
              <h1 data-id={item.id}>{item.name}</h1>
              <h3>No price available</h3>
            </Fragment>
          )
        }
      })
  }, [])

  if (item === null) {
    return (
      <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    )
  } else {
    return (
      <div>
        {item}
        <table>
          <thead>
            <tr>
              <th>Store</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {priceTable}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Item
