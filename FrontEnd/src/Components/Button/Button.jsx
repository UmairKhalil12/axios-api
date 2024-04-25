import React from 'react'
import './Button.css'

export default function Button({className, onClick , text}) {
  return (
    <div>
      <button className={className ? className : 'btn'} onClick={onClick} >{text}</button>
    </div>
  )
}
