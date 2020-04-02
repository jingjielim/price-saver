import React, { useState, useEffect, Fragment } from 'react'
import { Spinner } from 'react-bootstrap'
import { indexItems } from '../../api/items'
import { indexStores } from '../../api/stores'
import HomeCard from '../HomeCard/HomeCard'
import HomeButtons from '../HomeButtons/HomeButtons'
import CreatePrice from '../CreatePrice/CreatePrice'
import messages from '../AutoDismissAlert/messages'
import './Home.css'
const Home = props => {
  const [items, setItems] = useState([])
  const [cards, setCards] = useState(null)
  const [change, setChange] = useState(false)
  const [storeFilter, setStoreFilter] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [searchRegex, setSearchRegex] = useState(/(?:)/)
  const [stores, setStores] = useState(null)
  // Get list of stores
  useEffect(() => {
    indexStores(props.user)
      .then(res => {
        const { stores } = res.data
        setStores(stores.map(store => store.name))
      })
      .catch(error => props.msgAlert({
        heading: 'Load Stores Failure ' + error.message,
        message: messages.indexStoresFailure,
        variant: 'danger'
      }))
  }, [change])
  // Get list of items with their price lists
  useEffect(() => {
    indexItems(props.user)
      .then(res => {
        const { items } = res.data
        setItems(items)
      })
      .catch(error => props.msgAlert({
        heading: 'Load Home Page Failure ' + error.message,
        message: messages.homeFailure,
        variant: 'danger'
      }))
  }, [change])
  // Put each item into cards, refresh when items, storefilter or searchValue changes
  useEffect(() => {
    const cards = items.map(item => {
      return <HomeCard key={item.id} item={item} storeFilter={storeFilter} searchValue={searchValue} searchRegex={searchRegex} />
    })
    setCards(cards)
  }, [items, storeFilter, searchValue])

  // handle deleting of items
  // const handleDelete = (event) => {
  //   const itemId = event.target.getAttribute('data-id')
  //   deleteItem(props.user, itemId)
  //     .then(() => {
  //       setDeleted(deleted => deleted + 1)
  //     })
  //     .catch(error => props.msgAlert({
  //       heading: 'Deletion Failed with error: ' + error.message,
  //       message: messages.deleteItemFailure,
  //       variant: 'danger'
  //     }))
  // }
  // handle change in store filter
  const handleStoreFilter = event => {
    const btnElements = document.getElementsByTagName('button')
    for (const element of btnElements) {
      element.classList.remove('selected')
    }
    const filter = event.target.name
    setStoreFilter(filter)
    document.getElementById(filter).classList.add('selected')
  }

  const handleSearchChange = event => {
    const searchValue = event.target.value
    const regex = new RegExp(searchValue, 'i')
    setSearchValue(searchValue)
    setSearchRegex(regex)
  }

  if (cards === null || stores === null) {
    return (
      <Spinner className='m-auto d-block' animation="border" variant='primary' role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Fragment>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            <CreatePrice user={props.user} msgAlert={props.msgAlert} setChange={setChange}/>
          </div>
          <div className='row d-flex justify-content-center align-items-center'>
            <div className='mb-2 mr-1 mb-0 filter-words'>Cheapest items at:</div>
            <HomeButtons stores={stores} handleStoreFilter={handleStoreFilter}/>
          </div>
          <div className='row justify-content-center'>
            <input className='form-control form-control-sm mb-2 search-bar' onChange={handleSearchChange} placeholder='Search items' value={searchValue} />
          </div>
          <div className='row'>
            {cards}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home
