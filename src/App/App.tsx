import React, { useEffect, useState } from "react";
import "./App.css";
import CardComponent from "./component/notes/CardComponent";
import NavComponent from "./component/shared/NavComponent";
import ContentModalComponent from "./component/shared/ContentModalComponent";
import InputModalComponent from "./component/shared/InputModalComponent";
import {
  IResponse,
  IResponseData,
  NoteResponseType,
  request,
} from "../utils/dataTypes";
import {
  deleteFetchData,
  filterData,
  getFetchData,
  patchFetchData,
  postFetchData,
} from "../utils/helpers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showInputView, setShowInputView] = useState(false);
  const [state, setState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<request>({ body: "", title: "", id: null });
  const [notes, setNotes] = useState<IResponseData>({} as IResponseData);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    setInterval(()=>{
      getData("Notes refreshed successfully");
    },5*60*1000)
  },[])


  function getData(message:string|null=null) {
    getFetchData<IResponse>(`note`)
        .then((value) => {
          setNotes(value.data);
          showToast(message??value.message,false)
        })
        .catch((error) => {
          showToast(error.message)
        });
  }

  function addNote() {
    setData({ body: "", title: "", id: null });
    setShowInputView(true);
    setState(false);
  }

  function changeData(key: string, value: string) {
    setData((prevState: request) => {
      return { ...prevState, [key]: value };
    });
  }

  function action(action: string, payload: NoteResponseType) {
    const item: string = localStorage.getItem(action) ?? "[]";
    const parse: Array<string> = JSON.parse(item);
    parse.push(payload.id);
    switch (action) {
      case "view":
        setData({ body: payload.body, title: payload.title, id: payload.id });
        setShowModal(true);
        setState(false);
        localStorage.setItem(
          action,
          JSON.stringify(Array.from(new Set(parse))),
        );
        break;
      case "edit":
        setData({ body: payload.body, title: payload.title, id: payload.id });
        setShowInputView(true);
        localStorage.setItem(
          action,
          JSON.stringify(Array.from(new Set(parse))),
        );
        setState(true);
        break;
      case "delete":
        setData({ body: payload.body, title: payload.title, id: payload.id });
        setShowModal(true);
        setState(true);
        break;
    }
  }

  function postData(action: boolean, type: null = null) {
    if (action) {
      patchFetchData<any, request>(("note/" + data.id) as string, data).then(
        (value) => {
          const newNotes: NoteResponseType[] = notes.notes.map((value1) => {
            if (value1.id === value.data.id) {
              return { ...value1, body: data.body };
            }
            return value1;
          });
          setNotes((prevState) => {
            return { ...prevState, notes: newNotes };
          });
          showToast(value.message,false)
        },
      ).catch((error) => {
        showToast(error.message)
      });
    } else {
      postFetchData<any, request>("note", data).then((value) => {
        const newNotes: NoteResponseType[] = [value.data, ...notes.notes];
        setNotes((prevState) => {
          return { ...prevState, notes: newNotes };
        });
        showToast(value.message,false)
      }).catch((error) => {
        showToast(error.message)
      });
    }
    if (!type) {
      setShowInputView(false);
    }
  }

  function deletePost() {
    deleteFetchData(("note/" + data.id) as string).then((value:any) => {
      const newNotes: NoteResponseType[] = notes.notes.filter(
        (value1) => value1.id !== data.id,
      );
      setNotes((prevState) => {
        return { ...prevState, notes: newNotes };
      });
      showToast(value.message,false)
    }).catch((error) => {
      showToast(error.message)
    });
    setShowModal(false);
  }

  function showToast(message:string, type:boolean=true){
    if (type){
      toast.error(message);
    }else {
      toast.success(message);
    }
  };


  return (
    <div className="my-5 md:container">
      <NavComponent setIndex={setIndex} index={index} addNote={addNote} />
      <div className="mx-3 md:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
        {filterData(notes?.notes, index).map((value: NoteResponseType) => (
          <CardComponent action={action} data={value} key={value.id} />
        ))}
      </div>
      {showInputView ? (
        <InputModalComponent
          state={state}
          postData={postData}
          changeData={changeData}
          data={data}
          setShowView={setShowInputView}
        />
      ) : null}
      {showModal ? (
        <ContentModalComponent
          deletePost={deletePost}
          state={state}
          data={data}
          setInputShow={setShowModal}
        />
      ) : null}
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </div>
  );
}

export default App;
