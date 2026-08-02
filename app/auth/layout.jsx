import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='bg-brand-gradient flex min-h-screen items-center justify-center p-4'>{children}</div>
    )
}

export default AuthLayout