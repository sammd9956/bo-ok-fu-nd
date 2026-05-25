// import React from 'react'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

// const MySelect = () => {
//   return (
//     <div>
//         <Select>
//       <SelectTrigger className="w-full max-w-48 border border-solid border-gray-300 px-4 py-2 text-gray-500 outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
//         <SelectValue placeholder="Select a fruit" />
//       </SelectTrigger>
//       <SelectContent className="bg-white">
//         <SelectGroup>
//           <SelectLabel>Fruits</SelectLabel>
//           <SelectItem value="apple">Apple</SelectItem>
//           <SelectItem value="banana">Banana</SelectItem>
//           <SelectItem value="blueberry">Blueberry</SelectItem>
//           <SelectItem value="grapes">Grapes</SelectItem>
//           <SelectItem value="pineapple">Pineapple</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//     </div>
//   )
// }

// export default MySelect



import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'

const MySelect = ({ goalPrice, selectedGoal, setSelectedGoal }) => {
 
  return (
    <div>
      <Select 
       value={selectedGoal}
        onValueChange={(value) => setSelectedGoal(value)}
      >
        <SelectTrigger className="w-full max-w-48 border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 rounded-md shadow-sm outline-none focus:ring-none focus:ring-primary-color/40 focus:border-primary-color transition-all">
          <SelectValue placeholder="Select Goal" className="text-xs font-medium text-gray-500"/>
         
        </SelectTrigger>
 

        {/* <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg p-1 animate-in fade-in zoom-in-95 !max-h-60 !overflow-y-auto"> */}
        <SelectContent
          position="popper"
          side="bottom"
          align="start"
          className="bg-white border border-gray-300 rounded-lg shadow-lg p-1 animate-in fade-in zoom-in-95 max-h-60 overflow-y-auto"
        >
          <SelectGroup>
            <SelectLabel className="px-3 py-2 text-xs font-medium text-gray-500">
              Goal
            </SelectLabel>

            {
              goalPrice.map((price, index) => (
                <SelectItem
                  key={index}
                  value={Number(price)}
                  className="px-3 py-2 rounded-md cursor-pointer text-sm text-gray-800 
              hover:bg-primary-light hover:text-primary-color
              focus:bg-primary-light focus:text-primary-color
              data-[state=checked]:bg-primary-color data-[state=checked]:text-white
              transition-colors"
                >
                  {price}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default MySelect