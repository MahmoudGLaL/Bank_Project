import React, { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { authcontext } from '../../Context/authcontext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';



export default function AddContract() {

 let  {addContract} = useContext(authcontext)




    // console.log(selectedOption);
    // console.log(selectedOption);
                                                                                                                                                                                                                                                                                                      
const initialValues = {
    name : '',
    discount : ''
    // password : '',
    // role: ""
};



    let formik = useFormik({
        initialValues,
        onSubmit: (values,actions) => {
            addContract(values )
            actions.resetForm()
        } 
            
          

        
})
  return (
    <div dir='rtl' className='font-tajawal bg-[#e7e7e7]'>
<form className="my-form" onSubmit={formik.handleSubmit}  >
  <div className="flex justify-center items-center  ">
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-20  text-right min-w-[35%] flex flex-col  justify-start my-44">
      <h2 className="text-xl font-semibold  mb-12 text-gray-800 text-center">اضافة تعاقد</h2>



      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#c59025]">اسم التعاقد</label>
        <input
          id="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
          className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-medium"
          type="text"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="discount" className="block text-sm font-semibold mb-2 text-[#c59025]"> نسبة الخصم</label>
        <input
          id="discount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="discount"
          className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-medium"
          type="number"
          step='0.1'
          required
        />
      </div>

{/* 
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-semibold mb-2 text-[#c59025]">الرقم السرى</label>
        <div className="relative">
          <input
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#026c48] transition duration-200 ease-in-out font-medium text-lg"
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


