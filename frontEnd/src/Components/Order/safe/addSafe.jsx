import React, { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
import { authcontext } from '../../../Context/authcontext';


export default function AddSafe() {

  let { addTreasury, getAllTreasuries, AllTreasuries } = useContext(authcontext)
  let [subSafe, setSubSafe] = useState(false)
  let [myrender, setMyrender] = useState(false)
  let [TresuryId, setTresuryId] = useState("")

  useEffect(() => {
    getAllTreasuries()
  }, [myrender])


  const initialValues = {
    name: "",
    balance: 0,
    isSelected : false
  };

  const handleSelect = (e) => {
    const {name , value} = e.target
    if(name === 'subTresury')
    {
      if (value === 'true') {
        setSubSafe(true);
      }
      else {
        setSubSafe(false)
        setTresuryId("")
      }
    }
    else {
      setTresuryId(value)
    }
  };

  let formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      // values.treasuryId=parseInt(TresuryId)
      console.log(values);
      
      addTreasury(values)
      actions.resetForm()
      setMyrender(!myrender)
    }




  })
  return (
    <div dir='rtl' className='font-tajawal bg-[#e7e7e7]'>
      <form className="my-form" onSubmit={formik.handleSubmit}  >
        <div className="flex justify-center items-center  ">
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-20  text-right min-w-[35%] flex flex-col  justify-start my-48">
            <h2 className="text-xl font-semibold  mb-8 text-gray-800 text-center">اضافة خزنه</h2>



            <div className="mb-2">
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#c59025]">اسم الخزنه</label>
              <input
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0bb51] transition duration-200 ease-in-out text-lg font-medium"
                type="text"
                required

              />
            </div>
            {/* <div className=" mb-2">
              <label htmlFor="subTresury" className='block text-sm font-semibold mb-2 text-[#f0bb51] '>  الخزنه الرئيسيه لها  * : </label>
              <div class="relative flex items-center  ">
                <select name="subTresury" id='subTresury'
                  type="text"
                  required
                  onChange={handleSelect}
                  className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0bb51] transition duration-200 ease-in-out text-lg font-medium" placeholder="رقم امر التوريد " >
                  <option value="false" className='font-bold'> لايوجد </option>
                  <option value="true" className='font-bold'> يوجد </option>

                </select>

              </div>

            </div> */}

            {subSafe && <div className=" mb-2">
              <label htmlFor="treasuryId" className='block text-sm font-semibold mb-2 text-[#c59025] '> اسم الخزنه الفرعيه  * : </label>
              <select name="treasuryId" id='treasuryId'
                type="text"
                onChange={handleSelect}
                required
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0bb51] transition duration-200 ease-in-out text-lg font-medium">
                <option value="" className='font-bold'> اختر الخزنه </option>
                {AllTreasuries ? AllTreasuries.map((safe) => (<>
                  <option value={safe.treasuryId} className='font-bold'>{safe.treasuryName}</option>
                </>)) : <option className='font-bold'>لايوجد</option>}

              </select>
            </div>}
            <div className="mb-2">
              <label htmlFor="balance" className="block text-sm font-semibold mb-2 text-[#c59025]"> الميزانيه</label>
              <input
                id="balance"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.balance}
                name="balance"
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0bb51] transition duration-200 ease-in-out text-lg font-medium"
                type="number"
                step='0.01'
                required

              />
            </div>
            {/* <div className="mb-2">
        <label htmlFor="safeName" className="block text-sm font-semibold mb-2 text-[#f0bb51]">وصف الخزنه</label>
        <textarea
          id="safeName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="safeName"
          className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f0bb51] transition duration-200 ease-in-out text-lg font-medium"

          required
        />
      </div> */}
            {/* 
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-semibold mb-2 text-[#f0bb51]">الرقم السرى</label>
        <div className="relative">
          <input
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f0bb51] transition duration-200 ease-in-out font-medium text-lg"
            type={passwordVisible ? "text" : "password"}
            onKeyDown={() => handleKeyDown(formik.values.password)}
            onKeyUp={() => handleKeyUp(formik.values.password)}
            required
          />
          <span
            className="absolute text-left left-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200 ease-in-out"
            onClick={showPassword}
          >

          
          </span>
        </div>
      </div> */}

            <button
              type="submit"
              className="w-full bg-[#c59025] hover:bg-[#f0bb51]  text-white font-bold py-3 px-6 rounded-lg mt-8 transition duration-200 ease-in-out transform hover:scale-105"
            >
              أضافة
            </button>
            <ToastContainer />
          </div>
        </div>
      </form>



    </div>
  )
}


