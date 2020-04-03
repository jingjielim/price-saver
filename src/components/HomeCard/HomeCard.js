import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Card, Table } from 'react-bootstrap'

const HomeCard = ({ item, storeFilter, searchValue, searchRegex, handleDelete }) => {
  const [cardTable, setCardTable] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    if (item.last_updated) {
      const date = new Date(item.last_updated)
      setLastUpdated(date.toISOString().substring(0, 10))
    } else {
      setLastUpdated(null)
    }
  }, [item])
  useEffect(() => {
    if (item.prices && item.prices.length > 0) {
      const cardRows = item.prices.map(price => {
        const { storeName = price.store_name, value, id } = price
        return (
          <tr key={id}>
            <td>{storeName}</td>
            <td>${value}/{item.unit}</td>
          </tr>
        )
      })
      const cardTable = (
        <Table responsive striped hover size='sm'>
          <thead>
            <tr>
              <th>Store</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cardRows}
          </tbody>
        </Table>
      )
      setCardTable(cardTable)
    } else {
      setCardTable(null)
    }
  }, [item])
  if ((storeFilter === 'all' && searchRegex.test(item.name)) || (item.lowest.store === storeFilter && searchRegex.test(item.name))) {
    return (
      <div className='col-sm-6 col-md-4 col-lg-3 my-2'>
        <Card>
          <Card.Header className='font-weight-bold'>{item.name}</Card.Header>
          <Card.Body>
            <Card.Title className={item.lowest.price ? 'cheapest' : null}>{item.lowest.price ? `$${item.lowest.price}/${item.unit}` : 'No price yet'}</Card.Title>
            <Card.Subtitle className="mb-2">{item.lowest.price ? item.lowest.store : null }</Card.Subtitle>
          </Card.Body>
          {cardTable}
          <Card.Footer className='small'>
            Last updated: {lastUpdated !== null ? lastUpdated : '-'}
          </Card.Footer>
        </Card>
      </div>
    )
  } else {
    return null
  }
}

export default HomeCard
