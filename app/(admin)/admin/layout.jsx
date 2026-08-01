import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from '@/components/Application/Admin/AppSidebar'
const layout = ({ children }) => {
    return (
        <SidebarProvider>
          <AppSidebar/>
            <main>{children}</main>
        </SidebarProvider>
    )
}

export default layout