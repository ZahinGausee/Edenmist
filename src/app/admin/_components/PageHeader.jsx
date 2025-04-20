import React from 'react'

const PageHeader = ({children}) => {
  return (
    <h1 className='text-4xl mb-4 text-white'>{children}</h1>
  )
}

export default PageHeader