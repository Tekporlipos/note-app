import App from "../../App";
import React from "react";
import {request} from "../../../utils/dataTypes";

function ContentModalComponent(props:{setInputShow:any,data:request,state:boolean,deletePost:Function}) {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${props.state? 'bg-red-100': 'bg-green-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                                    {props.state?
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>:
                                        <svg className="h-6 w-6 " viewBox="0 0 24 24">
                                        <title>note</title>
                                        <path fill="green"
                                              d="M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z"/>
                                    </svg>}
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900 capitalize">{props.data.title}</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {props.state?'Are you sure you want to delete this Note? It will be permanently removed. This action cannot be undone.':props.data.body}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {props.state?<button onClick={()=>props.deletePost()} type="button"
                                     className="inline-flex w-full justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-300 sm:ml-3 sm:w-auto">Delete</button>:null}
                            <button onClick={()=>props.setInputShow(false)} type="button" className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm ${props.state?' bg-red-600 hover:hover:bg-red-500 text-white ':' bg-white text-gray-900'} font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto`}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentModalComponent;