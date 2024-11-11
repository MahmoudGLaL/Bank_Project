import { Input } from '@nextui-org/react'
import React from 'react'
import SideNav from '../Components/SideNav/SideNav'
import { Outlet, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

export default function Main() {
    const{id}= useParams()
    return (
   

            <div className='flex w-full'>

                <div className='w-full'>

                    <Navbar />
                    <Outlet />

                </div>
            

                <SideNav />
            
            </div>



        
    )
}

