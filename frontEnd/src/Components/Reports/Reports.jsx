import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import mainImage from "../../images/logo3.jpg"

const today = new Date();


const day = new Intl.DateTimeFormat('ar-EG', { day: 'numeric' }).format(today);
const month = new Intl.DateTimeFormat('ar-EG', { month: 'numeric' }).format(today);
const year = new Intl.DateTimeFormat('ar-EG', { year: 'numeric' }).format(today);

const formattedDate = `${day} /${year}/${month}`;

function Reports({ data }) {




    return (
        <>

            <div className=' '>
                <div>

                    <div className='flex justify-between  items-center py-8 px-10 '>
                        <div className=' px-5 flex justify-center  items-center'>
                            <img src={mainImage} className='' style={{
                                width: "100px",
                                height: "100px"
                            }} alt="" />


                        </div>
                        <div className='fs-5'>
                            <div > وزاره الدفاع  </div>
                            <div>مركز الطب الطبيعي و التأهيلي</div>
                            <div>وعلاج الروماتيزم ق.م</div>
                            <div className='mt-1'> التاريخ : {formattedDate} </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center gap-8 py-3 
                     '>
                        <table dir='rtl' className='min-w-full border border-gray-300 border-collapse py-3 mt-14'>
                            <tr className="table-row border-b border-gray-300 text-center">
                                <td className="border border-gray-300 px-2 py-2">الاسم </td>
                                <td className="border border-gray-300 px-2 py-2">{data.name}</td>
                            </tr>
                            <tr className="table-row border-b border-gray-300 text-center">
                                <td className="border border-gray-300 px-2 py-2">الرقم القومي </td>
                                <td className="border border-gray-300 px-2 py-2">{data.nationalId}</td>
                            </tr>
                            <tr className="table-row border-b border-gray-300 text-center">
                                <td className="border border-gray-300 px-2 py-2">رقم امر التوريد </td>
                                <td className="border border-gray-300 px-2 py-2">{data.phoneNumber}</td>
                            </tr>
                            <tr className="table-row border-b border-gray-300 text-center">
                                <td className="border border-gray-300 px-2 py-2">اسم المنشئ </td>
                                <td className="border border-gray-300 px-2 py-2">{data.emplyee}</td>
                            </tr>
                            <tr className="table-row border-b border-gray-300 text-center">
                                <td className="border border-gray-300 px-2 py-2">نوع المدفوعة</td>
                                <td className="border border-gray-300 px-2 py-2">{data.paymentType}</td>
                            </tr>
                            <tr className="table-row border-b border-gray-300 text-center">
                                <td className="border border-gray-300 px-2 py-2">المبلغ المطلوب</td>
                                <td className="border border-gray-300 px-2 py-2">{data.amount}</td>
                            </tr>

                        </table>
                    </div>
                </div>

            </div>


        </>
    );
}

export default Reports;