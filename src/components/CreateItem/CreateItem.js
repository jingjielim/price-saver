import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../ItemForm/ItemForm'
import { createItem } from '../../api/items'

const CreateItem = props => {
  const [item, setItem] = useState({ name: '', unit: '' })
  const [createdId, setCreatedId] = useState(null)

  const capitalize = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const name = capitalize(item.name)
    const unit = item.unit.toLowerCase()
    createItem(props.user, { name, unit })
      .then(res => {
        setCreatedId(res.data.item.id)
      })
      .catch(console.error)
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
