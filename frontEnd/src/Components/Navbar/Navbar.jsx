import React, { useContext } from 'react'
import { FaBars } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { toggle } from '../../Context/Toggle.Context';
import { useNavigate } from 'react-router-dom';
import { authcontext } from '../../Context/authcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiBars3CenterLeft } from "react-icons/hi2";
export default function Navbar() {

  let { toggleButton, setToggleButton } = useContext(toggle)

  const navigate = useNavigate()
  let handleClick = () => {
    setToggleButton(prev => !prev)
  }

  let handleLogout = async () => {
    if(localStorage.getItem("role") === 'SuperAdmin' ){
      localStorage.removeItem("token")
      localStorage.removeItem("id")
      localStorage.removeItem("user")
      localStorage.removeItem("role")
      localStorage.removeItem("tres_id")
      navigate('/')
    }
    else {

        await axios.get(`https://localhost:44365/api/Treasuries/${localStorage.getItem("tres_id")}`).then(res => {
          if (res.data.isSelected === true) {
            toast.error("من فضلك تأكد من اغلاق الخزنه اولا")
          }
          else {
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            localStorage.removeItem("user")
            localStorage.removeItem("role")
            localStorage.removeItem("tres_id")
            navigate('/')
          }
        }).catch(err => {
          console.log(err)
        })

    }



  }

  return (
    <nav className='bg-[#9897a1] w-full h-[61px] shadow-sm p-3'>
      <div className='flex justify-between items-center '>

        <div className='flex  gap-5 items-center ms-12'>
          <div className='text-[#fff] cairo font-bold flex gap-1 items-center cursor-pointer' onClick={handleLogout}>
            <span className=''>
              تسجيل خروج
            </span>
            {/* <IoIosLogOut/> */}
            <MdLogout className='text-[#fff] cairo font-bold ' />

          </div>
          <div className='text-[13px] cairo  text-[#fff]'> MN2222</div>
        </div>

        <div onClick={handleClick} className='bg-[#f0bb51] rounded-md cursor-pointer  py-[8px] px-[12px] w-[37px] flex justify-center items-center'>
        {toggleButton ?
          <FaBars className='text-white' />
          :  <span className='text-white text-xl font-bold' > <HiBars3CenterLeft /> </span>  
        }
        </div>

      </div>

    </nav>
  )
}
