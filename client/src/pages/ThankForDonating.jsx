import facebook from "@/assets/facebook.png"
import link from "@/assets/link.png"
import verifiedImage from "@/assets/verified.png"
import MyButton from '@/components/common/MyButton'
import { server } from '@/constatnts/config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



const ThankForDonating = () => {
    const [paymentDetails, setPaymentDetails] = useState()
    const location = useLocation();
     const navigate = useNavigate()
    //   const donatedAmount = location.state?.donatedAmount;
    //   const uuid = location.state?.uuid;
    //   const campaign = location.state?.campaign;
      const params = new URLSearchParams(location.search);
       const paymentid = params.get("reference");

      useEffect(() => {        

        try {
            const fetchPaymentDetails = async() =>{
            const res = await axios.get(`${server}/api/v1/raz/get-payment-details/${paymentid}`, {withCredentials: true});
            setPaymentDetails(res?.data?.paymentDetails);          
        }
        fetchPaymentDetails()
        } catch (error) {
            console.log(error);            
        }      
       
      }, [paymentid])

    return (
        <div className='container mx-auto px-2 lg:px-4 flex items-center justify-center my-6'>
            <div className="border-[0.5px] border-solid border-black rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] grid grid-cols-1 lg:grid-cols-3 w-full lg:w-3/4 mx-auto">
                <div className='bg-ivary-mist border-r-[0.5px] border-ice-gray px-[24px] lg:px-[45px] rounded-tl-[20px] rounded-tr-[20px] lg:rounded-tr-0 rounded-bl-[20px] pb-4 lg:pb-0'>
                    <div className='pt-[41px] lg:pb-[90px]  flex flex-col items-center justify-center'>
                        <img src={verifiedImage} alt={verifiedImage} className='w-[123px] h-[123px]' />
                        <p className='text-black font-poppins text-[40px] font-bold mb-4.5 text-wrap lg:text-nowrap'>Thank You!</p>
                        <p className='text-black font-poppins text-[20px] text-center mb-2'>Your contribution is helping Mrs. Jackson’s class get closer to their reading goals</p>
                        <div className='border-[0.5px] border-mist-gray rounded-[10px] pt-[15px] pb-2.5 flex flex-col items-center justify-center w-full bg-white mb-[22px]'>
                            <p className='text-slate-gray font-poppins text-sm font-semibold'>AMOUNT DONATED</p>
                            <p className='text-outline-border font-poppins text-[36px] font-semibold'>${Number(paymentDetails?.amount).toFixed(2)}</p>
                        </div>
                        <p className='text-black font-poppins text-sm '>Receipt sent to your email</p>
                    </div>

                </div>
                <div className='lg:col-span-2 bg-white pt-14 flex flex-col items-center lg:rounded-tr-[20px] rounded-bl-[20px] lg:rounded-bl-[20px] rounded-br-[20px] border-t-[0.5px] lg:border-t-0 border-ice-gray px-[24px]'>

                    {/* <div className='text-left'> */}
                        <p className='text-black font-poppins text-[20px] font-bold mb-5'>
                            ❤️ Spread the Word
                        </p>

                        <p className='text-black font-poppins text-base mb-11 w-3/4 text-center'>
                            Campaigns reach their goals 3x faster when shared by supporters.
                            Help the Class Book Fund Today
                        </p>

                        <div className='border-[0.5px] border-frosted-blue rounded-[10px] pt-2.5 pb-[9px] flex items-center justify-center gap-8 px-4 lg:px-12  mb-[22px] w-full lg:w-3/4'>
                            <img src={facebook} alt={facebook} className='w-12 h-12' />
                            <p className='text-black font-poppins text-base font-medium'>Share on Facebook</p>
                        </div>
                        <div className='border-[0.5px] border-frosted-blue rounded-[10px] pt-2.5 pb-[9px] flex items-center justify-center gap-8 px-4 lg:px-12 mb-8 lg:mb-24 w-full lg:w-3/4'>
                            <img src={link} alt={link} className='w-12 h-12' />
                            <p className='text-black font-poppins text-base font-medium'>Copy Campaign Link</p>
                        </div>

                          <MyButton variant='primary' text="Return to Campaign" style='w-full lg:w-3/4 mx-auto flex mb-3' onClick={()=>navigate(`/campaign/view-campaign?fund=${paymentDetails?.fund_code}&campaign=${paymentDetails?.campaign_id}`)}/>
                    {/* </div> */}

                </div>
            </div>
        </div>
    )
}

export default ThankForDonating