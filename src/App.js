import React, { useState } from 'react'
import SingleColor from './SingleColor'

//side library to work w/ colors, we need only .all method - return amount of tints and shades to particular colour
import Values from 'values.js'

function App() {
  //color - input state value, initially its empty string
  const [color,setColor] = useState('')
  //error flag, to indicate errors on input field
  const [error,setError] = useState(false)
  //list of tints and shadows for the passed colour, initially we set some color and his tints/shadows just to have not emty page at start
  const [list,setList] = useState(new Values('#f15025').all(10))
  //function handler
  const handleSubmit = e => {
    //prevent target-blank functionality
    e.preventDefault()
    try {
      //get tints'n'shadows for color - input value/passed value
      let colors = new Values(color).all(10)
      //set list variable (which is data holder) to data that we get above
      setList(colors)
    } catch (error) {
      //if error change error flag to true
      setError(true)
    }
  }


  //input - controlled component w/ state value, error indication inside classname of input (just condition on flag)
  //then just populate list variable to page, notice HOW we pass each items variables
  //also notice that we pass index intentionally
  return (
    <>
    <section className='container'>
      <h3>colour generator</h3>
      <form onSubmit={handleSubmit}>
        <input value={color} className={`${error?'error':null}`} placeholder='#f15025' type='text' onChange={(e) => setColor(e.target.value)} />
        <button className='btn'>submit</button>
      </form>
    </section>
    <section className='colors'>
      {list.map((color,index) => {
        return (
          <SingleColor key={index} {...color} index={index} />
        )
      })}
    </section>
    </>
  )
}

export default App
