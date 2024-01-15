import React from "react";
import { request } from "../../../utils/dataTypes";
import { debounce } from "../../../utils/helpers";

function InputModalComponent(props: {
  setShowView: any;
  data: request;
  changeData: Function;
  state: boolean;
  postData: Function;
}) {
  const debouncedFunction = debounce((value: any) => {
    if (props.state) {
      props.postData(props.state, "edit");
    }
  }, 5*1000);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                      <title>map-plus</title>
                      <path
                        fill="blue"
                        d="M9,3L3.36,4.9C3.16,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.6,21 3.66,20.97L9,18.9L13.16,20.36C13.06,19.92 13,19.46 13,19C13,18.77 13,18.54 13.04,18.3L9,16.9V5L15,7.1V14.56C16.07,13.6 17.47,13 19,13C19.7,13 20.37,13.13 21,13.36V3.5A0.5,0.5 0 0,0 20.5,3H20.34L15,5.1L9,3M18,15V18H15V20H18V23H20V20H23V18H20V15H18Z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg leading-6 text-gray-900 ms-5">
                    {props.state ? "Edit" : "Add"} Notes
                  </h3>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-5">
                    <label
                      htmlFor="title"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Note Title
                    </label>
                    <input
                      disabled={props.state}
                      type="text"
                      onChange={(value) =>
                        props.changeData("title", value.target.value)
                      }
                      value={props.data.title}
                      className="block w-full rounded-md border-0 p-1.5
                                        pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 capitalize"
                      placeholder="Title"
                    />

                    <label
                      htmlFor="description"
                      className="block font-medium leading-6 text-gray-900 mt-5"
                    >
                      Note Description
                    </label>
                    <textarea
                      id="description"
                      onChangeCapture={(inputValue) =>
                        debouncedFunction(inputValue)
                      }
                      onChange={(value) =>
                        props.changeData("body", value.target.value)
                      }
                      value={props.data.body}
                      rows={5}
                      className="block w-full rounded-md border-0 p-1.5
                                        pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Description"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => props.postData(props.state)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Save
              </button>
              <button
                onClick={() => props.setShowView(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputModalComponent;
