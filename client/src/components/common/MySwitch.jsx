import { server } from "@/constatnts/config";
import axios from "axios";
import toast from "react-hot-toast";
import { Switch } from "../ui/switch";

const MySwitch = ({ checked, setChecked, campId, campStatus }) => {
  console.log("chhhhh", checked);
  console.log("campStatus", campStatus);

  /* useEffect(() => {
    if (!campId) return;
  
    const getCampdata = async () => {
      try {
        const res = await axios.get(
          `${server}/api/v1/camp/check-campaign-expires/${campId}`,
          { withCredentials: true }
        );
  
        if (res.data.campaign.status === "completed") {
          setChecked(true);
        } else {
          setChecked(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getCampdata();
  }, [campId]); */


  const changeHandler = async(value) => {
    if(campStatus === "completed") return;

    try {
      const res = await axios.patch(`${server}/api/v1/camp/update-campaign-status`,{campaignId: campId}, {withCredentials: true})
console.log("vvvvv", res.data);
    } catch (error) {
      console.log(error.response);
      toast(error.response?.data?.message)
      throw(error)
      
    }

    setChecked(value);
  };

  return (
    <div className="flex items-center gap-3">

      <Switch
        checked={checked}
        onCheckedChange={changeHandler}
        className={`
          peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent
          transition-colors

          ${!checked ? "bg-green-500" : "bg-blue-400"}

          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2

          [&>span]:pointer-events-none
          [&>span]:block
          [&>span]:h-5
          [&>span]:w-5
          [&>span]:rounded-full
          [&>span]:bg-white
          [&>span]:shadow-lg
          [&>span]:transition-transform

          data-[state=checked]:[&>span]:translate-x-5
          data-[state=unchecked]:[&>span]:translate-x-0
        `}
      />

      <span className={`text-xs font-medium ${checked ? "text-green-600" : "text-gray-500"
        }`}>
        {checked ? "Completed" : "Active"}
      </span>

    </div>
  );
};

export default MySwitch;