import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiReceipt } from "react-icons/ci";
import { MdOutlineReceipt } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { toggle } from '../../Context/Toggle.Context';
import { BsSafe2Fill } from "react-icons/bs";
import { RiSafe2Line } from "react-icons/ri";
import { FaFileContract } from "react-icons/fa6";
import { RiContractLine } from "react-icons/ri";
import { FaUsersLine } from "react-icons/fa6";
import { RiSafe2Fill } from "react-icons/ri";
import { RiSafeLine } from "react-icons/ri";
import image from '../../assests/bank-building2 .png'
export default function SideNav() {
  let { toggleButton } = useContext(toggle)
  let navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(null);



  useEffect(() => {
    const savedIndex = localStorage.getItem('activeIndex');
    if (savedIndex !== null) {
      setActiveIndex(Number(savedIndex));
    }
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem('activeIndex', index);
    if (index === 0) {

      navigate("/penalties")

    }
    if (index === 1) {

      navigate("/transactions")

    }
    if (index === 2) {

      navigate("/closing")

    }
    if (index === 3) {

      navigate("/addSafe")

    }
    if (index === 4) {

      navigate("/showSafes")

    }
    if (index === 5) {

      navigate("/AddContract")

    }
    if (index === 6) {

      navigate("/showContract")

    }
    if (index === 7) {

      navigate("/addUsers")

    }
    if (index === 8) {

      navigate("/showUsers")

    }
    if (index === 9) {

      navigate("/closeTresury")

    }
  };

  // from-slate-300 bg-gradient-to-br to-purple-600/10   via-green-500/10  dark:bg-gray-800

  return (

    <nav className={`bg-sidenav font-tajawal  overflow-x-hidden sticky duration-500 m-0  top-0 right-0 ${toggleButton === true ? "w-[60px]" : "w-[250px]"}`}>
      <div className={`md:font-[600] bg-slate-50/10   md:text-[14px] md:p-2 text-[#fff] mb-6 md:mb-8 text-lg p-2  m-0 text-center`}>
        {toggleButton === true ? <img src={image} alt= " text-[#ffff] " className={`block w-10 h-10 bg-transparent rounded-full`} /> : <div className='font-tajawal'>منظومة تحصيلات بنك جلال</div>}
      </div>


      <ul dir='rtl' className=''>
        <li
          className={`flex   md:gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 0 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51] " : "text-[#ffff] "
            }`}
          onClick={() => handleClick(0)}
        >
          <MdOutlineReceipt className='  ms-5 text-[20px]' />
          <p className={` mx-5 font-bold ${toggleButton === true ? "hidden" :  "  "}`}> امور توريد  </p>
        </li>
        <li
          className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 1 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
            }`}
          onClick={() => handleClick(1)}
        >
          <FaMoneyBill className='  ms-5 text-[20px]' />
          <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}>المدفوعات</p>
        </li>
        {localStorage.getItem('role') !== 'SuperAdmin' && <>   <li
          className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 9 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
            }`}
          onClick={() => handleClick(9)}
          
        > 
          <RiSafeLine className='  ms-5 text-[20px]' />
          <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}>إغلاق الخزنه</p>
        </li></>}
     

        {
          (localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'SuperAdmin') && <>
            <li
              className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 2 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
                }`}
              onClick={() => handleClick(2)}
            >
              <FaChartSimple className={`  ms-5 text-[20px]    `} />
              <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}>تقارير الإغلاق</p>
            </li>
            <li
              className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 3 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
                }`}
              onClick={() => handleClick(3)}
            >
              <BsSafe2Fill className={`  ms-5 text-[20px]    `} />
              <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}> اضافة خزنه</p>
            </li>

            <li
              className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 4 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
                }`}
              onClick={() => handleClick(4)}
            >
              <RiSafe2Fill className={`  ms-5 text-[20px]    `} />
              <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}>عرض الخزن</p>
            </li>

            <li
              className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 5 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
                }`}
              onClick={() => handleClick(5)}
            >
              <FaFileContract className={`  ms-5 text-[20px]    `} />
              <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}> اضافة تعاقد</p>
            </li>
            <li
              className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 6 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
                }`}
              onClick={() => handleClick(6)}
            >
              <RiContractLine className={`  ms-5 text-[20px]    `} />
              <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}> عرض التعاقدات</p>
            </li>
            

          </>
        }
        {localStorage.getItem('role') === 'SuperAdmin' && <><li
              className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 7 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
                }`}
              onClick={() => handleClick(7)}
            >
              <FaUserPlus className={`  ms-5 text-[20px]    `} />
              <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}> اضافة مستخدم</p>
            </li>
            <li
          className={`flex   gap-5 items-center my-3 duration-300 hover:bg-[#6b6b6b] hover:py-2 transition-[2s] ${activeIndex === 8 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51]" :  " text-[#ffff] "
            }`}
          onClick={() => handleClick(8)}
        >
          <FaUsersLine className={`  ms-5 text-[20px]    `} />
          <p className={`font-bold ${toggleButton === true ? "hidden" :  "  "}`}>عرض المستخدمين</p>
        </li></> }


      </ul>
    </nav>



  )
}
