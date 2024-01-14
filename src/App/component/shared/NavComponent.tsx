import React from "react";

function NavComponent(props:{addNote:any}) {
    return (
        <nav className="bg-white rounded-full w-full flex justify-between p-5 mt-5">
            <div className="flex justify-start items-center">
                <div className="bg-blue-500 rounded-full cursor-pointer py-3 px-8 text-white">All Notes</div>
                <div className="text-blue-500 cursor-pointer mx-4">Viewed</div>
                <div className="text-blue-500 cursor-pointer mx-4">Edited</div>
                <div className="text-blue-500 cursor-pointer mx-4">Important</div>
            </div>
            <div onClick={()=>props.addNote()} className="bg-blue-500 rounded-full cursor-pointer py-3 px-8 text-white">Add Notes</div>
        </nav>
    )
}

export default NavComponent