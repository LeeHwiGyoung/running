import React from 'react'

export default function LoadingSpinner() {
  return (
      <div className="absolute top-[50%] left-[50%] translate-[-50%] animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 z-[100000]"></div>  
  )
}
