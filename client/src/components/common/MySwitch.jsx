import React from "react";
import { Switch } from "../ui/switch";
import axios from "axios";
import { server } from "@/constatnts/config";

const MySwitch = ({ checked, setChecked, campId }) => {

  const changeHandler = async (value) => {
    
    try {
      const res = await axios.get(
        `${server}/api/v1/camp/check-campaign-expires/${campId}`,
        { withCredentials: true }
      );
      

      
      setChecked("completed");

    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex items-center gap-3">

      <Switch
        checked={checked}
        onCheckedChange={changeHandler}
        className={`
          peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent
          transition-colors

          ${checked === "active" ? "bg-green-500" : "bg-gray-400"}

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

      <span className={`text-xs font-medium ${
        checked ? "text-green-600" : "text-gray-500"
      }`}>
        {checked ? "Active" : "Completed"}
      </span>

    </div>
  );
};

export default MySwitch;