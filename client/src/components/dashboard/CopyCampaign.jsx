import React from 'react'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner';

const CopyCampaign = ({fundCode}) => {
  const handleCopyCampaignLink = async () => {
    // const currentLink = window.location.href;
    const currentLink = `${window.location.origin}/campaign/view-campaign/${fundCode}`;
    console.log("currr",currentLink);
    
    try {
        await navigator.clipboard.writeText(currentLink);
        // alert("Campaign link copied!");
          toast.info("Campaign link copied",{
  className: "!bg-white !text-black !border !border-primary-color !rounded-lg",}
);
    } catch (error) {
        console.error("Failed to copy link:", error);
    }
};

    return (
        <p
            onClick={handleCopyCampaignLink}
            className="group flex items-center gap-2 cursor-pointer w-fit font-poppins font-semibold text-[13px] transition-all duration-300 ease-in-out active:translate-y-0.5"
        >
            <span className="bg-primary-color group-hover:bg-primary-color-dark rounded-full p-2 flex items-center justify-center transition-all duration-300 ease-in-out">
                <Share2 color="#FFF" fill="#FFF" size={18} />
            </span>

            <span className="text-purple-purple-500 group-hover:text-primary-color-dark transition-all duration-300 ease-in-out text-nowrap">
                Copy Campaign Link
            </span>
        </p>
    )
}

export default CopyCampaign;

