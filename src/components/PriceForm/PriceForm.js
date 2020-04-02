import React from 'react'
import AutoComplete from '../AutoComplete/AutoComplete'

const PriceForm = ({ price, handleSubmit, handleChange, storeNames, itemNames }) => {
  return (
    <form autoComplete='off' className='form-inline' onSubmit={handleSubmit}>
      <div className='input-body'>
        <label className='mt-2 mr-2 sr-only'>Store</label>
        <AutoComplete
          required
          suggestions={storeNames}
          classes='form-control form-control-sm mt-2 mr-2'
          placeholder={'Store Name'}
          name={'store_name'}
          onChange={handleChange}
        />
      </div>
      <div className='input-body'>
        <label className='mt-2 mr-2 sr-only'>Item</label>
        <AutoComplete
          required
          suggestions={itemNames}
          classes='form-control form-control-sm mt-2 mr-2'
          placeholder={'Item Name'}
          name={'item_name'}
          onChange={handleChange}
        />
      </div>
      <div className='input-body'>
        <label className='mt-2 mr-2 sr-only'>Price</label>
        <input
          required
          className='form-control form-control-sm mt-2 mr-2'
          placeholder='Price'
          name='value'
          onChange={handleChange}
        />
      </div>
      <button className='btn btn-primary btn-sm mt-2 ' type='submit'>Submit</button>
    </form>
  )
}

export default PriceForm
