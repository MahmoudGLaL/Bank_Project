import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { FaCaretDown } from 'react-icons/fa6'

export default function Dropdown({ setPosCode }) {

  const [selectedValue, setSelectedValue] = useState("");



  const handleClear = () => {
    setSelectedValue("");
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    setPosCode(e.target.value)
  };
  return (
    <div>

      <div dir='rtl' className=" relative   flex justify-center items-center ">
        <div className=" relative   flex justify-center items-center ">
          <input type="text"  name="order" id='order' required className="w-[300px] text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#026c48]  py-1 rounded-md font-bold  outline-none  border-gray-600-200" placeholder="ادخل الرقم المرجعي"
            value={selectedValue}
            onChange={handleChange}
          />
        </div>
        {/* <select value={selectedValue} onChange={handleChange} name="order" id='order' type="text" required className="w-[300px] text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#026c48]  py-1 rounded-md  outline-none  border-gray-600-200" placeholder="رقم امر التوريد " >
                                    <option value="0" className='' selected>اخنر الماكينه</option>
                                    <option value="12" className=''>12</option>
                                    <option value="123" className=''>123 </option>
                                    <option value="1233" className=''>1233 </option>
                                    <option value="1244" className=''>1244 </option>
                                </select> */}



      </div>
    </div>
  )
}
