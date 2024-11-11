import moment from 'moment/moment';
import React from 'react'

const ClosingData = ({ filteredClose }) => {

    
    const handlePrint = () => {
        const today = new Date();
        const day = new Intl.DateTimeFormat('ar-EG', { day: 'numeric' }).format(today);
        const month = new Intl.DateTimeFormat('ar-EG', { month: 'numeric' }).format(today);
        const year = new Intl.DateTimeFormat('ar-EG', { year: 'numeric' }).format(today);

        const formattedDate = `${day} /${year}/${month}`;
        moment.locale('ar');
        let content = ``
            if(filteredClose[0]?.date)
            {
                content = `<div>
            <style>
        /* Import the font if it's a web font */
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

        /* Apply global font-family if needed */
        body {
            font-family: 'Tajawal', sans-serif;
        }
    </style>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 2rem 2.5rem;">
                        <div style="padding: 1.25rem; display: flex; justify-content: center; align-items: center;">
                            <img src="./logo3.jpg" style="width: 100px; height: 100px;" alt="" />
                        </div>
                        <div style="font-size: 1.25rem; text-align: right; line-height: 30px;">
                            <div>وزاره الدفاع</div>
                            <div>مركز الطب الطبيعي و التأهيلي</div>
                            <div>وعلاج الروماتيزم ق.م</div>
                            <div style="margin-top: 0.25rem;">التاريخ: <span id="formattedDate">${formattedDate}</span></div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center;"> <h3 style= " padding: 0.8rem 0.8rem; border: 0.5px dashed black ">تقرير ${filteredClose[0].treasuryName} ل شهر ${filteredClose[0].date}</h3></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 0.75rem 2.5rem;">
                       
                        <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                            <tbody>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">إجمالي أوامر التوريد</td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${parseFloat(filteredClose[0]?.totalPaid) + parseFloat(filteredClose[0]?.totalNotPaid) + parseFloat(filteredClose[0]?.totalCanceld)}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> إجمالي التحصيلات المدفوعه </td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${filteredClose[0]?.totalPaid}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">  إجمالي التحصيلات الغير مدفوعه </td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${filteredClose[0]?.totalNotPaid}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">  إجمالي التحصيلات الملغيه </td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${filteredClose[0]?.totalCanceld}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات </td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${parseInt(filteredClose[0]?.paidCount) + parseInt(filteredClose[0]?.notpaidCount) + parseInt(filteredClose[0]?.canceldCount)}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات المدفوعه</td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${filteredClose[0]?.paidCount}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات الغير مدفوعه</td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${filteredClose[0]?.notpaidCount}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد الألغاءات</td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${filteredClose[0]?.canceldCount}</td>
                                </tr>
                              
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`
            }
            else if(filteredClose[0]?.date == formattedDate)
            {
                content = `<div>
                <style>
            /* Import the font if it's a web font */
            @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');
    
            /* Apply global font-family if needed */
            body {
                font-family: 'Tajawal', sans-serif;
            }
        </style>
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 2rem 2.5rem;">
                            <div style="padding: 1.25rem; display: flex; justify-content: center; align-items: center;">
                                <img src="./logo3.jpg" style="width: 100px; height: 100px;" alt="" />
                            </div>
                            <div style="font-size: 1.25rem; text-align: right; line-height: 30px;">
                                <div>وزاره الدفاع</div>
                                <div>مركز الطب الطبيعي و التأهيلي</div>
                                <div>وعلاج الروماتيزم ق.م</div>
                                <div style="margin-top: 0.25rem;">التاريخ: <span id="formattedDate">${formattedDate}</span></div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: center; align-items: center;"> <h3 style= " padding: 0.8rem 0.8rem; border: 0.5px dashed black ">تقرير ${filteredClose[0].treasuryName} ل يوم ${filteredClose[0].date}</h3></div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 0.75rem 2.5rem;">
                           
                            <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                                <tbody>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">إجمالي أوامر التوريد</td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${parseFloat(filteredClose[0]?.totalPaid) + parseFloat(filteredClose[0]?.totalNotPaid) + parseFloat(filteredClose[0]?.totalCanceld)}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> إجمالي التحصيلات المدفوعه </td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${filteredClose[0]?.totalPaid}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">  إجمالي التحصيلات الغير مدفوعه </td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${filteredClose[0]?.totalNotPaid}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">  إجمالي التحصيلات الملغيه </td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${filteredClose[0]?.totalCanceld}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات </td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${parseInt(filteredClose[0]?.paidCount) + parseInt(filteredClose[0]?.notpaidCount) + parseInt(filteredClose[0]?.canceldCount)}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات المدفوعه</td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${filteredClose[0]?.paidCount}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات الغير مدفوعه</td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${filteredClose[0]?.notpaidCount}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد الألغاءات</td>
                                        <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${filteredClose[0]?.canceldCount}</td>
                                    </tr>
                                  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>`
            }
            else {
                content = `<div>
            <style>
        /* Import the font if it's a web font */
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

        /* Apply global font-family if needed */
        body {
            font-family: 'Tajawal', sans-serif;
        }
    </style>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 2rem 2.5rem;">
                        <div style="padding: 1.25rem; display: flex; justify-content: center; align-items: center;">
                            <img src="./logo3.jpg" style="width: 100px; height: 100px;" alt="" />
                        </div>
                        <div style="font-size: 1.25rem; text-align: right; line-height: 30px;">
                            <div>وزاره الدفاع</div>
                            <div>مركز الطب الطبيعي و التأهيلي</div>
                            <div>وعلاج الروماتيزم ق.م</div>
                            <div style="margin-top: 0.25rem;">التاريخ: <span id="formattedDate">${formattedDate}</span></div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center;"> <h3 style= " padding: 0.8rem 0.8rem; border: 0.5px dashed black ">تقرير ${filteredClose[0].treasuryName}</h3></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 0.75rem 2.5rem;">
                       
                        <table dir="rtl" style="width: 100%; border: 1px solid #e2e8f0; border-collapse: collapse; padding: 1rem; margin-top: 3.5rem;">
                            <tbody>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">إجمالي أوامر التوريد</td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="name">${parseFloat(filteredClose[0]?.totalPaid) + parseFloat(filteredClose[0]?.totalNotPaid) + parseFloat(filteredClose[0]?.totalCanceld)}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> إجمالي التحصيلات المدفوعه </td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="nationalId">${filteredClose[0]?.totalPaid}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">  إجمالي التحصيلات الغير مدفوعه </td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${filteredClose[0]?.totalNotPaid}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;">  إجمالي التحصيلات الملغيه </td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="phoneNumber">${filteredClose[0]?.totalCanceld}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات </td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${parseInt(filteredClose[0]?.paidCount) + parseInt(filteredClose[0]?.notpaidCount) + parseInt(filteredClose[0]?.canceldCount)}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات المدفوعه</td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="emplyee">${filteredClose[0]?.paidCount}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد المعاملات الغير مدفوعه</td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${filteredClose[0]?.notpaidCount}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; text-align: center;">
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;"> عدد الألغاءات</td>
                                    <td style="border: 1px solid #e2e8f0; padding: 0.5rem;" id="paymentType">${filteredClose[0]?.canceldCount}</td>
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
    return (
        <div>
            <div dir='rtl' className='grid grid-cols-9  mx-5 px-12'>
                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <h2 className='p-2 border-b-1'>إجمالي أوامر التوريد</h2>

                        <p className='px-5 text-[30px]'> {filteredClose[0] && <> {parseFloat(filteredClose[0]?.totalPaid) + parseFloat(filteredClose[0]?.totalNotPaid) + parseFloat(filteredClose[0]?.totalCanceld)}</>}    EGP</p>
                        <small className='px-5'> {filteredClose[0] && <>{parseInt(filteredClose[0]?.paidCount) + parseInt(filteredClose[0]?.notpaidCount) + parseInt(filteredClose[0]?.canceldCount)}</>}   أمر  </small>

                    </div>
                </div>
                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>
                            <h2 className=''>إجمالي التحصيلات المدفوعه </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>مدفوع</small>
                        </div>
                        <p className='px-5 text-[30px]'>{filteredClose[0]?.totalPaid} EGP</p>
                        <small className='px-5'>{filteredClose[0]?.paidCount} معاملة</small>

                    </div>
                </div>

                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>
                            <h2 className=''>إجمالي التحصيلات الغير مدفوعه </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>غير مدفوع</small>
                        </div>
                        <p className='px-5 text-[30px]'>{filteredClose[0]?.totalNotPaid} EGP</p>
                        <small className='px-5'>{filteredClose[0]?.notpaidCount} معاملة</small>

                    </div>
                </div>
                {/* <div className='col-span-3'>
<div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
    <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي تحصيلات الفيزا </h2>
        <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>بطاقة الائتمان </small>
    </div>
    <p className='px-5 text-[30px]'>EGP0.00</p>
    <small className='px-5'>0 معاملة</small>

</div>
</div> */}
                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي الأستردادات  </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>  الأستردادات</small>
                        </div>
                        <p className='px-5 text-[30px]'>{filteredClose[0]?.totalRefund} EGP</p>
                        <small className='px-5'> {filteredClose[0]?.refundCount} معاملة</small>

                    </div>
                </div>

                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي الإلغاء  </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>  الإلغاء</small>
                        </div>
                        <p className='px-5 text-[30px]'>{filteredClose[0]?.totalCanceld} EGP</p>
                        <small className='px-5'> {filteredClose[0]?.canceldCount} معاملة</small>

                    </div>
                </div>

            </div>
            <div className='flex justify-center items-center mt-4'>
                <button onClick={handlePrint} className='w-[15%]  bg-[#c59025] hover:bg-[#f0bb51]  text-white font-bold py-3 px-6 rounded-lg mt-8 transition duration-200 ease-in-out transform hover:scale-105'>طباعه</button>
            </div>
        </div>
    )
}

export default ClosingData