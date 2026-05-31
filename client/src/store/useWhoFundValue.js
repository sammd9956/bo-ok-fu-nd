import { create } from "zustand";

const useWhoFundValue = create((set)=>({
    radioBtnValue:"class",
    setRadioBtnValue:(value)=>set(()=>({radioBtnValue:value}))
}))

export default useWhoFundValue;