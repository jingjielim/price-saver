import React, { useState, useEffect, Fragment } from 'react'
import PriceForm from '../PriceForm/PriceForm'
import { createPrice } from '../../api/prices'
import { indexItems } from '../../api/items'
import { indexStores } from '../../api/stores'
import messages from '../AutoDismissAlert/messages'

const CreatePrice = props => {
  const [price, setPrice] = useState({ value: '', store_name: '', item_name: '' })
  const [storeNames, setStoreNames] = useState([])
  const [itemNames, setItemNames] = useState([])
  const [created, setCreated] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  useEffect(() => {
    indexItems(props.user)
      .then(res => {
        const { items } = res.data
        const itemNames = items.map(item => item.name)
        setItemNames(itemNames)
      })
      .catch(error => props.msgAlert({
        heading: 'Load Items Failure ' + error.message,
        message: messages.indexItemsFailure,
        variant: 'danger'
      }))
  }, [created])

  useEffect(() => {
    indexStores(props.user)
      .then(res => {
        const { stores } = res.data
        const storeNames = stores.map(store => store.name)
        setStoreNames(storeNames)
      })
      .catch(error => props.msgAlert({
        heading: 'Load Stores Failure ' + error.message,
        message: messages.indexStoresFailure,
        variant: 'danger'
      }))
  }, [created])

  const handleSubmit = event => {
    event.preventDefault()
    setSubmitted(true)
    const form = document.getElementsByTagName('input')
    const newPrice = {}
    for (let i = 0; i < form.length; i++) {
      newPrice[form[i].name] = form[i].value
      form[i].value = ''
    }
    createPrice(props.user, newPrice)
      .then(res => {
        setCreated(created => !created)
        props.setChange(change => !change)
        setSubmitted(false)
      })
      .then(() => props.msgAlert({
        heading: 'Add Price Success',
        message: messages.createPriceSuccess,
        variant: 'success'
      }))
      .catch(error => {
        const { data } = error.response || false
        if (data) {
          let message = ''
          for (const key in data) {
            if (data[key].length > 1) {
              message = message.concat(key + ' ')
              data[key].forEach(str => {
                message = message.concat(str + ' ')
              })
            }
          }
          error.message = message
        }
        props.msgAlert({
          heading: 'Create Price Failed with error: ' + error.message,
          message: messages.createPriceFailure,
          variant: 'danger'
        })
      })
  }

  const handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedPrice = Object.assign({}, price, updatedField)
    setPrice(editedPrice)
  }

  return (
    <Fragment>
      <PriceForm submitted={submitted} price={price} handleChange={handleChange} handleSubmit={handleSubmit} storeNames={storeNames} itemNames={itemNames} />
    </Fragment>
  )
}

export default CreatePrice
