import React from 'react'
import './FormButton.css'

export default function FormButton({className, onClick , text}) {
  return (
    <div>
      <button className={className ? className : 'form-btn'} onClick={onClick} >{text}</button>
    </div>
  )
}
