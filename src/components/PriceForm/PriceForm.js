import React from 'react'
import AutoComplete from '../AutoComplete/AutoComplete'
import './PriceForm.css'
const PriceForm = ({ price, handleSubmit, handleChange, storeNames, itemNames, submitted }) => {
  return (
    <form autoComplete='off' className='form-inline text-center d-flex justify-content-center mb-2' onSubmit={handleSubmit}>
      <div className='input-body'>
        <div className='input-group input-group-sm mt-2 mr-2'>
          <label className='sr-only'>Add new price</label>
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">$</span>
          </div>
          <input
            required
            className='form-control'
            placeholder='Add new price'
            name='value'
            onChange={handleChange}
            type='number'
            step='0.01'
            min='0.01'
          />
        </div>
      </div>
      <div className='input-body'>
        <label className='sr-only'>Store</label>
        <AutoComplete
          suggestions={storeNames}
          classes='form-control form-control-sm mt-2 mr-2'
          placeholder={'Store name'}
          name={'store_name'}
          submitted={submitted}
        />
      </div>
      <div className='input-body'>
        <label className='mt-2 mr-2 sr-only'>Item</label>
        <AutoComplete
          suggestions={itemNames}
          classes='form-control form-control-sm mt-2 mr-2'
          placeholder={'Item name'}
          name={'item_name'}
          submitted={submitted}
        />
      </div>
      <button className='btn btn-primary btn-sm mt-2 create-form-submit' type='submit'>Submit</button>
    </form>
  )
}

export default PriceForm
