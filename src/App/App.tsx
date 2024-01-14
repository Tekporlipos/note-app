import React, {useEffect, useState} from 'react';
import './App.css';
import CardComponent from "./component/notes/CardComponent";
import NavComponent from "./component/shared/NavComponent";
import ContentModalComponent from "./component/shared/ContentModalComponent";
import InputModalComponent from "./component/shared/InputModalComponent";
import {IResponse, IResponseData, NoteResponseType, request} from "../utils/dataTypes";
import {deleteFetchData, getFetchData, patchFetchData, postFetchData} from "../utils/helpers";

function App() {
    const [showInputView, setShowInputView] = useState(false);
    const [state, setState] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<request>({body:"", title:"",id:null})
    const [notes, setNotes] = useState<IResponseData>({} as IResponseData)

    useEffect(()=>{
        getFetchData<IResponse>("note?page=1&page_size=20").then(value => {
            setNotes(value.data)
        }).catch(error=>{

        });
    },[])

    function addNote() {
        setData({body:"",title:"",id:null})
        setShowInputView(true)
        setState(false);
    }


    function changeData(key: string, value: string) {
        setData((prevState: request) => {
            return { ...prevState, [key]: value };
        });
    }

    function action(action:string,payload:NoteResponseType) {
        switch (action) {
            case "view":
                setData({body:payload.body,title:payload.title,id:payload.id})
                setShowModal(true);
                setState(false);
                break;
            case "edit":
                setData({body:payload.body,title:payload.title,id:payload.id})
                setShowInputView(true)
                setState(true);
                break;
            case "delete":
                setData({body:payload.body,title:payload.title,id:payload.id})
                setShowModal(true)
                setState(true);
                break;
        }
    }


    function postData(action:boolean,type:null=null) {
        if (action){
            patchFetchData<any,request>("note/"+data.id as string,data).then(value => {
                const newNotes:NoteResponseType[] = notes.notes.map((value1) => {
                    if (value1.id === value.data.id){
                        return {...value1, body:data.body}
                    }
                    return value1;
                });
                setNotes(prevState => {return {...prevState,notes:newNotes};})
            });
        }else{
            postFetchData<any,request>("note",data).then(value => {
                const newNotes:NoteResponseType[] = [value.data,...notes.notes]
                setNotes(prevState => {return {...prevState,notes:newNotes};})
            });
        }
        if (!type){setShowInputView(false)}
    }

    function deletePost() {
        deleteFetchData("note/"+data.id as string).then(value => {
            const newNotes:NoteResponseType[] = notes.notes.filter((value1) => value1.id !== data.id);
            setNotes(prevState => {return {...prevState,notes:newNotes};})
        });
        setShowModal(false);
    }

  return (
   <div  className="container">
     <NavComponent addNote={addNote} />
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
           {notes?.notes?.map((value:NoteResponseType) => <CardComponent action={action} data={value} key={value.id}/>)}
       </div>
       {showInputView?<InputModalComponent state={state} postData={postData} changeData={changeData} data={data} setShowView={setShowInputView} />:null}
       {showModal?<ContentModalComponent deletePost={deletePost} state={state} data={data} setInputShow={setShowModal}/>:null}
   </div>
  );
}




export default App;
