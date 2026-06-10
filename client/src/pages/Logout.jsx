import React from 'react';
import { MdLogout } from "react-icons/md";

const Logout = () => {
  return (
    <div className=" bg-blue-500 text-white rounded-lg p-2 hover:bg-red-600 transition cursor-pointer">
  <MdLogout size={24} />
</div>
  )
}

export default Logout