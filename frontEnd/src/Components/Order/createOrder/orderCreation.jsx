// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFloppyDisk, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FaFloppyDisk } from "react-icons/fa6";

import { FaCheck } from "react-icons/fa6";
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useFormik } from 'formik'
import { OrderSchema } from '../../Schema/ordersScema'
import { useContext } from 'react'
import { authcontext } from '../../../Context/authcontext'
import moment from "moment";
import { useEffect } from "react";
import image from '../../../assests/bank-building.png'
// import image from '../../../images/logo3.jpg'


const OrderCreation = () => {

    let [toggle, setToggle] = useState(false)
    let [enroll, setEnroll] = useState(false)
    let [contract_id, setContract_id] = useState("")
    let [contract_Name, setContract_Name] = useState("")
    let [discount, setDiscount] = useState("")
    let [amount, setAmount] = useState("")
    let [AfterDiscount, setAfterDiscount] = useState("")
    
    let { addOrder, Req_Data, getContract, AllContracts, TreasuryData, getTreasury } = useContext(authcontext)
    const [today, setToday] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const { id } = useParams()
    let status = 0
    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        setToday(`${year}-${month}-${day}`);
        getContract()
        if (id) {
            getTreasury(id)
        }
    }, [])

    const initialValues = {

        nationalId: "",
        organization: "",
        contractId: "",
        name: "",
        phoneNumber: "",
        amount: "",
        discount: "0",
        amountWithDiscount: "",
        status: 0,
        treasuryId: parseInt(id),
        userId: parseInt(localStorage.getItem("id"))
    }


    const navigate = useNavigate()

    const handlePrint = () => {
        const today = new Date();
        const day = new Intl.DateTimeFormat('ar-EG', { day: 'numeric' }).format(today);
        const month = new Intl.DateTimeFormat('ar-EG', { month: 'numeric' }).format(today);
        const year = new Intl.DateTimeFormat('ar-EG', { year: 'numeric' }).format(today);

        const formattedDate = `${day} /${year}/${month}`;
        moment.locale('ar');
        // <div style=" font-family: 'Tajawal', sans-serif; font-size: 1.25rem; text-align: right; line-height: 30px;">

    //     <style>
    //     /* Import the font if it's a web font */
    //     @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

    //     /* Apply global font-family if needed */
    //     body {
    //         font-family: 'Tajawal', sans-serif;
    //     }
    // </style>
        let content = ``
        const img = new Image();
        img.src = image;
        img.onload = () =>   {
            if (Req_Data?.discount > 0) {
                content = `<div>
               <style>
               </style>
                   <div>
                       <div style=" display: flex; justify-content: space-between; align-items: center; padding: 2rem 2.5rem;">
                           <div style="padding: 1.25rem; display: flex; justify-content: center; align-items: center;">
                               <img src="${image}" style="width: 100px; height: 100px;" alt="" />
                           </div>
                           <div style="font-size: 1.25rem; text-align: right; line-height: 30px;">
                             <div>بنك</div>
                               <div style="margin-top: 0.25rem;">التاريخ: <span id="formattedDate">${formattedDate}</span></div>
                           </div>
                       </div>
                       <div style="display: flex; justify-content: center; align-items: center; font-size: 1.7rem ; font-weight : bold ; "> <span style = 'padding : 5px;  border-bottom: 1px dotted black;'> خزنة  ${TreasuryData.treasuryName} </span> </div>
                       <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 0.75rem 2.5rem;">
                           <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                               <tbody>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الاسم</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${Req_Data?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الرقم القومي</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${Req_Data?.nationalId}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">رقم امر التوريد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${Req_Data?.id}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">اسم المنشئ</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${Req_Data?.user?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">تاريخ الأنشاء</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${Req_Data?.createdAt.slice(0, 10)}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع المدفوعة</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${Req_Data?.organization}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع التعاقد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${contract_Name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> نسبة الخصم</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${Req_Data?.discount} %</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">المبلغ المطلوب</td>
                                       <td style="font-family:  sans-serif; display: flex; justify-content : center ; gap : 10px ;  border: 1px solid #e2e8f0; padding: 0.5rem;" id="amount"><span>${Req_Data.amountWithDiscount} ج</span> <span style=" text-decoration:  line-through ;text-decoration-color: gray; text-decoration-thickness: 1px;">${Req_Data.amount} ج</span></td>
                                   </tr>
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>`
           }
           else {
               content = `<div>
             
                   <div>
                       <div style="display: flex; justify-content: space-between; align-items: center; padding: 2rem 2.5rem;">
                           <div style="padding: 1.25rem; display: flex; justify-content: center; align-items: center;">
                               <img src="${image}" style="width: 100px; height: 100px;" alt="" />
                           </div>
                         <div style="font-size: 1.25rem; text-align: right; line-height: 30px;">
                               <div>بنك</div>
                               <div style="margin-top: 0.25rem;">التاريخ: <span id="formattedDate">${formattedDate}</span></div>
                           </div>
                       </div>
                       </div>
                       <div style="display: flex; justify-content: center; align-items: center; font-size: 1.7rem ; font-weight : bold ; "> <span style = 'padding : 5px;  border-bottom: 1px dotted black;'> خزنة  ${TreasuryData.treasuryName} </span> </div>
                       <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 0.75rem 2.5rem;">
                           <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                               <tbody>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الاسم</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${Req_Data?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الرقم القومي</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${Req_Data?.nationalId}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">رقم امر التوريد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${Req_Data?.id}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">اسم المنشئ</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${Req_Data?.user?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">تاريخ الأنشاء</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${Req_Data?.createdAt.slice(0, 10)}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع المدفوعة</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${Req_Data?.organization}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">المبلغ المطلوب</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="amount">${Req_Data?.amount}</td>
                                   </tr>
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>`     
           }
           const iframe = document.createElement('iframe');
           iframe.style.display = 'none';
           document.body.appendChild(iframe);
   
           // Write content to the iframe
           const iframeDoc = iframe.contentWindow.document;
           iframeDoc.open();
           iframeDoc.write(content);
           iframeDoc.close();
   
           // Call the print function
           iframe.contentWindow.print();
   
           // Remove the iframe after printing
           setTimeout(() => {
               document.body.removeChild(iframe);
           }, 1000); // You can adjust the delay as needed
        }
       

        // navigate(`/orderDetails/${Req_Data.id}`)

    }


    const handlesetToggle = (id) => {

        setToggle(false)
        navigate(`/orderDetails/${id}`)
    }

    const handleSelect = (e) => {
        const { name, value } = e.target
        setAmount('')
        if (name === 'organization') {
            if (value === 'تعاقد') {
                setEnroll(true)
            }
            else {
                setEnroll(false)
            }
            values.organization = value
        }
        else {
            const [id, discount, contract] = value.split('|');
            // console.log('Selected ID:', id);
            // console.log('Selected Discount:', discount);
            setContract_id(id)
            setContract_Name(contract)
            setDiscount(discount)
        }


    }

    const handleCalc = (e) => {
        // parseInt(e.target.value)
        setAmount(e.target.value)
        let myDiscount = e.target.value * discount / 100
        // console.log(myDiscount);

        setAfterDiscount(e.target.value - myDiscount)
        if (e.target.value - myDiscount < 1) {
            setAfterDiscount("0")
        }
    }


    const handleSure = (id) => {
        navigate("/penalties")
    }

    const handleError = (e) => {
        e.preventDefault()
        toast.error(" من فضلك تأكد من صحة جميع البيانات ")
    }

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues,
        validationSchema: OrderSchema,
        onSubmit: async (values, action) => {
            setIsLoading(true)
            if (AfterDiscount == amount) {
                values.amount = amount

                status = addOrder({
                    nationalId: values.nationalId,
                    organization: values.organization,
                    name: values.name,
                    phoneNumber: values.phoneNumber,
                    amount: values.amount,
                    discount: 0,
                    amountWithDiscount: values.amount,
                    status: values.status,
                    userId: values.userId,
                    treasuryId: values.treasuryId
                })
            }
            else {
                values.amount = amount
                values.contractId = contract_id
                values.discount = discount
                values.amountWithDiscount = AfterDiscount
                status = addOrder(values)
            }

            status.then((value) => {
                if (value <= 202) {
                    setTimeout(() => {
                        setToggle(true)
                        setIsLoading(false)
                    }, [2000])
                }
                else {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, [1000])
                }

            })



            // }
            // action.resetForm()
        }
    })

    return (
        <div className=' font-tajawal flex justify-between items-start min-h-[100vh] bg-[#f3f3f4]' dir='rtl'>



            <form className='  w-100 grow  flex flex-col gap-5' onSubmit={isValid ? handleSubmit : handleError} >

                <div className='bg-white flex flex-col justify-start items-start text-right py-4 '>
                    <h1 className='px-10  text-[28px] md:text-[21px]  lg:text-[24px] xl:text-[27px]  '>إنشاء أمر التوريد</h1>
                    <p className='px-10 py-0 text-base font-bold text-[#ebb344] '>  {TreasuryData?.treasuryName ? TreasuryData?.treasuryName : ''}/<span className='text-gray-500 font-bold'> امر توريد جديد</span> </p>
                </div>


                <div className='bg-white flex justify-start items-center py-4 w-[96.5%] m-auto gap-8'>

                    <div className="grid gap-2 justify-start items-start grid-cols-4 w-full">
                        {/* <div className=" text-right mx-6 ">
                            <label htmlFor="order" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  رقم امر التوريد * : </label>
                            <div class="relative flex items-center  ">
                                <input name="order" id='order' type="text" disabled className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-gray-100 border   focus:border-[#ebb344] px-4 py-2 rounded-md outline-none  border-gray-300" />

                            </div>
                        </div> */}


                        {/* <div className=" text-right mx-6 ">
                            <label htmlFor="organization" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '> المؤسسه والفرع * : </label>
                            <div class="relative flex items-center  ">
                                <select name="organization" 
                                id='organization' type="text" 
                                required 
                                onChange={handleChange} 
                                value={values.organization}
                                onBlur={handleBlur}
                                className="w-full font-bold text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] box-content text-gray-800 bg-white border   focus:border-[#ebb344] px-4 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                                    <option value="" className='font-bold'>   اختر المؤسسه</option>
                                    <option value="البنك الأهلي " className='font-bold'>   البنك الأهلي </option>
                                    <option value="بنك مصر " className='font-bold'> بنك مصر </option>
                                  
                                </select>

                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                    {errors.organization && touched.organization && <p className='form-error'>{errors.organization}</p>}
                            </div>
                        </div> */}

                        <div className=" text-right mx-6 ">
                            <label htmlFor="organization" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  المؤسسه والفرع   * : </label>
                            <div class="relative flex items-center  ">
                                <select name="organization" id='organization'
                                    type="text"
                                    onChange={handleSelect}
                                    onBlur={handleBlur}
                                    required
                                    className="w-full font-bold text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] box-content text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                                    <option value="" className='font-bold'> اختر نوع المدفوعه </option>
                                    <option value="خاص" className='font-bold'> خاص </option>
                                    <option value="تعاقد" className='font-bold'> تعاقد </option>
                                </select>

                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                {errors.organization && touched.organization && <p className='form-error'>{errors.organization}</p>}
                            </div>
                        </div>

                        {enroll && <div className=" text-right mx-6 ">
                            <label htmlFor="contractId" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '> نوع التعاقد * : </label>
                            <div class="relative flex items-center  ">
                                <select name="contractId" id='contractId'
                                    type="text"
                                    onChange={handleSelect}
                                    onBlur={handleBlur}
                                    required
                                    className="w-full font-bold text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] box-content text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                                    <option value="" className='font-bold'> اختر نوع التعاقد </option>
                                    {AllContracts ? AllContracts.map((cont) => (<>
                                        <option key={cont.id} value={`${cont.id}|${cont.discount}|${cont.name}`} className='font-bold'>{cont.name}</option>
                                    </>)) : <option className='font-bold'>لايوجد</option>}

                                </select>

                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                {errors.AgreeType && touched.AgreeType && <p className='form-error'>{errors.AgreeType}</p>}
                            </div>
                        </div>}


                        <div className=" text-right mx-6 w-[95.8%]">
                            <div className="flex justify-between items-center w-full gap-2   ">
                                <div className="w-[90%]">
                                    <label htmlFor="amount" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  المبلغ المطلوب* :  </label>
                                    <div class="relative flex items-center  ">
                                        <input name="amount" id='amount'
                                            onChange={handleCalc}
                                            value={amount}
                                            onBlur={handleBlur}
                                            type="text"
                                            required className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="0  " />

                                    </div>

                                </div>
                                {
                                    enroll && <div className=" text-right   ">
                                        <label htmlFor="discount" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>   نسبة الخصم*   </label>
                                        <div class="relative flex items-center  ">
                                            <input name="discount" id='discount'
                                                onChange={handleChange}
                                                value={discount ? discount + ' %' : ''}
                                                onBlur={handleBlur}
                                                type="text" required className="w-[70%] text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]   text-gray-800 bg-white border   focus:border-[#ebb344] px-4 py-2  rounded-md outline-none  border-gray-300" placeholder="0" />

                                        </div>

                                    </div>
                                }

                            </div>

                        </div>
                        {enroll && <div className=" text-right mx-6 ">
                            <label htmlFor="amountWithDiscount" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>   المبلغ بعد الخصم * :  </label>
                            <div class="relative flex items-center  ">
                                <input name="amountWithDiscount" id='amountWithDiscount'
                                    value={AfterDiscount}
                                    onBlur={handleBlur}
                                    disabled
                                    step='01'
                                    type="number" className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="0" />

                            </div>

                        </div>}
                        {!enroll && <div></div>}
                        {!enroll && <div></div>}

                        <div className=" text-right mx-6 ">
                            <label htmlFor="name" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  الأسم * : </label>
                            <div class="relative flex items-center  ">
                                <input name="name" id='name' type="text"
                                    onChange={handleChange}
                                    value={values.name}
                                    onBlur={handleBlur}
                                    required className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none font-bold border-gray-300" placeholder="الأسم" />
                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                {errors.name && touched.name && <p className='form-error'>{errors.name}</p>}
                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="nationalId" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  الرقم القومي * : </label>
                            <div class="relative flex items-center  ">
                                <input name="nationalId"
                                    onChange={handleChange}
                                    value={values.nationalId}
                                    onBlur={handleBlur}
                                    id='nationalId' type="text" maxLength={14} required className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="الرقم القومي" />
                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                {errors.nationalId && touched.nationalId && <p className='form-error'>{errors.nationalId}</p>}
                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="createdAt" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  تاريخ الإنشاء * : </label>
                            <div class="relative flex items-center  ">
                                <input
                                    onChange={handleChange}
                                    value={today}
                                    disabled
                                    onBlur={handleBlur}
                                    type="date" required className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none border-gray-500" placeholder="التاريخ" />

                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                {errors.createdAt && touched.createdAt && <p className='form-error'>{errors.createdAt}</p>}
                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            {/* <label htmlFor="installment" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '> عدد الأقساط * : </label>
                            <div class="relative flex items-center  ">
                                <input name="installment" id='installment' type="text"
                                    onChange={handleChange}
                                    value={values.installment}
                                    onBlur={handleBlur}
                                    disabled className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-gray-100 border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder='0' />
                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                {errors.installment && touched.installment && <p className='form-error'>{errors.installment}</p>}
                            </div> */}
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="phoneNumber" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  رقم الهاتف* :  </label>
                            <div class="relative flex items-center  ">
                                <input name="phoneNumber" id='phoneNumber'
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                    onBlur={handleBlur}
                                    maxLength={11} type="text" required className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="01*******" />

                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                {errors.phoneNumber && touched.phoneNumber && <p className='form-error'>{errors.phoneNumber}</p>}
                            </div>
                        </div>
                        {/* <div className=" text-right mx-6 ">
                            <label htmlFor="maturityDate" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  تاريخ الأنتهاء * : </label>
                            <div class="relative flex items-center  ">
                                <input
                                    // name="maturityDate" id='maturityDate' 
                                    type="date"
                                    onChange={handleChange}
                                    disabled
                                    value={today}
                                    onBlur={handleBlur}
                                    required className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-white border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none border-gray-500" placeholder="التاريخ" />
                            </div>
                            <div className="text-red-700 font-bold text-xs lg:text-[9px] md:text-[6px]  xl:text-[12px] ">
                                {errors.maturityDate && touched.maturityDate && <p className='form-error'>{errors.maturityDate}</p>}
                            </div>
                        </div> */}
                        <div className=" text-right mx-6 ">
                            <label htmlFor="order" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>   رقم امر التوريد * : </label>
                            <div class="relative flex items-center  ">
                                <input type="text"

                                    disabled className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-gray-40 border   focus:border-[#ebb344] px-2 py-2 rounded-md outline-none  border-gray-300" />

                            </div>
                        </div>
                        <div></div>
                        {/* <div className=" text-right mx-6  col-span-2">
                            <label htmlFor="order" className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] font-bold text-gray-700  '>  تفاصيل المدفوعه  : </label>
                            <div class="relative flex items-center  ">
                                <textarea  type="date" className="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px]  text-gray-800 bg-white border   focus:border-[#ebb344] px-4 py-2 rounded-md outline-none border-gray-500" placeholder="303" />

                            </div>
                        </div> */}








                    </div>



                </div>
                <div className=" flex text-right mx-8 mt-10 gap-5 ">
                    <button type='submit' className='border text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] py-1 px-2 flex justify-center items-center font-semibold text-white bg-[#ebb344] hover:bg-[#ffc552] rounded-md ' >
                        {/* <FontAwesomeIcon icon={faFloppyDisk} className='text-white' /> */}
                        {isLoading ? <> <div class="flex justify-center items-center ">
                            <div class="w-4  border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-4"></div>
                        </div>
                        </> : <>
                            <FaFloppyDisk className='text-white ' />
                            <span className='px-1'>
                                حفظ
                            </span></>}


                    </button>
                    <button onClick={handleSure} type='button' className='text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] p-2 border border-gray-400 rounded-md px-2 hover:bg-gray-300'>
                        إلغاء
                    </button>
                </div>
                <ToastContainer />

            </form>

            {toggle && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle ? '' : 'animate-swal2hide'} `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                    <div className="bg-white rounded shadow-lg py-10 px-44 text-center ">
                        <div className='flex flex-col justify-center items-center relative box-content text-center border-4 border-[#ebb344] rounded-full w-12 h-12 m-auto '>
                            {/* <FontAwesomeIcon icon={faCheck} className='text-[#ebb344] text-6xl' /> */}
                            <FaCheck className='text-[#ebb344] text-4xl' />
                        </div>
                        <h2 className="text-2xl font-bold mt-4 mb-4 text-gray-600">تم إنشاء امر التوريد بنجاح</h2>
                        <p className="mb-4 font-bold text-xl text-gray-800">رقم أمر التوريد </p>
                        <div className='text-[#ebb344] mb-8 font-bold text-4xl bg-gray-200 p-2  '>{Req_Data.id}</div>
                        <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mx-4 text-xl font-bold" onClick={() => handlesetToggle(Req_Data.id)}>تم</button>
                        <button className="bg-[#ebb344] hover:bg-[#cca048] text-white px-4 py-2 rounded mx-4 text-xl font-bold" onClick={handlePrint} >طباعه</button>
                    </div>
                </div> </>}
            {/* <div class="relative flex items-center">
            <input name="email" type="text" required class="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] text-gray-800 bg-white border-2   focus:border-[#1E2772] px-4 py-3 rounded-md outline-none" placeholder="Enter email" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
              <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
            </svg>
          </div>

          <div class="relative flex items-center">
            <input name="password" type="password" required class="w-full text-sm lg:text-[9px] md:text-[6px]  xl:text-[12px] text-gray-800 bg-white border-2   focus:border-[#1E2772] px-4 py-3 rounded-md outline-none" placeholder="Enter password" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
            </svg>
          </div> */}
        </div>
    )
}

export default OrderCreation