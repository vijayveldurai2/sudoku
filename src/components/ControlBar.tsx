import React from 'react'

export default function ControlBar({controls}: {controls: {name: string, action: () => void}[]}) {
    
  return (
    <div className='control-bar'>
      {controls.map((control, index) => (
        <button key={index} onClick={control.action} className='control-button'>
          {control.name}
        </button>
      ))}
    </div>
  )
}
