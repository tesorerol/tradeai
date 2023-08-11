import React from 'react'

const Button2 = ({txt,fnct}) => {

  return (
    <button onClick={()=>fnct()} className="btn2">
      <a >
        {txt}
      </a>
    </button>
  )
}

export default Button2
