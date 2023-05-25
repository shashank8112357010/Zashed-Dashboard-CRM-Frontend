import React from 'react'
import { getUserRole } from '../helper/token.helper'
import AdminSales from './AdminSales'
import ClientSales from './ClientSales'


const Sales = () => {
    const Role = getUserRole()

    
  return (
    <>
    {
        Role == 'Admin' ? 
        <AdminSales/> : 
        Role == 'Client' &&
        <ClientSales/>
    }
    </>
  )
}

export default Sales