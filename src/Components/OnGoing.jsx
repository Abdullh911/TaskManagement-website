import { useState ,useEffect } from "react";
import OnGoingCard from "./OnGoingCard";
import { Store } from "../Store";
import { useContext } from "react";
const OnGoing = () => {
    let store=useContext(Store);
    let [ongoing,setOngoing]=useState([]);
    useEffect(()=>{
        console.log("jnhvgt");
        let userongoing=store.currUser.ongoing;
        console.log(userongoing);
        let temp=userongoing.map((task,index)=>{
            return <OnGoingCard time={task.time} color={task.color} content={task.content} key={index} id={task.id}/>
        })
        setOngoing(temp);
    },[store.currUser]);
    return ( 
        <div className="alltaskdiv">
            <h1>OnGoing</h1>
            <div className="tasks">
                {ongoing}
            </div>
        </div>
     );
}
 
export default OnGoing;