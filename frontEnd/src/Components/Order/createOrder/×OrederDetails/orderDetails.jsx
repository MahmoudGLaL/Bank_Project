
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import {  ToastContainer } from 'react-toastify'
import { authcontext } from '../../../../Context/authcontext'
import { FaCheck } from "react-icons/fa6";
import axios from 'axios';
import Dropdown from '../../../../utils/Dropdown';
import { RiPaypalLine } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import moment from 'moment/moment';
// import image from '../../../../assests/bank-building.png'
import image from '../../../../images/logo3.jpg'



const OrderDetails = () => {
    let [toggle1, setToggle1] = useState(false)
    let [toggle2, setToggle2] = useState(false)
    let [toggle3, setToggle3] = useState(false)
    let [toggle, setToggle] = useState(false)
    let [ResNum, setResNum] = useState(false)
    let { getReq, Req_Details, CancelReq, getTreasury, TreasuryData } = useContext(authcontext)

    let [posCode, setPosCode] = useState('')
    let [error, setError] = useState(false)
    let [PayDesc, setPayDesc] = useState("")
    let [Loading1, setIsLoading1] = useState(false)
    let [Loading2, setIsLoading2] = useState(false)



    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            getReq(id)
        }
        getTreasury(localStorage.getItem('tres_id'))
    }, [])


    const handlesetToggle = (e) => {
        setToggle(false)
    }
    const handleSure = (id) => {
        setToggle(false)
        CancelReq(id)
        navigate("/penalties")
    }
    const handleOK = () => {
        setToggle3(false)
        navigate("/transactions")
    }

    const handlePrint = (data) => {
        const today = new Date();
        const day = new Intl.DateTimeFormat('ar-EG', { day: 'numeric' }).format(today);
        const month = new Intl.DateTimeFormat('ar-EG', { month: 'numeric' }).format(today);
        const year = new Intl.DateTimeFormat('ar-EG', { year: 'numeric' }).format(today);
   

        const formattedDate = `${day} /${year}/${month}`;
        moment.locale('ar');
        let content = ``
        const img = new Image();
        img.src = image;
        img.onload = () =>   { 
            if (Req_Details?.discount > 0) {
                content = `<div>
   
                   <div>
                       <div style="display: flex; justify-content: space-between; align-items: center; padding: 2rem 2.5rem;">
                           <div style="padding: 1.25rem; display: flex; justify-content: center; align-items: center;">
                               <img src="${image}" style="width: 100px; height: 100px;" alt="" />
                           </div>
                            <div style="font-size: 1.25rem; text-align: right; line-height: 30px;">
                               <div>وزاره الدفاع</div>
                                  <div>مركز الطب الطبيعي و التأهيلي</div>
                                  <div>وعلاج الروماتيزم ق.م</div>
                                  <div style="margin-top: 0.25rem;">التاريخ: <span id="formattedDate">${formattedDate}</span></div>
                              </div>
                          <div style="display: flex; justify-content: center; align-items: center; font-size: 1.7rem ; font-weight : bold ; "> <span style = 'padding : 5px;  border-bottom: 1px dotted black;'> خزنة  ${TreasuryData.treasuryName} </span> </div>
                       </div>
                       <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 0.75rem 2.5rem;">
                           <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                               <tbody>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الاسم</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${data?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الرقم القومي</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${data?.nationalId}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">رقم امر التوريد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${data?.id}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">اسم المنشئ</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${data?.user?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">تاريخ الأنشاء</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${data?.createdAt.slice(0, 10)}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع المدفوعة</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${data?.organization}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع التعاقد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${data?.contract?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> نسبة الخصم</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${data?.contract?.discount} %</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">المبلغ المطلوب</td>
                                       <td style="font-family:  sans-serif; display: flex; justify-content : center ; gap : 10px ;  border: 1px solid #e2e8f0; padding: 0.5rem;" id="amount"><span>${data.amountWithDiscount} ج</span> <span style=" text-decoration:  line-through ;text-decoration-color: gray; text-decoration-thickness: 1px;">${data.amount} ج</span></td>
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
                         div style="font-size: 1.25rem; text-align: right; line-height: 30px;">
                               <div>وزاره الدفاع</div>
                                  <div>مركز الطب الطبيعي و التأهيلي</div>
                                  <div>وعلاج الروماتيزم ق.م</div>
                                  <div style="margin-top: 0.25rem;">التاريخ: <span id="formattedDate">${formattedDate}</span></div>
                              </div>
                       </div>
                       <div style="display: flex; justify-content: center; align-items: center; font-size: 1.7rem ; font-weight : bold ; "> <span style = 'padding : 5px;  border-bottom: 1px dotted black;'> خزنة  ${TreasuryData.treasuryName} </span> </div>
                           <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                               <tbody>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الاسم</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${data?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الرقم القومي</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${data?.nationalId}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">رقم امر التوريد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${data?.id}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">اسم المنشئ</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${data?.user?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">تاريخ الأنشاء</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${data?.createdAt.slice(0, 10)}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع المدفوعة</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${data?.organization}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">المبلغ المطلوب</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="amount">${data?.amount}</td>
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
        


    }

    let handleClick = (e) => {
        e.preventDefault()

        setToggle1(true)

    }

    let handlePayCard = async (e) => {
        await axios.post(`https://localhost:44365/api/Payments/${localStorage.getItem('id')}`, { referenceNumber: posCode, paymentType: 'فيزا', requisitionId: Req_Details.id, description: PayDesc }).then(res => {

            setResNum(res.data.paymentReceiptNumber)
            setToggle1(false)
            setToggle3(true)

        }).catch(err => {
            console.log(err);

        })


    }
    let handlePayCash = async (e) => {
        await axios.post(`https://localhost:44365/api/Payments/${localStorage.getItem('id')}`, { referenceNumber: "", paymentWay: 'كاش', requisitionId: Req_Details.id, description: PayDesc }).then(res => {
            setResNum(res.data.paymentReceiptNumber)
            setToggle2(false)
            setToggle3(true)

        }).catch(err => {
            console.log(err);
        })

    }


    let handleSubmit = async () => {



        if (toggle1) {

            // console.log({ pCode, paymentReceiptNumber: Req_Details.amount.toString(), paymentWay: Req_Details.paymentType, requisitionId: Req_Details.id });
            if (posCode !== '') {
                setIsLoading1(true)
                setTimeout(() => {
                    handlePayCard()
                    setIsLoading1(false)
                }, [1000])

            }
            else {
                // toast.error("من فضلك ادخل الرقم المرجعي ")
                setError(true)
            }

        }
        else {
            setIsLoading2(true)
            setTimeout(() => {
                handlePayCash()
                setIsLoading2(false)
            }, [1000])
            // console.log({ pCode, paymentReceiptNumber: Req_Details.amount.toString(), paymentWay: Req_Details.paymentType, requisitionId: Req_Details.id });

        }





    }
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //   });

    return (
        <div dir='rtl' className=' min-h-[100vh] bg-[#f3f3f4]'>

            <form className=' font-tajawal  w-100 grow  flex flex-col gap-5'>

                <div className='bg-white flex flex-col justify-start items-start text-right py-4 px-2 lg:px-3 '>
                    <h1 className='px-6 lg:px-2 text-[28px] text-[rgb(103 106 108 /1)] font-semi-bold  '>تفاصيل أمر التوريد</h1>
                    <p className='px-6 lg:px-2 py-0 text-base font-medium '>  أوامر التوريد /<span className='text-gray-500 font-bold'> تفاصيل امر التوريد </span> </p>
                </div>



                <div className='bg-white flex justify-start items-center flex-col py-4 w-[96.5%] m-auto '>
                    <div className=' bg-white flex justify-between items-center  w-[96.5%] m-auto mb-2'>
                        <h1 className=' my-auto text-xl  '>تفاصيل أمر التوريد</h1>
                        <div className=' font-bold flex '>
                            {Req_Details?.status === 0 &&


                                <button type="button" className='border text-xs py-2 px-2 flex justify-center items-center text-white bg-[#ed5565] rounded-lg hover:bg-[#f54658] ' onClick={() => setToggle(true)}>
                                    <span className='px-2'>
                                        إلغاء الأمر
                                    </span>
                                </button>
                            }
                            <button onClick={() => handlePrint(Req_Details)} type='button' className='border text-xs py-2 px-2 flex justify-center items-center mx-3  text-gray-500 rounded-lg hover:bg-[#f8f8f8]'>
                                <span className='px-1' >
                                    طباعة

                                </span>
                            </button>
                        </div>


                    </div>

                    <span className='w-full h-1  border-b border-dotted border-gray-200'></span>

                    <div className="grid gap-2 justify-start items-start grid-cols-4 w-full py-4">
                        <div className=" text-right mx-6 ">
                            <label htmlFor="id" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  رقم امر التوريد * : </label>
                            <div class="relative flex items-center  ">
                                <input name="id" id='id' type="text"
                                    value={Req_Details?.id}
                                    disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="organization" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> المؤسسه والفرع * : </label>
                            <div class="relative flex items-center  ">
                                <input name="organization" id='organization' type="text"
                                    value={Req_Details?.organization}
                                    disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                            </div>
                        </div>
                        {Req_Details?.amountWithDiscount === Req_Details?.amount &&
                            <div className=" text-right mx-6 ">
                                <label htmlFor="amount" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  المبلغ المطلوب* :  </label>
                                <div class="relative flex items-center  ">
                                    <input name="amount" id='amount' type="number"
                                        value={Req_Details?.amount}
                                        className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100     focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="0  " />

                                </div>
                            </div>
                        }
                        {Req_Details?.amountWithDiscount !== Req_Details?.amount && <div></div>}
                        <div></div>



                        {Req_Details?.amountWithDiscount !== Req_Details?.amount &&
                            <>
                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> نوع التعاقد  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Req_Details?.contract?.name}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>

                                <div className=" text-right mx-6 ">
                                    <label htmlFor="amount" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  المبلغ المطلوب* :  </label>
                                    <div class="relative flex items-center  ">
                                        <input name="amount" id='amount' type="number"
                                            value={Req_Details?.amount}
                                            className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100     focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="0  " />

                                    </div>
                                </div>

                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> نسبة الخصم  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Req_Details ? Req_Details?.discount + '%' : ''}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>
                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> المبلغ بعد الخصم  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Req_Details?.amountWithDiscount}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>
                            </>
                        }






                        <div className=" text-right mx-6 ">
                            <label htmlFor="name" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  الأسم * : </label>
                            <div class="relative flex items-center  ">
                                <input name="name" id='name'
                                    value={Req_Details?.name}
                                    type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100     focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="الأسم" />

                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="nationalId" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  الرقم القومي * : </label>
                            <div class="relative flex items-center  ">
                                <input name="nationalId" id='nationalId' type="text"
                                    value={Req_Details?.nationalId}
                                    maxLength={14} className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="الرقم القومي" />

                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="createdAt" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  تاريخ الأنشاء * : </label>
                            <div class="relative flex items-center  ">
                                <input name="createdAt" id='createdAt'
                                    value={Req_Details?.createdAt?.slice(0, 10)}
                                    type="date" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="التاريخ" />

                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            {/* <label htmlFor="installment" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> عدد الأقساط * : </label>
                            <div class="relative flex items-center  ">
                                <input name="installment" id='installment'
                                    value={Req_Details?.installment}
                                    type="text" disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder='0' />
                            </div> */}
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="phoneNumber" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  رقم الهاتف* :  </label>
                            <div class="relative flex items-center  ">
                                <input name="phoneNumber" id='phoneNumber'
                                    value={Req_Details?.phoneNumber}
                                    maxLength={11} type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="01*******" />

                            </div>
                        </div>
                        {/* <div className=" text-right mx-6 ">
                            <label htmlFor="maturityDate" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  تاريخ الأنتهاء * : </label>
                            <div class="relative flex items-center  ">
                                <input name="maturityDate" id='maturityDate' type="date"
                                    value={Req_Details?.maturityDate?.slice(0, 10)}
                                    className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="التاريخ" />

                            </div>
                        </div> */}
                        <div className=" text-right mx-6 ">
                            <label htmlFor="emplyee" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>   اسم المنشئ * : </label>
                            <div class="relative flex items-center  ">
                                <input name="emplyee" id='emplyee'
                                    value={Req_Details?.user?.name}
                                    type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="AhmedKhalf" />

                            </div>
                        </div>
                        <div className=" text-right mx-6 ">
                            <label htmlFor="order" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>   الحاله * : </label>
                            <div class="relative flex items-center  ">
                                <span className={`${Req_Details?.status === 0 ? 'bg-[#f0bb51]' : Req_Details?.status === 1 ? 'bg-[#2199e8]' : Req_Details?.status === 2 ? 'bg-[#ed5565]' : 'bg-[#36BA98]'} rounded-lg text-xs font-bold my-2  py-1 px-2 text-white`}>{Req_Details?.status === 0 ? 'جديد' : Req_Details?.status === 1 ? 'مدفوع' : Req_Details?.status === 2 ? "ملغي" : "مسترد"}</span>

                            </div>
                        </div>


                        <div className=" text-right mx-6  col-span-2">
                            <label htmlFor="description" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  وصف المدفوعه  : </label>
                            <div class="relative flex items-center  ">
                                <textarea name="description" id='description'
                                    value={PayDesc}
                                    onChange={(e) => setPayDesc(e.target.value)}
                                    className="w-full text-lg lg:text-[12px] md:text-[9px]  xl:text-[15px] text-gray-800 bg-gray-100    px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="اضف ملاحظات هنا" />

                            </div>
                        </div>

                        {/* <div ref={componentRef} className='hidden'>
                    
                            <Reports  id="printableArea" data={Req_Details}  />
                        </div> */}
                    </div>
                    <span className='w-[96.1%] h-1   border-b border-dashed border-gray-200 m-auto my-8'></span>


                </div>


                <ToastContainer />
            </form>
            {toggle && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40   `} onClick={() => setToggle(false)}></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle ? 'animate-swal2show' : 'animate-swal2hide'} `} >
                    <div className="bg-white rounded shadow-lg py-10 px-44 text-center ">
                        <div className='flex flex-col justify-center items-center relative box-content text-center    m-auto '>
                            <span className='text-[#ed5565]  text-7xl border-[#c9dae1]'><ImCancelCircle/></span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-600 mt-4"> إلغاء امر التوريد</h2>
                        <p className="mb-4 font-bold text-lg text-gray-800">رقم أمر التوريد </p>
                        <div className='text-[#ed5565] mb-8 font-bold text-4xl bg-gray-200 p-4 '>{id}</div>
                        <button className="bg-gray-400 text-white px-4 py-2 lg:px-2  rounded mx-4 text-lg lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold" onClick={handlesetToggle}>العوده</button>
                        <button className="bg-[#ed5565] hover:bg-[#f54658] text-white px-4 py-2 lg:px-2  rounded mx-4 text-lg lg:text-[12px] md:text-[9px]  xl:text-[15px]  font-bold" onClick={() => handleSure(id)} >تأكيد</button>
                    </div>
                </div> </>}

                {/* (Req_Details?.status === 0 && localStorage.getItem('role') !== 'orderCreator') */}

            {
            (localStorage.getItem("role") !== 'SuperAdmin' && Req_Details?.status === 0 ) && <div className='flex justify-center items-center'>

                <div className=' p-3 w-[96%] '>

                    <div className=' font-bold flex gap-20  justify-center items-center '>
                        <div className=''>
                            <button onClick={() => setToggle2(true)} className='w-[315px] flex justify-center items-center  bg-[#c59025] hover:bg-[#f0bb51]  rounded-md text-base font-bold  py-2 px-2 text-white'> <RiMoneyDollarCircleFill className='w-8 h-8 mx-1' /> <span>الدفع النقدي</span> </button>

                        </div>

                        <div className=''>
                            <button onClick={handleClick} className='w-[315px] flex justify-center items-center  bg-[#c59025] hover:bg-[#f0bb51]  rounded-md text-base font-bold  py-2 px-2 text-white'>  <CiCreditCard1 className='w-8 h-8 mx-1' /> <span>بطاقه ائتمانيه</span></button>
                        </div>

                    </div>

                </div>
                {/* border-[#9de0f6] */}
                {toggle1 && <>
                    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle1 ? '' : 'animate-swal2hide'} `}  ></div>
                    <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle1 ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                        <div className="bg-white rounded shadow-lg py-10 px-44 text-center">
                            <div className='flex flex-col justify-center items-center relative border-[#f0bb5188] box-content text-center border-4  rounded-full w-24 h-24 m-auto'>
                                <span className='text-[#c59025]  text-6xl '>
                                    {/* <RiPaypalLine /> */}
                                    <RiPaypalLine />
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-600 text-center py-3">برجاء اختيار رقم الكود</h2>
                            {/* <p className=" text-lg text-[#545454] text-center py-5"> المبلغ : {Req_Details?.amount} </p> */}
                            {/* <p className="text-lg text-[#545454] text-center pb-5">  مصاريف الخدمة : </p> */}
                            <p className="text-lg text-[#545454] text-center font-semibold pb-5"> المبلغ :
                                <span className={`${Req_Details?.amountWithDiscount !== Req_Details?.amount ? 'text-[#503131] line-through' : 'text-black'} mx-1 `}>EGP {Req_Details?.amount}</span>
                                {Req_Details?.amountWithDiscount !== Req_Details?.amount && <span className='mx-6 text-black'> EGP {Req_Details?.amountWithDiscount}</span>}
                            </p>
                            <p className="text-lg text-[#545454] text-center font-semibold  pb-5">   الدفع :  <span className='text-black'>{Req_Details?.organization}</span> </p>
                            {
                                Req_Details?.discount !== 0 && <p className="text-lg text-[#545454] text-center font-semibold  pb-5">   نسبة الخصم :  <span className='text-black'>{Req_Details?.discount + '%'}</span> </p>
                            }
                            <p className="text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] text-[#545454] text-center pb-5  font-bold">  كود الدفع </p>
                            <Dropdown setPosCode={setPosCode} />
                            {error && <p className='form-error text-red-700 mt-1 font-semibold'>من فضلك ادخل كود الدفع </p>}

                            <div className='flex justify-center items-center py-5 mt-3'>
                                <button className="bg-gray-400 text-white px-4 py-2 lg:px-2  rounded mx-4 text-lg font-bold" onClick={() => setToggle1(false)}>العوده</button>
                                <button className="bg-[#e6a930] hover:bg-[#ebb344] text-white px-4 py-2 lg:px-2  rounded mx-4 text-lg font-bold " onClick={handleSubmit}>    {Loading1 ? <> <div class="flex justify-center items-center ">
                                    <div class="w-4 p-2 border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-4"></div>
                                </div>
                                </> : <>تأكيد</>}</button>
                            </div>
                        </div>
                        <ToastContainer />
                    </div> </>}

                {toggle2 && <>
                    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle2 ? '' : 'animate-swal2hide'} `}  ></div>
                    <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle2 ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                        <div className="bg-white rounded shadow-lg py-10 px-44 text-center">
                            <div className='flex flex-col justify-center items-center relative border-[#f0bb5188] box-content text-center border-4  rounded-full w-24 h-24 m-auto'>
                                <span className='text-[#f0bb51]  text-6xl '>
                                    {/* <FaDollarSign /> */}
                                    <FaDollarSign />
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-600 text-center py-3">برجاء إدخال المبلغ كاملا</h2>
                            {/* <p className=" text-lg text-[#545454] text-center py-5"> المبلغ : {Req_Details?.amount} </p> */}
                            {/* <p className="text-lg text-[#545454] text-center pb-5">  مصاريف الخدمة : </p> */}
                            <p className="text-lg text-[#545454] text-center font-semibold pb-5"> المبلغ :
                                <span className={`${Req_Details?.amountWithDiscount !== Req_Details?.amount ? 'text-[#503131] line-through' : 'text-black'} mx-1 `}>EGP {Req_Details?.amount}</span>
                                {Req_Details?.amountWithDiscount !== Req_Details?.amount && <span className='mx-6 text-black'> EGP {Req_Details?.amountWithDiscount}</span>}
                            </p>
                            <p className="text-lg text-[#545454] text-center font-semibold  pb-5">   الدفع :  <span className='text-black'>{Req_Details?.organization}</span> </p>
                            {
                                Req_Details?.discount !== 0 && <p className="text-lg text-[#545454] text-center font-semibold  pb-5">   نسبة الخصم :  <span className='text-black'>{Req_Details?.discount + '%'}</span> </p>
                            }

                            <p className="text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] text-[#545454] text-center pb-5  font-bold">  استلمت </p>
                            <div dir='rtl' className=" relative   flex justify-center items-center ">
                                <input type="number" value={Req_Details?.amountWithDiscount ? Req_Details?.amountWithDiscount : Req_Details?.amount} step="0.01" name="order" id='order' required className="w-[300px] text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#f0bb51]  py-1 rounded-md  outline-none  border-gray-600-200" placeholder="ادخل السعر" />
                            </div>

                            <div className='flex justify-center items-center py-5 mt-3'>
                                <button className="bg-gray-400 text-white px-4 py-2 lg:px-2  rounded mx-4 text-lg font-bold" onClick={() => setToggle2(false)}>العوده</button>
                                <button className="bg-[#f0bb51] hover:bg-[#ebb344] text-white px-4 py-2 lg:px-2  rounded mx-4 text-lg font-bold " onClick={handleSubmit}>{Loading2 ? <> <div class="flex justify-center items-center ">
                                    <div class="w-4 p-2 border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-4"></div>
                                </div>
                                </> : <>تأكيد</>}</button>
                            </div>
                        </div>
                        <ToastContainer />
                    </div> </>}

                {toggle3 && <>
                    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle3 ? '' : 'animate-swal2hide'} `} ></div>
                    <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle3 ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                        <div className="bg-white rounded shadow-lg py-10 px-44 text-center ">
                            <div className='flex flex-col justify-center items-center relative box-content text-center border-4 border-[#f0bb51] rounded-full w-12 h-12 m-auto '>
                                {/* <FontAwesomeIcon icon={faCheck} className='text-[#f0bb51] text-6xl' /> */}
                                <FaCheck className='text-[#f0bb51] text-4xl' />
                                {/* <span className='text-[#f0bb51] text-6xl'>i</span> */}
                            </div>
                            <h2 className="text-2xl font-bold mt-4 mb-4 text-gray-600">تم إنشاء الدفع بنجاح</h2>
                            <p className="mb-4 font-bold text-xl text-gray-800">رقم المدفوعه </p>
                            <div className='text-[#f0bb51] mb-8 font-bold text-5xl   '> {ResNum}</div>
                            <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 lg:px-2  rounded mx-4 text-xl" onClick={handleOK}>تم</button>
                            <button className="bg-[#f0bb51] hover:bg-[#ebb344] text-white px-4 py-2 lg:px-2  rounded mx-4 text-xl " onClick={() => handlePrint(Req_Details)} >طباعه</button>

                        </div>
                    </div> </>}

            </div>}

        </div>
    )
}

export default OrderDetails