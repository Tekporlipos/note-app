import React from "react";
import {NoteResponseType} from "../../../utils/dataTypes";
import {formatDate} from "../../../utils/helpers";

function CardComponent(prop:{data:NoteResponseType,action:Function}) {
 return (
     <div className="bg-white rounded-lg py-5">
         <div className=" border-l-4 px-5 py-1 border-gray-600 flex flex-col">
             <div className="font-bold text-lg line-clamp-1 capitalize">{prop.data.title}</div>
             <div className="font-light">{formatDate(prop.data.created_at)}</div>
         </div>
         <div className="mt-5 mx-6 font-light line-clamp-6">
             {prop.data.body}
         </div>

         <div className="flex justify-between items-center mt-5 ">
             <div className="ms-6 font-light flex">
                 <svg className="me-3 cursor-pointer" width="24" height="24" viewBox="0 0 24 24"><title>Important</title><path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" /></svg>
             </div>
             <div className="me-6 relative dropdown">
                 <svg className="cursor-pointer" width="32" height="32" viewBox="0 0 24 24"><title>more</title><path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" /></svg>
                 <div className="absolute dropdown-content right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden hover:block"  >
                     <div className="py-1 " role="none">
                         <li onClick={()=>prop.action("view",prop.data)} className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer" >View</li>
                         <li onClick={()=>prop.action("edit",prop.data)} className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer" >Edit</li>
                         <li onClick={()=>prop.action("delete",prop.data)} className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer" >Delete</li>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 )
}
export default CardComponent