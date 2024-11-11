import React, { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
import { authcontext } from '../../../Context/authcontext';


export default function ChoseSafe() {

 let  {AllTreasuries , getAllTreasuries} = useContext(authcontext)


    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
      getAllTreasuries()
    }, [])



    const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
      
    };
    // console.log(selectedOption);
    // console.log(selectedOption);
                                                                                                                                                                                                                                                                                                      
const initialValues = {
    treasuryId : '',
    amount: ""
};



  
    // showPassword

    let formik = useFormik({
        initialValues,
        onSubmit: (values,actions) => {
            // addRole(values)
            values.treasuryId = selectedOption
            // console.log(values);
            
            // navigate(`/penalties/${values.treasuryId}`)
            actions.resetForm()
        } 
            
          

        
})
  return (
    <div dir='rtl' className='font-tajawal bg-[#e7e7e7]'>
<form className="my-form" onSubmit={formik.handleSubmit}  >
  <div className="font-tajawal flex justify-center items-center h-[93vh]  ">

    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg px-10 py-5  text-right min-w-[35%] flex flex-col  justify-start ">
    <div>
    <p className="text-lg font-semibold animate-fadeInOut mb-5 ">
      أهلا بك يا مستر "{localStorage.getItem("user")}"
    </p>
    </div>


      <div className="mb-4">
        {/* <label htmlFor="role" className="block text-lg font-semibold mb-2 text-[#285042]"> اختر الخزينه</label> */}
          <select
                id="treasuryId"
                name='treasuryId'
                value={selectedOption}
                onBlur={formik.handleBlur}
                onChange={handleDropdownChange}
                className="block w-full bg-white border  mb-2 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#026c48] transition duration-200 ease-in-out text-lg font-bold"
                required
              >
              <option value="" className='font-bold'> اختر الخزنه </option>
                {AllTreasuries ? AllTreasuries.map((safe) => (<>
                  <option value={safe.treasuryId} className='font-bold'>{safe.treasuryName}</option>
                </>)) : <option className='font-bold'>لايوجد</option>}
              </select>

      </div>
      <div className=" text-right mb-4 ">
 
              <div class="relative flex items-center  ">
                <input name="amount" id='amount' type="text"

                  className="block w-full bg-white border  mb-2 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#026c48] transition duration-200 ease-in-out text-lg font-bold" placeholder="المبلغ الحالي " />

              </div>
            </div>

     

      <button
        type="submit"
        className="w-full bg-[#026c48] hover:bg-[#207458]  text-white font-bold py-3 px-6 rounded-lg mt-1 transition duration-200 ease-in-out transform hover:scale-105"
      >
        تأكيد
      </button>
      <ToastContainer />
    </div>
  </div>
</form>


      
    </div>
  )
}


