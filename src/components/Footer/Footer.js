import React from 'react'
import './Footer.css'

const Footer = ({ date }) => (
  <div className='footer'>
    <div className='d-flex justify-content-center'>
      <p className='small text-muted'><a className='text-muted' href='https://jingjielim.com/'>Jing Jie Lim</a> © {date.getFullYear()}</p>
    </div>
  </div>
)

export default Footer
