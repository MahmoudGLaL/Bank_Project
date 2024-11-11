import Password from "antd/es/input/Password";
import * as Yup from "yup"

const today = new Date();
today.setHours(0, 0, 0, 0);

const regex2 = /^[0-9]+(\.[0-9]+)?$/;
const capNum = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
const pass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/ ;
// const arabic = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/  with num; 
const arabic = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/; 
const notArabic = /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;



export const OrderSchema = Yup.object({
  
    name : Yup.string().required("* من فضلك ادخل اسم العميل ثلاثى* " ).min(12 , '*  اسم العميل  يجب ان يكون ثلاثى *'),
    nationalId :  Yup.string().required(" * من فضلك ادخل الرقم القومي * " ).test(
        'invalid-number',
        ' * غير مسموح ب ادخال حروف للرقم القومي* ',
        value => regex2.test(value)
      ).test('len', ' * الرقم القومي يجب أن يكون 14 رقمًا * ', val => val && val.toString().length === 14),
    
      phoneNumber :  Yup.number().required(" * من فضلك ادخل رقم الهاتف * " ).test(
        'valid-number',
        ' * غير مسموح ب ادخال حروف لرقم الهاتف* ',
        value => regex2.test(value)
      ).test('len', ' *  رقم الهاتف يجب أن يكون 11 رقمًا * ', val => val && val.toString().length === 10),
    
      // amount :  Yup.string().required(" * من فضلك ادخل المبلغ المطلوب * " ).test(
      //   'not-equal-to-zero',
      //   ' * المبلغ المطلوب لا يمكن ان يكون  صفر * ',
      //   value => value !== '0'
      // ),

    // paymentType : Yup.string().required("* من فضلك اختر طريقة الدفع * " ),
    organization : Yup.string().required("* من فضلك اختر نوع المؤسسه * " )


    // createdAt : Yup.date().min(today, '* تاريخ الإنشاء  لا يجب ان يكون تاريخ قديم *').required(" * من فضلك ادخل تاريخ الإنشاء* " ),

    // maturityDate: Yup.date()
    // .min(
    //   Yup.ref('createdAt'),
    //   '*  تاريخ الإنتهاء لا يجب ان يكون قبل تاريخ الإنشاء *'
    // )
    // .required(' * من فضلك ادخل تاريخ الأنتهاء* '),
 
}
)

export const login = Yup.object({
   
    name : Yup.string().matches(arabic , 'من فضلك ادخل الأسم ب اللغه العربيه').min(12,'اسم الموظف يجب ان يكون ثلاثي').required("* من فضلك ادخل اسم الموظف * " ),
    username : Yup.string().matches(notArabic , "غير مسموح ب أدخال الأيميل باللغه العربيه").matches(capNum, 'اسم المستخدم يجب ان يكون مزيج من حرف كبير و صغير و ارقام ').required("* من فضلك ادخل الإيميل * " ),
    password : Yup.string().matches(notArabic , "غير مسموح ب أدخال الباسورد باللغه العربيه").matches(pass, '  الباسورد على الأقل 10 حروف يجب ان يكون به حرف كبير و صغير و ارقام و رموز [*#^!@$&]').min(10 ,'الباسورد لا يجب ان يكون اقل من 10 حروف').required("* من فضلك ادخل الباسورد * " ),

    
    
}
)