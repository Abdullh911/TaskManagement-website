import {useEffect, useRef, useState,useContext} from "react";
import { Store } from "../Store";
const Signup = () => {
    useEffect(()=>{
        localStorage.removeItem("currUser");
    },[]);
    let store=useContext(Store);
    let [dup,setDup]=useState("");
    let [wrong,setWrong]=useState("");
    let logUsername=useRef("");
    let logPass=useRef("");
    let signUsername=useRef("");
    let signPass=useRef("");
    let [loading,setLoading]=useState(false);
    function signUp(){
        setLoading(true);
        setDup("");
        let newUser={
            tasks:[],
            ongoing:[],
            done:[],
            username:signUsername.current.value,
            password:signPass.current.value,
            uniId:0
        };
        fetch("https://taskserver-iy1n.onrender.com/addUser",{
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body:JSON.stringify(newUser)
        }).then((response)=>{
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
            else{
                
                return response.json();
            }
        }).then((data)=>{
            if(data===null){
                setDup("h");
                setLoading(false)
                return
            }
            console.log(data,"hi");
            store.updateCurrUser(data);
            localStorage.setItem("currUser",JSON.stringify(data));
        })
    }
    function logIn(){
        setWrong("");
        setLoading(true);
        fetch(`https://taskserver-iy1n.onrender.com/login/${logUsername.current.value}/${logPass.current.value}`).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data!==null){
                localStorage.setItem("currUser",JSON.stringify(data));
                store.updateCurrUser(data);
            }
            else{
                setLoading(false);
                setWrong("h");
            }
        });
    }
    return ( 
        <div>
            {dup!=="" &&<h1 style={{textAlign:"center"}}>Username Already Exists</h1>} 
            {wrong!=="" &&<h1 style={{textAlign:"center"}}>Wrong Username Or Password</h1>}
            {loading && <div className="loader">
            <svg xmlns="http://www.w3.org/2000/svg" height="200px" width="200px" viewBox="0 0 200 200" class="pencil">
                    <defs>
                        <clipPath id="pencil-eraser">
                            <rect height="30" width="30" ry="5" rx="5"></rect>
                        </clipPath>
                    </defs>
                    <circle transform="rotate(-113,100,100)" stroke-linecap="round" stroke-dashoffset="439.82" stroke-dasharray="439.82 439.82" stroke-width="2" stroke="currentColor" fill="none" r="70" class="pencil__stroke"></circle>
                    <g transform="translate(100,100)" class="pencil__rotate">
                        <g fill="none">
                            <circle transform="rotate(-90)" stroke-dashoffset="402" stroke-dasharray="402.12 402.12" stroke-width="30" stroke="hsl(223,90%,50%)" r="64" class="pencil__body1"></circle>
                            <circle transform="rotate(-90)" stroke-dashoffset="465" stroke-dasharray="464.96 464.96" stroke-width="10" stroke="hsl(223,90%,60%)" r="74" class="pencil__body2"></circle>
                            <circle transform="rotate(-90)" stroke-dashoffset="339" stroke-dasharray="339.29 339.29" stroke-width="10" stroke="hsl(223,90%,40%)" r="54" class="pencil__body3"></circle>
                        </g>
                        <g transform="rotate(-90) translate(49,0)" class="pencil__eraser">
                            <g class="pencil__eraser-skew">
                                <rect height="30" width="30" ry="5" rx="5" fill="hsl(223,90%,70%)"></rect>
                                <rect clip-path="url(#pencil-eraser)" height="30" width="5" fill="hsl(223,90%,60%)"></rect>
                                <rect height="20" width="30" fill="hsl(223,10%,90%)"></rect>
                                <rect height="20" width="15" fill="hsl(223,10%,70%)"></rect>
                                <rect height="20" width="5" fill="hsl(223,10%,80%)"></rect>
                                <rect height="2" width="30" y="6" fill="hsla(223,10%,10%,0.2)"></rect>
                                <rect height="2" width="30" y="13" fill="hsla(223,10%,10%,0.2)"></rect>
                            </g>
                        </g>
                        <g transform="rotate(-90) translate(49,-30)" class="pencil__point">
                            <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)"></polygon>
                            <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)"></polygon>
                            <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)"></polygon>
                        </g>
                    </g>
                </svg>
            </div>}
            {!loading &&<div className="main"> 
                	
		        <input type="checkbox" id="chk" aria-hidden="true"/>
                <div className="login">
                    <div className="form">
                        <label htmlFor="chk" aria-hidden="true">Log in</label>
                        <input ref={logUsername} className="input" type="text" name="txt" placeholder="Username" required=""/>
                        <input ref={logPass} className="input" type="password" name="pswd" placeholder="Password" required=""/>
                        <button onClick={logIn}>Log in</button>
                    </div>
                        
                </div>
                <div className="register">
                    <div className="form">
                        <label htmlFor="chk" aria-hidden="true">Register</label>
                        <input ref={signUsername} className="input" type="text" name="txt" placeholder="Username" required=""/>
                        <input ref={signPass} className="input" type="password" name="pswd" placeholder="Password" required=""/>
                        <button onClick={signUp}>Register</button>
                    </div>
			    </div>
	        </div>}
        </div>
     );
}
 
export default Signup;