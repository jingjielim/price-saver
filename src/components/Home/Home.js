import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { indexItems, deleteItem } from '../../api/items'

import messages from '../AutoDismissAlert/messages'

const Home = props => {
  const [itemsList, setItemsList] = useState(null)
  const [deleted, setDeleted] = useState(0)
  const [storeFilter, setStoreFilter] = useState(null)

  useEffect(() => {
    indexItems(props.user)
      .then(res => {
        const itemsList = res.data.items.map(item => {
          if (item.lowest.price) {
            if (storeFilter === null || (storeFilter && item.lowest.store === storeFilter)) {
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
          } else if (storeFilter === null) {
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
      .catch(error => props.msgAlert({
        heading: 'Load Home Page Failure ' + error.message,
        message: messages.homeFailure,
        variant: 'danger'
      }))
  }, [deleted, storeFilter])

  const handleDelete = (event) => {
    const itemId = event.target.getAttribute('data-id')
    deleteItem(props.user, itemId)
      .then(() => {
        setDeleted(deleted => deleted + 1)
      })
      .catch(error => props.msgAlert({
        heading: 'Deletion Failed with error: ' + error.message,
        message: messages.deleteItemFailure,
        variant: 'danger'
      }))
  }

  const handleStoreFilter = event => {
    const filter = event.target.name
    if (filter === 'null') {
      setStoreFilter(null)
    } else {
      setStoreFilter(filter)
    }
  }

  if (itemsList === null) {
    return (
      <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    )
  } else {
    return (
      <Fragment>
        <button onClick={handleStoreFilter} name="null">All</button>
        <button onClick={handleStoreFilter} name="HMART">HMART</button>
        <button onClick={handleStoreFilter} name="CMART">CMART</button>
        <button onClick={handleStoreFilter} name="Whole Foods">Whole Foods</button>
        {itemsList}
      </Fragment>
    )
  }
}

export default Home
