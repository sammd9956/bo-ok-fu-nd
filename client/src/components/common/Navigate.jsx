import { Eye } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Navigate = ({fundCode}) => {
    const navigate = useNavigate();
    const params = useParams();
    console.log("params", params.don_id);
    
    return (
        <p
            onClick={() => navigate(`/campaign/view-campaign/${fundCode}`)}
            className="group flex items-center gap-2 cursor-pointer w-fit font-poppins font-semibold text-[13px] transition-all duration-300 ease-in-out active:translate-y-0.5"
        >
            <span className="bg-primary-color group-hover:bg-primary-color-dark rounded-full p-2 flex items-center justify-center transition-all duration-300 ease-in-out">
                <Eye color="#FFF" size={18} />
            </span>

            <span className="text-purple-purple-500 group-hover:text-primary-color-dark transition-all duration-300 ease-in-out text-nowrap">
                View Campaign
            </span>
        </p>
    )
}

export default Navigate