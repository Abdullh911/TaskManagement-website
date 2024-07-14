import { useContext, useEffect,useRef,useState } from "react";
import { Store } from "../Store";
import TaskCard from "./TaskCard";
const Tasks = () => {
    let taskRef=useRef("")
    let store=useContext(Store);
    const [tasks, setTasks] = useState([]);
    let [curr,setCurr]=useState(store.currUser);
    const shinyColors = [
        "#ff0000", // Red
        "#00ff00", // Green
        "#0000ff", // Blue
        "#ffff00", // Yellow
        "#ff00ff", // Magenta
        "#00ffff", // Cyan
        "#ff7f00", // Orange
        "#7fff00", // Chartreuse
        "#ff1493", // Deep Pink
        "#9400d3"  // Dark Violet
      ];
      function getRandomNumber() {
        const randomNumber = Math.random();
        const scaledNumber = Math.floor(randomNumber * 10);
        return scaledNumber;
      }
    useEffect(()=>{
        console.log("jnhvgt");
        let usertasks=store.currUser.tasks;
        console.log(usertasks);
        let temp=usertasks.map((task,index)=>{
            return <TaskCard color={task.color} content={task.content} key={index} id={task.id}/>
        })
        setTasks(temp);
        console.log(tasks);
    },[store.currUser,curr]);
    
    function addTask(){
        if(taskRef.current.value==""){
            return
        }
        let newObj = { ...store.currUser };
        let newTask={
            content:taskRef.current.value,
            id:newObj.uniId+1,
            color:shinyColors[getRandomNumber()]
        }
        newObj.tasks.push(newTask);
        newObj.uniId++;
        console.log(newObj);
        setCurr(newObj);
        store.updateCurrUser(newObj);
        console.log(newObj,"look here");
        fetch("https://taskserver-iy1n.onrender.com/addtask",{
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body:JSON.stringify(newObj)
        }).then((response)=>{
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
            else{
                
                return response.json();
            }
        }).then((data)=>{
            setCurr(data);
            store.updateCurrUser(data);
        })
        taskRef.current.value="";
    }

    return ( 
    <div className="alltaskdiv">
        <div className="search">
            <input ref={taskRef} maxLength={50} placeholder="Add Task..." type="text"/>
            <button type="Submit" onClick={addTask} >ADD</button>
        </div>
        
        <div className="tasks">
            {tasks}
        </div>
        
           
    </div> 
    );
}
 
export default Tasks;