import React from 'react'
import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import MyButton from '@/components/common/MyButton';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '@/constatnts/config';

const EGiftCard = () => {
      const [redeemCode, setRedeemCode] = useState("");
      const params = useParams();
      console.log("params", params);
      
      const navigate = useNavigate()
    
      // Generate new code every popup open
      useEffect(() => {
        if (open) {
          generateCode();
        }
      }, [open]);
    
      const generateCode = () => {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
        let random = "";
    
        for (let i = 0; i < 7; i++) {
          random += chars.charAt(
            Math.floor(Math.random() * chars.length)
          );
        }
    
        // setRedeemCode(`FUND-${random}`);
      };
    
      const handlePrint = () => {
        window.print();
      };


      useEffect(() => {
        console.log("chal gya");
        
  const fetchData = async () => {
    try {
      const res = await axios.get( `${server}/api/v1/red/get-redeem-data/${params.redemptionId}`, { withCredentials: true } );

      setRedeemCode( res.data?.redeemData?.gift_card_code );

    } catch (error) {
      console.log(error.response);
    }
  };

  if (params.redemptionId) {
    fetchData();
  }

}, [params.redemptionId]);
      
    
  return (
   <div className='container mx-auto px-2 lg:px-4 my-6'>
      <div className="border-[0.5px] border-solid border-black px-[71px] pt-[29px] pl-[15px] lg:pl-[30px] pr-4 lg:pr-8 pb-[56px] rounded-[20px] w-fit mx-auto bg-card-border flex flex-col items-center justify-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full lg:max-w-[500px]">
          {/* Icon */}
          <div className="flex justify-center mb-[19px]">
            <Gift className="h-12 w-12 text-violet-600" />
          </div>

          {/* Heading */}
          <h1 className="text-center text-[32px] font-poppins font-bold text-black mb-[28px]">
            Funds Issued!
          </h1>

          {/* Description */}
          <p className="mx-auto text-center text-[15px] text-black font-popppins max-w-[400px] mb-[33px]">
            Your funds have been successfully converted.
            Use the code below at your Bookworm
            Central fair.
          </p>

          {/* Barcode Box */}
          <div className="rounded-[28px] border border-black [border-width:0.5px] bg-white shadow-sm pt-[13px] px-8 pb-[20px] mb-10">
            <p className="text-center text-[15px] font-medium font-poppins text-black">
              Redemption Code
            </p>

            <div className="flex justify-center overflow-hidden">
              <Barcode
                value={redeemCode}
                format="CODE128"
                // width={2}
                width={window.innerWidth < 400 ? 1 : window.innerWidth < 786 ? 1.5 : 2}
                height={90}
                displayValue={false}
                background="transparent"
                lineColor="#111827"
                margin={0}
              />
            </div>

            <h2 className="text-center text-[25px] font-bold font-poppins tracking-wide text-black">
              {redeemCode}
            </h2>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 lg:flex-row items-center justify-center w-full lg:w-fit">
            <MyButton variant='primary' text='Print Code' style='w-full flex-1' onClick={() => handlePrint} />
            <MyButton variant='secondary' text='Back to Dashboard' onClick={()=>navigate("/dashboard")} style='w-full flex-1'/>
          </div>
        </div>
   </div>
  )
}

export default EGiftCard;