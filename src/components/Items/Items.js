import React, { useEffect } from 'react'

import { indexItems } from '../../api/items'

const Items = props => {
  // const [items, setItems] = useState(null)

  useEffect(() => {
    indexItems(props.user)
      .then(res => console.log(res))
  })
  return (
    <div>
    </div>
  )
}

export default Items
