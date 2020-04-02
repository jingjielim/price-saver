import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import ItemForm from '../ItemForm/ItemForm'
import { createItem } from '../../api/items'
import messages from '../AutoDismissAlert/messages'

const CreateItem = props => {
  const [item, setItem] = useState({ name: '', unit: '' })
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()

    createItem(props.user, item)
      .then(res => {
        setCreatedId(res.data.item.id)
      })
      .then(() => props.msgAlert({
        heading: 'Create Item Success',
        message: messages.createItemSuccess,
        variant: 'success'
      }))
      .catch(error => props.msgAlert({
        heading: 'Create Item Failed with error: ' + error.message,
        message: messages.createItemFailure,
        variant: 'danger'
      }))
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
      <Fragment>
        <h1>Create Item</h1>
        <ItemForm item={item} handleChange={handleChange} handleSubmit={handleSubmit} />
      </Fragment>
    )
  }
}

export default CreateItem
