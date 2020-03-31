import React, { useState, useEffect, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { showItem, deleteItem } from '../../api/items'

const Item = props => {
  const [deleted, setDeleted] = useState(false)
  const [item, setItem] = useState(null)
  const [lowPrice, setLowPrice] = useState(null)
  const [priceTable, setPriceTable] = useState(
    <tr>
      <td>-</td>
      <td>-</td>
    </tr>
  )

  useEffect(() => {
    showItem(props.user, props.match.params.id)
      .then(res => {
        console.log(res)
        const { item } = res.data
        setItem(item)
        if (item.prices.length > 0) {
          const priceTable = item.prices.map(price => (
            <tr key={price.id}>
              <td data-store={price.store_id}>{price.store_name}</td>
              <td>${price.value}</td>
            </tr>
          ))
          setPriceTable(priceTable)
          setLowPrice(
            <Fragment>
              <h3>${item.lowest.price}/{item.unit}</h3>
              <h5>{item.lowest.store}</h5>
            </Fragment>
          )
        } else {
          setLowPrice(
            <Fragment>
              <h3>No price available</h3>
            </Fragment>
          )
        }
      })
      .catch(res => {
        console.log(res)
      })
  }, [])

  const handleDelete = (event) => {
    const itemId = event.target.getAttribute('data-id')
    deleteItem(props.user, itemId)
      .then(() => {
        setDeleted(true)
      })
      .catch(console.error)
  }

  if (deleted) {
    return <Redirect to={'/home'} />
  } else if (item === null) {
    return (
      <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    )
  } else {
    return (
      <div>
        <h1 data-id={item.id}>{item.name}</h1>
        {lowPrice}
        <Link to={`/items/${item.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button data-id={item.id} onClick={handleDelete}>Delete</button>
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
