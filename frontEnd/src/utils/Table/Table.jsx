import React from 'react'

export default function Table() {
  return (
    <div dir='rtl' class="relative overflow-x-auto shadow-md sm:rounded-lg pt-5 px-2">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className=' border-b-1  '>

                <th className='leading-[1.42857] flex gap-5 items-center pb-3  '>
                <div className='font-bold text-[15px] text-[#212529]'>إجمالي المدفوعات [89]</div>
                <div className='font-bold text-[15px]  text-[#212529]'>إجمالي المدفوعات [89,123,210,315 EGP]</div>
                


                </th>
                
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                رقم ايصال السداد
                </th>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                كود أمر التوريد
                </th>
                <th></th>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                كود POS
                </th>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                الموظف
                </th>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                تاريخ الإنشاء	
                </th>
            
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                المؤسسة و الفرع	
                </th>
            
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                طريقة الدفع
                </th>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                الحالة
                </th>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                القيمة
                </th>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                مصاريف
                </th>
                <th scope="col" class="px-6 py-3 text-[14px] text-[#212529]">
                إجمالي
                </th>
            
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
          
        </tbody>
        <tfoot>
            <tr>
                <div className='flex gap-3 items-center'>
                <div className='font-bold text-[15px] text-[#212529]'>إجمالي المدفوعات [89]</div>
                <div className='font-bold text-[15px]  text-[#212529]'>إجمالي المدفوعات [89,123,210,315 EGP]</div>
                </div>
            </tr>
        </tfoot>
    </table>
</div>
  )
}







