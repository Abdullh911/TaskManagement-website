import { useState ,useEffect } from "react";
import OnGoingCard from "./OnGoingCard";
import { Store } from "../Store";
import { useContext } from "react";
import DoneCard from "./DoneCard";
const Done = () => {
    let store=useContext(Store);
    let [done,setDone]=useState([]);
    useEffect(()=>{
        let userongoing=store.currUser.done;
        console.log(userongoing);
        let temp=[];
        // let temp=userongoing.map((task,index)=>{
        //     return <DoneCard doneTime={task.doneTime} time={task.time} color={task.color} content={task.content} key={index} id={task.id}/>
        // })
        for(let i=userongoing.length-1;i>=0;i--){
            temp.push(<DoneCard doneTime={userongoing[i].doneTime} time={userongoing[i].time} color={userongoing[i].color} content={userongoing[i].content} key={i} id={userongoing[i].id}/>)
        }
        setDone(temp);
    },[store.currUser]);
    return ( 
        <div className="done">
            
            {done}
        </div>
     );
}
 
export default Done;