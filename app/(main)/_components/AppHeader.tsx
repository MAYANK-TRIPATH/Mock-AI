import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

const AppHeader = () => {
  return (
    <div className="flex items-center justify-between p-3 shadow-sm ">
        <Image src={'/globe.svg'} alt="Logo" 
        width={40}
        height={40} />

        <UserButton /> 
    </div>
  )
}

export default AppHeader