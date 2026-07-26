import React from 'react'

const layout = ({ children }) => {
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-brand-gradient'>{children}</div>
    )
}

export default layout