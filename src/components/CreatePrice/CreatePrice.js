import React, { useState, useEffect, Fragment } from 'react'
import PriceForm from '../PriceForm/PriceForm'
import { createPrice } from '../../api/prices'
import { indexItems } from '../../api/items'
import { indexStores } from '../../api/stores'
import messages from '../AutoDismissAlert/messages'

const CreatePrice = props => {
  // const [price, setPrice] = useState({ value: '', store_name: '', item_name: '' })
  const [storeNames, setStoreNames] = useState([])
  const [itemNames, setItemNames] = useState([])
  const [created, setCreated] = useState(false)

  useEffect(() => {
    indexItems(props.user)
      .then(res => {
        const { items } = res.data
        const itemNames = items.map(item => item.name)
        setItemNames(itemNames)
      })
  }, [created])

  useEffect(() => {
    indexStores(props.user)
      .then(res => {
        const { stores } = res.data
        const storeNames = stores.map(store => store.name)
        setStoreNames(storeNames)
      })
  }, [created])

  const handleSubmit = event => {
    event.preventDefault()
    const form = document.getElementsByTagName('input')
    const newPrice = {}
    for (let i = 0; i < form.length; i++) {
      newPrice[form[i].name] = form[i].value
    }
    createPrice(props.user, newPrice)
      .then(res => {
        setCreated(created => !created)
        props.setChange(change => !change)
        // setPrice({ value: '', store_name: '', item_name: '' })
        document.getElementsByTagName('form')[0].reset()
      })
      .then(() => props.msgAlert({
        heading: 'Create Price Success',
        message: messages.createItemSuccess,
        variant: 'success'
      }))
      .catch(error => {
        console.log(error.response.data)
        props.msgAlert({
          heading: 'Create Price Failed with error: ' + error.message,
          message: messages.createItemFailure,
          variant: 'danger'
        })
      })
  }

  // const handleChange = event => {
  //   const updatedField = {
  //     [event.target.name]: event.target.value
  //   }
  //   console.log(updatedField)
  //   const editedPrice = Object.assign({}, price, updatedField)
  //   setPrice(editedPrice)
  // }

  return (
    <Fragment>
      <h1>Create Item</h1>
      <PriceForm /* price={price}  handleChange={handleChange} */ handleSubmit={handleSubmit} storeNames={storeNames} itemNames={itemNames} />
    </Fragment>
  )
}

export default CreatePrice
