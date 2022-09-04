import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({rgb,weight,index}) => {
  //set state alert flag to indicate that we copied color to clipboard
  const [alert,setAlert] = useState(false)
  //just generate rgb string from data
  const bcg = rgb.join(',')
  //generate hex string value via imported function
  const hex = rgbToHex(...rgb)
  //effect that do - setting alert flag back to false(turn off indication) after 3 secs
  //also effect goes only when flag changed
  //also we clearing timeout after every rerender 
  useEffect(() => {
    let timeout = setTimeout(() => {
      setAlert(false)
    },3000) 
    return () => clearTimeout(timeout)
  },[alert])
  //notice onclick article function - w/ navigatorApi we copy passed value, in our case - hex code of that block
  //to show the color we obviously change backgroundcolor
  //classname - we adding condition to make text color better visible on more darker colors
  //also notice how we adding alert - also w/ condition - checking flag and if its true - show the message
  return (
    <article 
    onClick={(e) => {
      setAlert(true)
      navigator.clipboard.writeText(hex)
    }}
    style={{backgroundColor:`rgb(${bcg})`}} 
    className={`color ${index > 10 && 'color-light'}`}>
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hex}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor
