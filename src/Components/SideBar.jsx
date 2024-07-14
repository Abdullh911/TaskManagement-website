import { useContext, useEffect, useState } from 'react';
import logo from '../image-removebg-preview.png'
import { Store } from '../Store';
const SideBar = () => {
    let store=useContext(Store)
    let [showModal, setShowModal]=useState(false);
    let [takenTime,setTakenTime]=useState(0);
    let [showLoading,setShowLoading]=useState(false);
    useEffect(() =>{
        let totalTime=0;
        for(let i=0; i<store.currUser.done.length; i++){
            totalTime+=calculateTimeTaken(store.currUser.done[i].time,store.currUser.done[i].doneTime)
        }
        setTakenTime(totalTime);
    },[store.currUser])
    useEffect(()=>{
        runServer();
    },[])
    function runServer(){
            setShowLoading(true);
            fetch(`https://taskserver-iy1n.onrender.com/start`).then((response)=>{
                if(!response.ok){
                    throw new Error(response);
                }
                else{
                    return response.text();
                }
            }).then((data)=>{
                console.log(data);
                setShowLoading(false);
            })
    }
    function disableModal(){
        setShowModal(false);
    }
    function enableModal(){
        setShowModal(true);
    }
    function calculateTimeTaken(startTime, endTime) {
        let start = parseTime(startTime);
        let end = parseTime(endTime);
        if (end < start) {
            end.setDate(end.getDate() + 1);
        }
        let timeDifference = (end - start) / (1000 * 60);
        return timeDifference;
    }
    
    function parseTime(timeString) {
        let [time, period] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
        return new Date(0, 0, 0, hours, minutes);
    }
    return ( 
        <div className="sidebar">
            <img onClick={()=>{
                window.location.reload();
            }}  className='logo' src={logo} alt="" />
            <button onClick={enableModal}>Stats</button>
            <button onClick={()=>{
            localStorage.removeItem("currUser");
            window.location.reload();
            }} >Logout
            </button>
            {showModal && <div className='allmodal'>
                <div style={{padding:'35px'}} className='modal'>
                    <i style={{cursor:'pointer'}} onClick={disableModal} className="fa-solid fa-x fa-xl"></i>
                    <h1 style={{textAlign:'center'}}>Stats</h1>
                    <h3>To Do tasks: {store.currUser.tasks.length} tasks</h3>
                    <h3>On Going tasks: {store.currUser.ongoing.length} tasks</h3>
                    <h3>Done tasks: {store.currUser.done.length} tasks</h3>
                    <h5>Average time for completeing task: {Math.round(takenTime/store.currUser.done.length)} mins</h5>
                </div>
                <div onClick={disableModal} className='backdrop'>

                </div>
            </div>}
            {showLoading && <div className='allmodal'>
                <div id='loads' style={{padding:'35px'}} className='modal'>
                    <div class="spinner center">
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                            <div class="spinner-blade"></div>
                    </div>
                </div>
                <div className='backdrop'>

                </div>
            </div>}
        </div>
     );
}
 
export default SideBar;