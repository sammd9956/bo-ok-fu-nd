import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const MyRadioButton = ({ radioGroupData = [], labelStyle = "" ,setRadioBtnValue=""}) => {
    // const [value, setValue] = useState(radioGroupData[0] || "")
    const [value, setValue] = useState(radioGroupData[0]?.value || "")
    // setRadioBtnValue(value)
     const handleChange = (newValue) => {
    setValue(newValue);
    setRadioBtnValue(newValue);
  };
    return (
        <div>
            {/* <RadioGroup value={value} onValueChange={handleChange} defaultValue={radioGroupData[0]} className="w-fit"> */}
            <RadioGroup value={value} onValueChange={handleChange} defaultValue={radioGroupData[0]?.value} className="w-fit">
                <div className='flex items-center gap-4'>
                    {
                        radioGroupData.map((data, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <RadioGroupItem value={data.value} id={`r${index}`} className="border border-radio-border data-[state=checked]:border-primary-color data-[state=checked]:border-5 hover:cursor-pointer" />
                                {/* <Label htmlFor={`r${index}`} className={labelStyle}>{data}</Label> */}
                                <Label htmlFor={`r${index}`} className={labelStyle}>{data.label}</Label>
                            </div>
                        ))
                    }
                </div>
            </RadioGroup>
        </div>

    )
}

export default MyRadioButton