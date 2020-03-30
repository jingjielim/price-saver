import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexItems } from '../../api/items'

const Items = props => {
  const [itemsList, setItemsList] = useState(null)

  useEffect(() => {
    indexItems(props.user)
      .then(res => {
        const itemsList = res.data.items.map(item => {
          if (item.lowest.price) {
            return (
              <div key={item.id}>
                <Link to={`/items/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <h5>Lowest price: {`$${item.lowest.price}` || 'No prices yet'}/{item.unit}</h5>
                <p>{item.lowest.store || ''}</p>
              </div>
            )
          } else {
            return (
              <div key={item.id}>
                <Link to={`/items/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <h5>No price available</h5>
              </div>
            )
          }
        })
        setItemsList(itemsList)
      })
  }, [])

  return (
    itemsList
  )
}

export default Items
