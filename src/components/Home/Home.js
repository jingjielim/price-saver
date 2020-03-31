import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { indexItems, deleteItem } from '../../api/items'

const Home = props => {
  const [itemsList, setItemsList] = useState(null)
  const [deleted, setDeleted] = useState(0)
  const [storeFilter, setStoreFilter] = useState(null)

  useEffect(() => {
    indexItems(props.user)
      .then(res => {
        const itemsList = res.data.items.map(item => {
          if (item.lowest.price) {
            if (storeFilter === null) {
              return (
                <div key={item.id}>
                  <Link to={`/items/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <h5>Lowest price: {`$${item.lowest.price}` || 'No prices yet'}/{item.unit}</h5>
                  <p>{item.lowest.store || ''}</p>
                  <Link to={`/items/${item.id}/edit`}>
                    <button>Edit</button>
                  </Link>
                  <button data-id={item.id} onClick={handleDelete}>Delete</button>
                </div>
              )
            } else if (storeFilter && item.lowest.store === storeFilter) {
              return (
                <div key={item.id}>
                  <Link to={`/items/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <h5>Lowest price: {`$${item.lowest.price}` || 'No prices yet'}/{item.unit}</h5>
                  <p>{item.lowest.store || ''}</p>
                  <Link to={`/items/${item.id}/edit`}>
                    <button>Edit</button>
                  </Link>
                  <button data-id={item.id} onClick={handleDelete}>Delete</button>
                </div>
              )
            }
          } else {
            return (
              <div key={item.id}>
                <Link to={`/items/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <h5>No price available</h5>
                <Link to={`/items/${item.id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button data-id={item.id} onClick={handleDelete}>Delete</button>
              </div>
            )
          }
        })
        setItemsList(itemsList)
      })
  }, [deleted])

  const handleDelete = (event) => {
    const itemId = event.target.getAttribute('data-id')
    deleteItem(props.user, itemId)
      .then(() => {
        setDeleted(deleted => deleted + 1)
      })
      .catch(console.error)
  }

  const handleStoreFilter = event => {
    setStoreFilter(event.target.value)
  }

  if (itemsList === null) {
    return (
      <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    )
  } else {
    return (
      <Fragment>
        <button onClick={handleStoreFilter}>HMART</button>
        {itemsList}
      </Fragment>
    )
  }
}

export default Home
