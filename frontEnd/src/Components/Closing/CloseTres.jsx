import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import tres_icon from '../../assests/treasury.png'
import { useContext } from 'react';
import { authcontext } from '../../Context/authcontext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CloseTres = () => {
    const [balance, setBalance] = useState('');
    const [time, setTime] = useState('');
    let [toggle, setToggle] = useState(false)

    let { CloseTreasury ,TreasuryData, getTreasury } = useContext(authcontext)

    const navigate = useNavigate()

    useEffect(() => {
        getTreasury(localStorage.getItem('tres_id'))
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleNav = () => {
        if (balance !== '') {
            CloseTreasury(parseInt(localStorage.getItem('tres_id')), {
                userId: parseInt(localStorage.getItem('id')),
                treasuryId: parseInt(localStorage.getItem('tres_id')),
                endBalance: balance,
                endAt: time
            }, navigate)
            localStorage.setItem('activeIndex' , 0)

        }
        else {
            toast.error("من فضلك ادخل المبلغ الحالي بالخزنه")
        }



    }

    return (
        <div dir='rtl' className='flex justify-center items-center mt-44 font-tajawal '>
            <div className='bg-white w-[50%] border-[0.1px] my-[20px] px-5 flex justify-center items-center flex-col shadow-md '>
                <div className='m-auto'>
                    <img src={tres_icon} className='w-100 h-100' alt="" />
                </div>
                {
                    TreasuryData.isSelected === true &&  <div className='w-48 mb-6   '>
                    <button
                        type="submit"
                        onClick={() => { setToggle(true) }}
                        className="w-full  bg-[#c29231] hover:bg-[#f0ba4e]  text-white font-bold py-3 px-6 rounded-lg mt-8 transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        إغلاق الخزنه
                    </button>
                </div>
                }
               
            </div>

            {toggle && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle ? '' : 'animate-swal2hide'} `}  ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                    <form className="my-form"  >
                        <div className="font-tajawal flex justify-center items-center h-[93vh]  ">

                            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg px-10 py-5  text-right min-w-[35%] flex flex-col  justify-start ">
                                <div>
                                    {/* <p className="text-lg font-semibold animate-fadeInOut mb-5 ">
                     هل انت متأكد يا مستر "{localStorage.getItem("user")}" انك تريد 
                  </p> */}
                                </div>



                                <div className=" text-right mb-4 ">

                                    <div class="relative flex items-center  ">
                                        <input name="amount" id='amount' type="text"
                                            value={balance}
                                            required
                                            onChange={(e) => { setBalance(e.target.value) }}
                                            className="block w-full bg-white border text-center  mb-2 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0bb51] transition duration-200 ease-in-out text-lg font-bold" placeholder="ادخل المبلغ الحالي بالخزنه" />

                                    </div>
                                </div>
                                <div className=" text-right mb-4 ">

                                    <div class="relative flex items-center  ">
                                        <input name="time" id='time' type="text"
                                            value={time}
                                            readOnly
                                            // onChange={(e) => { setTime(e.target.value) }}
                                            className="block w-full bg-white border text-center  mb-2 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0bb51] transition duration-200 ease-in-out text-lg font-bold"  />

                                    </div>
                                </div>



                                <button
                                    type="button"
                                    onClick={() => { setToggle(false) }}

                                    className="w-full mb-4 bg-gray-400 hover:bg-gray-500  text-white font-bold py-3 px-6 rounded-lg mt-1 transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNav}
                                    className="w-full bg-[#c59025] hover:bg-[#f0bb51]  text-white font-bold py-3 px-6 rounded-lg mt-1 transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    تأكيد
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>}

        <ToastContainer />
        </div>
    )
}

export default CloseTres