import React from 'react';
import './App.css';

function App() {
  return (
   <div className="container">
     <nav className="bg-white rounded-full w-full flex justify-between p-5">
        <div className="flex justify-start">
            <div className="bg-blue-500 rounded-full cursor-pointer py-3 px-8 text-white">All Notes</div>
            <div>Business</div>
            <div>Business</div>
            <div>Business</div>
        </div>
         <div><div className="bg-blue-500 rounded-full cursor-pointer py-3 px-8 text-white">All Notes</div></div>
     </nav>
   </div>
  );
}

export default App;
