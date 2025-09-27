import React from 'react'

export const inputSegment = (id, name, type, autoComplete, placeholder, value, event, attributes) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value}
      onChange={(event) => setPassword(event.target.value)}
      className={attributes}
    />
  )
}
