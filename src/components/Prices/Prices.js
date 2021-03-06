import React, { useState, useEffect, Fragment } from 'react'
import { Table, Spinner } from 'react-bootstrap'
import CreatePrice from '../CreatePrice/CreatePrice'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { indexPrices } from '../../api/prices'
import { indexStores } from '../../api/stores'
import messages from '../AutoDismissAlert/messages'

const Prices = props => {
  const [itemPriceTable, setItemPriceTable] = useState([])
  const [priceList, setPriceList] = useState(null)
  const [tableHeaders, setTableHeaders] = useState([])
  const [change, setChange] = useState([])

  useEffect(() => {
    indexPrices(props.user)
      .then(res => {
        if (res.data.prices.length > 0) {
          setItemPriceTable(res.data.prices)
        } else {
          setItemPriceTable([])
          setPriceList([])
        }
      })
      .catch(error => props.msgAlert({
        heading: 'Load Prices Failure ' + error.message,
        message: messages.indexPricesFailure,
        variant: 'danger'
      }))
  }, [change])

  useEffect(() => {
    indexStores(props.user)
      .then(res => {
        const { stores } = res.data
        const tableHeaders = stores.map(store => <td key= {store.id}>{store.name}</td>)
        setTableHeaders(tableHeaders)
      })
      .catch(error => props.msgAlert({
        heading: 'Load Stores Failure ' + error.message,
        message: messages.indexStoresFailure,
        variant: 'danger'
      }))
  }, [change])

  const rowStoreValues = (stores) => {
    const rowValues = []
    for (const store in stores) {
      rowValues.push(
        <td key={stores[store].store_id} data-id={stores[store].price_id}>{stores[store].value}</td>
      )
    }
    return rowValues
  }

  useEffect(() => {
    if (itemPriceTable.length > 0) {
      const list = itemPriceTable.map(item => {
        return (
          <tr key={item.name}>
            <td>{item.name}</td>
            {rowStoreValues(item.stores)}
          </tr>
        )
      })
      setPriceList(list)
    }
  }, [itemPriceTable])

  if (priceList === null) {
    return (
      <Spinner className='my-3 mx-auto d-block' animation="border" variant='primary' role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  } else if (priceList.length < 1) {
    return (
      <Fragment>
        <h1>Price list</h1>
        <CreatePrice user={props.user} msgAlert={props.msgAlert} setChange={setChange}/>
        <div className='container d-flex justify-content-center'>
          <h5 className='text-muted'>No prices found. Create some above!</h5>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h1>Price list</h1>
        <CreatePrice user={props.user} msgAlert={props.msgAlert} setChange={setChange}/>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <td>Item Name</td>
              {tableHeaders}
            </tr>
          </thead>
          <tbody>
            {priceList}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}
export default Prices
