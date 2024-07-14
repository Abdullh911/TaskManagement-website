import Signup from './Components/Signup';
import './App.css';
import { Store } from './Store';
import { useContext, useEffect, useState } from 'react';
import Tasks from './Components/Tasks';
import OnGoing from './Components/OnGoing';
import SideBar from './Components/SideBar';
import Done from './Components/Done';
import Ai from './Components/Ai';
function App() {
  let store=useContext(Store);
  let [logged,setLogged]=useState(false);
  useEffect(()=>{
    console.log(store.currUser);
    
    localStorage.setItem("currUser",JSON.stringify(store.currUser));
    console.log(JSON.parse(localStorage.getItem("currUser")));
    if(!store.currUser){
      setLogged(false);
    }
    else{
      setLogged(true);
    }
    
  },[store.currUser]);
  useEffect(()=>{
    setInterval(()=>{
      runServer();
    },180000);
  },[]);
  function runServer(){
    fetch(`https://taskserver-iy1n.onrender.com/start`).then((response)=>{
        if(!response.ok){
            throw new Error(response);
        }
        else{
            return response.text();
        }
    }).then((data)=>{
        console.log(data);
    })
}
  return (
    <div className="container">
      {!logged&& <Signup/>}
      {logged &&
      <div className='manview'>
        <SideBar/>
        <Tasks/>
        <OnGoing/>
        <div className='doneai'>
          <h1 className='donetext'>Done Tasks</h1>
          <Done/>
          <h3>Schedule Using AI</h3>
          <div className='ay7aga'>
            <Ai/>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
