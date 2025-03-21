import React from 'react'
import AppHeader from './_components/AppHeader'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <AppHeader />
        <div className="p-10 mt-20 md:px-20 lg:px-32 xl:px-56"> 
        { children }
        </div>
        </div>
  )
}

export default DashboardLayout