import React from 'react'

const ItemForm = ({ item, handleSubmit, handleChange }) => (
  <form className='form-inline' onSubmit={handleSubmit}>
    <label className='mt-2 mr-2'>Name</label>
    <input
      className='form-control mt-2 mr-2'
      placeholder='Milk'
      name='name'
      value={item.name}
      onChange={handleChange}
    />
    <label className='mt-2 mr-2'>Unit</label>
    <input className='form-control mt-2 mr-2'
      placeholder='gal'
      name='unit'
      value={item.unit}
      onChange={handleChange}
    />
    <button className='btn btn-info mt-2' type='submit'>Submit</button>
  </form>
)

export default ItemForm
