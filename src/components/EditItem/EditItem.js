import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../ItemForm/ItemForm'
import { editItem, showItem } from '../../api/items'
import messages from '../AutoDismissAlert/messages'

const EditItem = props => {
  const [item, setItem] = useState({ name: '', unit: '' })
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    showItem(props.user, props.match.params.id)
      .then(res => setItem({ name: res.data.item.name, unit: res.data.item.unit }))
      .catch(error => props.msgAlert({
        heading: 'Get Item Failed with error: ' + error.message,
        message: messages.showItemFailure,
        variant: 'danger'
      }))
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    editItem(props.user, { name: item.name, unit: item.unit }, props.match.params.id)
      .then(res => {
        setEdited(true)
      })
      .catch(error => props.msgAlert({
        heading: 'Edit Item Failed with error: ' + error.message,
        message: messages.editItemFailure,
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

  if (edited) {
    return <Redirect to={`/items/${props.match.params.id}`} />
  } else {
    return (
      <Fragment>
        <h1>Edit Item</h1>
        <ItemForm item={item} handleChange={handleChange} handleSubmit={handleSubmit} />
      </Fragment>
    )
  }
}

export default EditItem
