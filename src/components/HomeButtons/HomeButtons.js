import React, { useState, useEffect, Fragment } from 'react'

const HomeButtons = ({ stores, handleStoreFilter }) => {
  const [storeButtons, setStoreButtons] = useState(null)

  useEffect(() => {
    if (stores.length > 0) {
      const storeButtons = stores.map(store => (
        <button className='btn btn-primary btn-sm mt-3 mr-1' id={store} key={store} onClick={handleStoreFilter} name={store}>{store}</button>
      ))
      setStoreButtons(storeButtons)
    }
  }, [stores])

  return (
    <Fragment>
      <button className='btn btn-primary btn-sm mt-3 mr-1' key='all' id='all' onClick={handleStoreFilter} name="all">All</button>
      {storeButtons}
    </Fragment>
  )
}

export default HomeButtons
