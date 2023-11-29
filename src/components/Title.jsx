import React from 'react'

export default function Title({ children, className }) {
  return (
    <span className={`bg-blue-100 text-blue-800 text-2xl font-extrabold p-2 rounded border border-blue-400 inline-block ${className}`}>{children}</span>
  )
}
