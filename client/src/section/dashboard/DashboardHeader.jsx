import MyButton from "@/components/common/MyButton";
import Navigate from "@/components/common/Navigate";
import CopyCampaign from "@/components/dashboard/CopyCampaign";
import useWhoFundValue from "@/store/useWhoFundValue";
import { SquarePen } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({
  campaigns,
  setCampId,
  selectedCampaign,
  setSelectedCampaign,
}) => {
  const { radioBtnValue, setRadioBtnValue } = useWhoFundValue();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mb-6 lg:mb-12">
      <div className="mb-5 lg:mb-0 w-full lg:w-fit">
        <div className="flex items-center gap-8">
          <p className="text-gray-800 text-[32px] lg:text-[40px] font-poppins font-semibold mb-1.5">
            Campaign Dashboard
          </p>
          {user?.role != "class" && (
            <MyButton
              variant="primary"
              text="Create New Campaign"
              style="px-4 py-2.5"
              onClick={() => navigate("/create-new-campaign")}
            />
          )}
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-[7px] lg:gap-[15px] relative">
          {/* <p className='text-gray-800 text-xl font-poppins font-bold'>{user?.fund_type}: <span className='font-normal'>{user?.fund_name.toUpperCase()}</span></p> */}
          {user?.role === "class" ? (
            <p className="text-gray-800 text-xl font-poppins font-bold">
              {" "}
              {user?.role == "class" ?  "My Class" : ""}:{" "}
              <span className="font-normal">
                {" "}
                {selectedCampaign?.campaign_name?.toUpperCase()}{" "}
              </span>{" "}
            </p>
          ) : (
            <>
            <p className="text-gray-800 text-xl font-poppins font-bold">{user?.role == "school" ? "Whole Schoole" : ""}: {selectedCampaign?.campaign_name.toUpperCase()}</p>
            <div className="absolute top-full ">
            <select
              value={selectedCampaign?.campaign_id || ""}
              className="border px-3 py-1 rounded text-gray-800 text-xl font-poppins"
              onChange={(e) => {
                const campaign = campaigns.find(
                  (c) => c.campaign_id === Number(e.target.value),
                );

                setSelectedCampaign(campaign);
              }}
            >
              {campaigns.map((campaign) => (
                <option key={campaign.campaign_id} value={campaign.campaign_id}>
                  {campaign.campaign_name.toUpperCase()}
                </option>
              ))}
            </select>
            </div>
            </>
          )}

          <p
            onClick={() => navigate(`/edit-campaign/${selectedCampaign?.campaign_id}`)}
            className="group flex items-center gap-2 cursor-pointer w-fit font-poppins font-semibold text-[10px] transition-all duration-300 ease-in-out active:translate-y-0.5"
          >
            <span className="bg-primary-color group-hover:bg-primary-color-dark rounded-full p-1 flex items-center justify-center transition-all duration-300 ease-in-out">
              <SquarePen color="#FFF" size={12} />
            </span>

            <span className="text-gray-800 group-hover:text-primary-color-dark transition-all duration-300 ease-in-out font-normal">
              Edit campaign
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-[12px] lg:gap-[30px] w-full lg:w-fit">
        <CopyCampaign
          fundCode={selectedCampaign?.fund_code}
          campaignId={selectedCampaign?.campaign_id}
        />
        <Navigate fundCode={selectedCampaign?.fund_code} campaignId={selectedCampaign?.campaign_id} />
      </div>
    </div>
  );
};

export default DashboardHeader;
