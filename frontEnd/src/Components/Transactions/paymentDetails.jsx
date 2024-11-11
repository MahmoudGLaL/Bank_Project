
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'

import { toast, ToastContainer } from 'react-toastify'

import { FaCheck } from "react-icons/fa6";


import moment from 'moment/moment';

import { authcontext } from '../../Context/authcontext';
import { GiTakeMyMoney } from "react-icons/gi";
import image from '../../assests/bank-building.png'
// import image from '../../images/logo3.jpg'



const PaymentDetails = () => {

    let [toggle2, setToggle2] = useState(false)
    let [toggle, setToggle] = useState(false)
    let { getPaymentDetails, Pay_Details, RebackMoney, getTreasury, TreasuryData } = useContext(authcontext)

    let [PayDesc, setPayDesc] = useState("")
    let [Desc, setDesc] = useState("")
    let [ret_price, setRet_price] = useState("")
    let [Loading, setIsLoading] = useState("")



    const { id } = useParams()

    useEffect(() => {
        getTreasury(localStorage.getItem('tres_id'))
        if (id) {
            getPaymentDetails(id)
        }
    }, [])


    const handlesetToggle = (e) => {
        setToggle(false)
    }
    const handleSure = (id) => {

        if (ret_price !== '' && Desc !== '') {
            setIsLoading(true)
            setTimeout(()=>{
                RebackMoney(id, {
                    description: Desc,
                    amount: ret_price
                })
                setIsLoading(false)
                setToggle2(false)
            },[2100])
           
        }
        else {
            toast.error("من فضلك ادخل كل البيانات")
        }

        // navigate("/penalties")
    }
    // const handleOK = () => {
    //     setToggle3(false)
    //     navigate("/transactions")
    // }

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

            if (Pay_Details?.requisition?.discount > 0) {
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
                       <div style="display: flex; justify-content: center; align-items: center; font-size: 1.7rem ; font-weight : bold ; "> <span style = 'padding : 5px;  border-bottom: 1px dotted black;'> خزنة  ${TreasuryData.treasuryName} </span> </div>
                       <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 0.75rem 2.5rem;">
                           <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                               <tbody>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الاسم</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${data?.requisition?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الرقم القومي</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${data?.requisition?.nationalId}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">رقم امر التوريد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${data?.id}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">اسم المنشئ</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${'ali'}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">تاريخ الأنشاء</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${data?.requisition?.createdAt.slice(0, 10)}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع المدفوعة</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${data?.requisition?.organization}</td>
                                   </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع التعاقد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${Pay_Details?.requisition?.contract?.name}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> نسبة الخصم</td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${Pay_Details?.requisition?.discount} %</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">المبلغ المطلوب</td>
                                        <td style="font-family:  sans-serif; display: flex; justify-content : center ; gap : 10px ;  border: 1px solid #e2e8f0; padding: 0.5rem;" id="amount"><span>${Pay_Details?.requisition?.amountWithDiscount} ج</span> <span style=" text-decoration:  line-through ;text-decoration-color: gray; text-decoration-thickness: 1px;">${Pay_Details?.requisition?.amount} ج</span></td>
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
   
                         <div style="display: flex; justify-content: center; align-items: center; font-size: 1.7rem ; font-weight : bold ; "> <span style = 'padding : 5px;  border-bottom: 1px dotted black;'> خزنة  ${TreasuryData.treasuryName} </span> </div>
                       <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 0.75rem 2.5rem;">
                           <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                               <tbody>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الاسم</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${data?.requisition?.name}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">الرقم القومي</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${data?.requisition?.nationalId}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">رقم امر التوريد</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${data?.id}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">اسم المنشئ</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${'ali'}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">تاريخ الأنشاء</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${data?.requisition?.createdAt.slice(0, 10)}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">نوع المدفوعة</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${data?.requisition?.organization}</td>
                                   </tr>
                                   <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">المبلغ المطلوب</td>
                                       <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="amount">${data?.requisition?.amount}</td>
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


    // let handleSubmit = async () => {



    //     if (toggle1) {

    //         // console.log({ pCode, paymentReceiptNumber: Pay_Details.amount.toString(), paymentWay: Pay_Details.paymentType, requisitionId: Pay_Details.id });
    //         console.log(posCode);
    //         console.log(Pay_Details.id);


    //         await axios.post(`https://localhost:44365/api/Payments`, { referenceNumber: posCode, paymentType: 'فيزا', requisitionId: Pay_Details.id ,description : PayDesc }).then(res => {

    //             setResNum(res.data.paymentReceiptNumber)

    //         }).catch(err => {
    //             console.log(err);

    //         })
    //     }
    //     else {

    //         // console.log({ pCode, paymentReceiptNumber: Pay_Details.amount.toString(), paymentWay: Pay_Details.paymentType, requisitionId: Pay_Details.id });

    //         await axios.post(`https://localhost:44365/api/Payments`, { referenceNumber : "" , paymentWay: 'كاش', requisitionId: Pay_Details.id ,description : PayDesc }).then(res => {
    //             setResNum(res.data.paymentReceiptNumber)
    //             console.log({cash:"cash"});

    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }

    //     setToggle1(false)
    //     setToggle2(false)
    //     setToggle3(true)


    // }
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //   });

    return (
        <div dir='rtl' className=' min-h-[100vh] bg-[#f3f3f4]'>

            <form className=' font-tajawal  w-100 grow  flex flex-col gap-5'>

                <div className='bg-white flex flex-col justify-start items-start text-right py-4 px-4 lg:px-2'>
                    <h1 className='px-6 lg:px-2 text-[28px] lg:text-[22px] text-[rgb(103 106 108 /1)] font-semi-bold  '>تفاصيل المدفوعه /<span className=' py-0 text-2xl font-bold text-[#f0bb51] '>  {TreasuryData?.treasuryName ? TreasuryData?.treasuryName : ''} </span></h1>
                    {/* <p className='px-10 py-0 text-base font-medium '>  أوامر التوريد /<span className='text-gray-500 font-bold'> تفاصيل امر التوريد </span> </p> */}
                </div>



                <div className='bg-white flex justify-start items-center flex-col py-4 w-[96.5%] m-auto '>
                    <div className=' bg-white flex justify-between items-center  w-[96.5%] m-auto mb-2'>
                        <h1 className=' my-auto text-xl  '>تفاصيل المدفوعه </h1>
                        <div className=' font-bold flex '>
                            {/* {Pay_Details?.requisition?.status === 1 &&


                                <button type="button" className='border text-xs py-2 px-2 flex justify-center items-center text-white bg-[#ed5565] rounded-lg hover:bg-[#f54658] ' onClick={() => setToggle(true)}>
                                    <span className='px-2'>
                                        استرداد
                                    </span>
                                </button>
                            } */}
                            <button onClick={() => handlePrint(Pay_Details)} type='button' className='border text-xs py-2 px-2 flex justify-center items-center mx-3  text-gray-500 rounded-lg hover:bg-[#f8f8f8]'>
                                <span className='px-1' >
                                    طباعة

                                </span>
                            </button>
                        </div>


                    </div>

                    <span className='w-full h-1  border-b border-dotted border-gray-200'></span>

                    <div className="grid gap-2 justify-start items-start grid-cols-4 w-full py-4">
                        <div className=" text-right mx-6 ">
                            <label htmlFor="id" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  رقم المدفوعه * : </label>
                            <div class="relative flex items-center  ">
                                <input name="id" id='id' type="text"
                                    value={Pay_Details?.paymentReceiptNumber}
                                    disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                            </div>
                        </div>
                        <div className=" text-right mx-6 ">
                            <label htmlFor="id" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  كود امر التوريد * : </label>
                            <div class="relative flex items-center  ">
                                <input name="id" id='id' type="text"
                                    value={Pay_Details?.id}
                                    disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="organization" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> المؤسسه والفرع * : </label>
                            <div class="relative flex items-center  ">
                                <input name="organization" id='organization' type="text"
                                    value={Pay_Details?.requisition?.organization}
                                    disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                            </div>
                        </div>
                        {
                            Pay_Details?.requisition?.amountWithDiscount === Pay_Details?.requisition?.amount && <div className=" text-right mx-6 ">
                                <label htmlFor="amount" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  المبلغ المطلوب* :  </label>
                                <div class="relative flex items-center  ">
                                    <input name="amount" id='amount' type="text"
                                        value={Pay_Details?.requisition?.amount}
                                        className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100     focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="0  " />

                                </div>
                            </div>
                        }


                        {Pay_Details?.requisition?.amountWithDiscount !== Pay_Details?.requisition?.amount &&
                            <>
                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> نوع التعاقد  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Pay_Details?.requisition?.contract?.name}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>

                                <div className=" text-right mx-6 ">
                                    <label htmlFor="amount" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  المبلغ المطلوب* :  </label>
                                    <div class="relative flex items-center  ">
                                        <input name="amount" id='amount' type="number"
                                            value={Pay_Details?.requisition?.amount}
                                            className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100     focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="0  " />

                                    </div>
                                </div>

                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> نسبة الخصم  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Pay_Details ? Pay_Details?.requisition?.discount + '%' : ''}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>
                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> المبلغ بعد الخصم  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Pay_Details?.requisition?.amountWithDiscount}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>
                            </>
                        }
                        {Pay_Details?.requisition?.amountWithDiscount !== Pay_Details?.requisition?.amount && <div></div>}
                        {/* <div></div> */}



                        {/* {Pay_Details?.requisition.amountWithDiscount > 0 &&
                            <>
                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> نوع التعاقد  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Pay_Details?.requisition.organization}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>

                                <div className=" text-right mx-6 ">
                                    <label htmlFor="amount" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  المبلغ المطلوب* :  </label>
                                    <div class="relative flex items-center  ">
                                        <input name="amount" id='amount' type="number"
                                            value={Pay_Details?.requisition.amount}
                                            className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100     focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="0  " />

                                    </div>
                                </div>

                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> نسبة الخصم  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Pay_Details ? Pay_Details?.requisition.discount + '%' : ''}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>
                                <div className=" text-right mx-6 ">
                                    <label htmlFor="contract" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> المبلغ بعد الخصم  * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="contract" id='contract' type="text"
                                            value={Pay_Details?.requisition.amountWithDiscount}
                                            disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" />

                                    </div>
                                </div>
                            </>
                        } */}






                        <div className=" text-right mx-6 ">
                            <label htmlFor="name" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  الأسم * : </label>
                            <div class="relative flex items-center  ">
                                <input name="name" id='name'
                                    value={Pay_Details?.requisition?.name}
                                    type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100     focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="الأسم" />

                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="nationalId" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  الرقم القومي * : </label>
                            <div class="relative flex items-center  ">
                                <input name="nationalId" id='nationalId' type="text"
                                    value={Pay_Details?.requisition?.nationalId}
                                    maxLength={14} className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="الرقم القومي" />

                            </div>
                        </div>

                        <div className=" text-right mx-6 ">
                            <label htmlFor="createdAt" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  تاريخ الأنشاء * : </label>
                            <div class="relative flex items-center  ">
                                <input name="createdAt" id='createdAt'
                                    value={Pay_Details?.requisition?.createdAt?.slice(0, 10)}
                                    type="date" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="التاريخ" />

                            </div>
                        </div>

                        {/* <div className=" text-right mx-6 ">
                            <label htmlFor="installment" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '> عدد الأقساط * : </label>
                            <div class="relative flex items-center  ">
                                <input name="installment" id='installment'
                                    value={Pay_Details?.requisition.installment}
                                    type="text" disabled className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder='0' />
                            </div>
                        </div> */}

                        <div className=" text-right mx-6 ">
                            <label htmlFor="phoneNumber" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  رقم الهاتف* :  </label>
                            <div class="relative flex items-center  ">
                                <input name="phoneNumber" id='phoneNumber'
                                    value={Pay_Details?.requisition?.phoneNumber}
                                    maxLength={11} type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="01*******" />

                            </div>
                        </div>
                        {/* <div className=" text-right mx-6 ">
                            <label htmlFor="maturityDate" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  تاريخ الأنتهاء * : </label>
                            <div class="relative flex items-center  ">
                                <input name="maturityDate" id='maturityDate' type="date"
                                    value={Pay_Details?.maturityDate?.slice(0, 10)}
                                    className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="التاريخ" />

                            </div>
                        </div> */}
                        <div className=" text-right mx-6 ">
                            <label htmlFor="emplyee" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>   اسم المنشئ * : </label>
                            <div class="relative flex items-center  ">
                                <input name="emplyee" id='emplyee'
                                    value={Pay_Details?.requisition?.user?.username}
                                    type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="AhmedKhalf" />

                            </div>
                        </div>
                        <div className=" text-right mx-6 ">
                            <label htmlFor="order" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>   الحاله * : </label>
                            <div class="relative flex items-center  ">
                                <span className={`${Pay_Details?.requisition?.status === 0 ? 'bg-[#f0bb51]' : Pay_Details?.requisition?.status === 1 ? 'bg-[#2199e8]' : Pay_Details?.requisition?.status === 2 ? 'bg-[#ed5565]' : 'bg-[#36BA98]'} rounded-lg text-xs lg:text-[9px]  font-bold my-2  py-1 px-2 text-white`}>{Pay_Details?.requisition?.status === 0 ? 'جديد' : Pay_Details?.requisition?.status === 1 ? 'مدفوع' : Pay_Details?.requisition?.status === 2 ? "ملغي" : 'مسترد'}</span>

                            </div>
                        </div>
                        {
                            Pay_Details.requisition?.status !== 3 ? <> <div></div></> : <></>
                        }
                        {
                            Pay_Details.requisition?.status === 3 ? <>

                                <div className=" text-right mx-6 ">
                                    <label htmlFor="createdAt" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  تاريخ الأسترداد * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="createdAt" id='createdAt'
                                            value={Pay_Details?.requisition?.reFundAt?.slice(0, 10)}
                                            type="date" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="التاريخ" />

                                    </div>


                                </div>
                                <div className=" text-right mx-6 ">
                                    <label htmlFor="name" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  القيمه المسترده * : </label>
                                    <div class="relative flex items-center  ">
                                        <input name="name" id='name'
                                            value={Pay_Details?.requisition?.reFund}
                                            type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100     focus:border-[#f0bb51] px-4 py-2 lg:px-2  rounded-md outline-none  -gray-300" placeholder="الأسم" />

                                    </div>
                                </div>
                            </> : <></>
                        }

                        <div className=" text-right mx-6  col-span-2">
                            <label htmlFor="description" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  وصف المدفوعه  : </label>
                            <div class="relative flex items-center  ">
                                {
                                    Pay_Details.requisition?.status === 0 ? <> <textarea name="description" id='description'
                                        value={PayDesc}
                                        onChange={(e) => setPayDesc(e.target.value)}
                                        className="w-full text-lg lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    px-4 py-2 lg:px-2  rounded-md outline-none " placeholder="اضف ملاحظات هنا" /></>
                                        :
                                        <>
                                            <textarea name="description" id='description'
                                                value={Pay_Details.description !== '' ? Pay_Details.description : ' '}
                                                disabled
                                                className={`w-full text-lg lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100  ${Pay_Details.description !== '' ? '' : 'h-12'}  px-4 py-2 lg:px-2  rounded-md outline-none `} placeholder="اضف ملاحظات هنا" />
                                        </>
                                }


                            </div>
                        </div>
                        {
                            Pay_Details.requisition?.status === 3 ? <><div></div> <div></div></> : <></>
                        }
                        {
                            Pay_Details.requisition?.status === 3 ? <>


                                <div className=" text-right mx-6  col-span-2">
                                    <label htmlFor="description" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold text-gray-700  '>  وصف الأسترداد  : </label>
                                    <div class="relative flex items-center  ">
                                        <textarea name="description" id='description'
                                            value={Pay_Details.requisition.description !== '' ? Pay_Details.requisition.description : ''}
                                            disabled
                                            className="w-full text-lg lg:text-[12px] md:text-[9px]  xl:text-[15px]  text-gray-800 bg-gray-100    px-4 py-2 lg:px-2  rounded-md outline-none -gray-500" placeholder="اضف ملاحظات هنا" />

                                    </div>
                                </div></> : <></>
                        }

                        {/* <div ref={componentRef} className='hidden'>
                    
                            <Reports  id="printableArea" data={Pay_Details}  />
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
                        <div className='flex flex-col justify-center items-center relative box-content text-center border-4  rounded-full w-24 h-24 m-auto '>
                            <span className='text-[#87adbd]  text-7xl border-[#c9dae1]'>?</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-600 mt-4"> إلغاء امر التوريد</h2>
                        <p className="mb-4 font-bold text-lg text-gray-800">رقم أمر التوريد </p>
                        <div className='text-[#f0bb51] mb-8 font-bold text-4xl bg-gray-200 p-4 '>{id}</div>
                        <button className="bg-gray-400 text-white px-4 py-2 lg:px-2  rounded mx-4 text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-normal" onClick={handlesetToggle}>العوده</button>
                        <button className="bg-[#f0bb51] text-white px-4 py-2 lg:px-2  rounded mx-4 text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-normal" onClick={() => handleSure(id)} >تأكيد</button>
                    </div>
                </div> </>}
            {toggle2 && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40   `} onClick={() => setToggle2(false)}></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle2 ? 'animate-swal2show' : 'animate-swal2hide'} `} >
                    <div className="bg-white rounded font-tajawal shadow-lg py-10 px-40 text-center ">
                        <div className='flex flex-col justify-center items-center relative box-content text-center border-4  rounded-full w-20 h-20 m-auto '>
                            <span className='text-[#f0bb51]  text-6xl border-[#c9dae1]'>$</span>
                        </div>
                        <div dir='rtl' className=" relative   flex justify-center items-center ">
                            <input type="number" step='.01' name="order" id='order' value={ret_price} onChange={(e) => setRet_price(e.target.value)} required className="w-[400px] text-center mt-6 mb-4 font-bold  p-4  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#f0bb51]  py-1 rounded-md  outline-none  border-gray-600-200" placeholder=" القيمه المسترده" />
                        </div>
                        <div dir='rtl' className=" relative   flex justify-center items-center ">
                            <textarea type="text" name="order" id='order' value={Desc} onChange={(e) => setDesc(e.target.value)} required className="w-[400px] text-center mb-6 font-bold  p-4  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#f0bb51]  py-1 rounded-md  outline-none  border-gray-600-200" placeholder="سبب الأسترداد" />
                        </div>

                        <button className="bg-gray-400 text-white px-4 py-2 lg:px-2  rounded mx-4 text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] font-bold" onClick={() => setToggle2(false)}>العوده</button>
                        <button className="bg-[#f0bb51] text-white px-4 py-2 lg:px-2 font-bold rounded mx-4 text-sm lg:text-[12px] md:text-[9px]  xl:text-[15px] " onClick={() => handleSure(id)} >{Loading ? <> <div class="flex justify-center items-center ">
                                    <div class="w-4 p-1 border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-4"></div>
                                </div>
                                </> : <>تأكيد</>}</button>
                    </div>
                </div> </>}

            {(Pay_Details?.requisition?.status === 1 && (localStorage.getItem('role') === 'admin' && TreasuryData.isSelected === true))  && <div className='flex justify-center items-center'>

                <div className=' p-3 w-[96%] '>

                    <div className=' font-bold flex justify-center items-center mx-4 '>
                        <div className=''>
                            <button onClick={() => setToggle2(true)} className='w-[315px] font-bold flex text-lg items-center justify-center bg-[#be8c28]  hover:bg-[#f0bb51] rounded-md   py-2 px-2 text-white'> <GiTakeMyMoney className='w-8 h-8 mx-1' /> <span>إسترداد</span> </button>
                        </div>



                    </div>

                </div>


            </div>}

        </div>
    )
}

export default PaymentDetails