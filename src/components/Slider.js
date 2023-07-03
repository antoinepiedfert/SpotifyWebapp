import React from 'react'
import './Advanced.css'
import { useState } from 'react'

function Slider( {variable, var_name, handler}) {

    const [Checked, setChecked] = useState(false)

    const handleChange = (event) => {setChecked(!Checked)}

    

  return (
    <div className='Sliderbox'>
    <div>{var_name} {variable}</div>
    <input type='checkbox' onChange={handleChange}/>
    <input type='range' min={0}  max={100} defaultValue={0} onChange={handler} disabled={!Checked}/>
    
    </div>
  )
}

export default Slider