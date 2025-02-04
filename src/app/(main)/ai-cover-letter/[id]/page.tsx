import React from 'react'

const CoverletterPage =async ({params}:{params:any}) => {
    const id=await params.id
  return (
    <div>
        {id}
      
    </div>
  )
}

export default CoverletterPage
