import React from 'react'
import './Advanced.css'
import { useState } from 'react'

function Slider( {variable, var_name, handler, clicker}) {

    const [Checked, setChecked] = useState(false)

    const handleChange = (event) => {
        setChecked(!Checked)
        clicker()
    }

    

  return (
    <div className='Sliderbox'>
    <input className='checkbox' style={{transform: "scale(2)"}} type='checkbox' onChange={handleChange}/>
    <div className='varname' >{var_name} </div>
    <input className='slider' type='range' min={0}  max={100} defaultValue={0} onChange={handler} disabled={!Checked} />
    <div className='varvalue'>{variable}</div>
    </div>
  )
}

export default Slider