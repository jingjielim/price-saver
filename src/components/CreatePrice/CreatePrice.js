import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import PriceForm from '../PriceForm/PriceForm'
import { createPrice } from '../../api/prices'

const CreatePrice = props => {
  const [item, setItem] = useState({ name: '', unit: '' })
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()
    createPrice(props.user, item)
      .then(res => {
        setCreatedId(res.data.item.id)
      })
  }

  const handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedItem = Object.assign({}, item, updatedField)
    setItem(editedItem)
  }

  if (createdId) {
    return <Redirect to={`/items/${createdId}`} />
  } else {
    return (
      <PriceForm item={item} handleChange={handleChange} handleSubmit={handleSubmit} />
    )
  }
}

export default CreatePrice
