import { useContext,useState } from "react";
import { Store } from "../Store";
const TaskCard = (props) => {
    let store=useContext(Store);
    let [loading,setLoading]=useState(false);
    function sendOngoing(){
        setLoading(true);
        fetch(`https://taskserver-iy1n.onrender.com/sendOngoing/${props.id}/${store.currUser._id}`).then((response)=>{
            if(!response.ok){
                throw new Error(response);
            }
            else{
                return response.json();
            }
        }).then((data)=>{
            console.log(data);
            store.updateCurrUser(data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
        })
    }
    function removeTask(){
        fetch(`https://taskserver-iy1n.onrender.com/removeTask/${props.id}/${store.currUser._id}`).then((response)=>{
            if(!response.ok){
                throw new Error(response);
            }
            else{
                return response.json();
            }
        }).then((data)=>{
            console.log(data);
            store.updateCurrUser(data);
        })
    }
    return ( 
        <div style={{backgroundColor:props.color}} className="taskcard">
            <h2>{props.content}</h2>
            <div>
            {loading && <div class="spinner center">
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
                </div>}
                {!loading&&<button className="start" onClick={sendOngoing}>{<i className="fa-solid fa-play fa-xl"></i>}
                    
                </button>}
                <button className="start" onClick={removeTask}><i className="fa-solid fa-ban fa-xl"></i></button>
            </div>
        </div>
     );
}
 
export default TaskCard;