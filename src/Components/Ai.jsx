import { useContext, useRef, useState } from "react";
import { Store } from "../Store";

const Ai = () => {
    
    let [loading,setLoading]=useState(false);
    let selectFromRef=useRef(null);
    let selectToRef=useRef(null);
    let store=useContext(Store);
    let timeFromRef=useRef("");
    let timeToRef=useRef("");
    let [schedule,setSchedule]=useState([]);
    async function ai(){
        if(store.currUser.tasks.length<=0 || timeFromRef.current.value==="" || timeToRef.current.value===""){
            return
        }
        setSchedule([])
        setLoading(true);
        await AiCall();
    }
    async function AiCall(){
        let res;
        let query=getText();
        console.log(query);
        fetch(`https://taskserver-iy1n.onrender.com/gpt/${query}`).then((response) =>{
            return response.json();
        }).then((data)=>{
            console.log(data.res);
            res=data.res;
            let steps=splitStringToList(res);
            console.log(steps);
            let temp=steps.map((step)=>{
                return <h4>{step}</h4>
            })
            setLoading(false);
            setSchedule(temp);
        })
        
    
    }
    function splitStringToList(str) {
        const splitArray = str.split(/\d+\.\s/).filter(Boolean);
        return splitArray;
    }
    function getText(){
        let str="I want a day plan to make "
        let temp=store.currUser.tasks;
        for(let i=0; i<temp.length-1; i++){
            str+=temp[i].content+" and "
        }
        str+=temp[temp.length-1].content;
        str+=" and i will start from "+ timeFromRef.current.value+selectFromRef.current.value+" to "+timeToRef.current.value+selectToRef.current.value;
        str+=" make your response in the form 1. task 2. task etc"
        return str
    }
    return ( 
        <div className="ai">
            <div className="settings" style={{textAlign:'center'}}>
                <span>from</span>
                <input ref={timeFromRef} type="text" />
                <select id="selectOption" ref={selectFromRef}>
                    <option value="PM">PM</option>
                    <option value="AM">AM</option>
                </select>
                <span>to</span>
                <input ref={timeToRef} type="text" />
                <select id="selectOption" ref={selectToRef}>
                    <option value="PM">PM</option>
                    <option value="AM">AM</option>
                </select>
                <button className="create" onClick={ai}>Create schedule</button>
            </div>
            {loading&&<div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>}

            <div className="schedule">
                {schedule}
            </div>
        </div>
     );
}
 
export default Ai;