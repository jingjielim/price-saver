import React from 'react'

const ItemForm = ({ item, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      placeholder='Milk'
      name='name'
      value={item.name}
      onChange={handleChange}
    />
    <label>Unit</label>
    <input
      placeholder='gal'
      name='unit'
      value={item.unit}
      onChange={handleChange}
    />
    <button type='submit'>Add Item</button>
  </form>
)

export default ItemForm
