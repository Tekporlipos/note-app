import React from "react";

function NavComponent(props: {
  addNote: any;
  index: number;
  setIndex: Function;
}) {
  const navs = ["All Notes", "Viewed", "Edited", "Important"];
  return (
    <nav className="bg-white rounded-full w-full flex justify-between p-5 mt-5">
      <div className="flex justify-start items-center transition">
        {navs.map((value: string, i: number) => {
          if (i === props.index) {
            return (
              <div
                onClick={() => props.setIndex(i)}
                className="bg-blue-500 rounded-full cursor-pointer py-3 px-8 text-white"
              >
                {value}
              </div>
            );
          }
          return (
            <div
              onClick={() => props.setIndex(i)}
              className="text-blue-500 cursor-pointer mx-4"
            >
              {value}
            </div>
          );
        })}
      </div>
      <div
        onClick={() => props.addNote()}
        className="bg-blue-500 rounded-full cursor-pointer py-3 px-8 text-white"
      >
        Add Notes
      </div>
    </nav>
  );
}

export default NavComponent;
