import React from 'react'

const Toaster = ({message}) => {
  return (
    <div className="flex items-center gap-2">
      <img src="../../../logo/demons.png" className="h-10 w-10 rounded-sm border-2 border-red-100 bg-white" />
      <span>{message}</span>
    </div>
  )
}

export default Toaster