import React,{Component, createContext} from "react";
export const Store=createContext();

class StoreProvider extends Component {
    state = { 
        currUser: JSON.parse(localStorage.getItem('currUser')),
     } 
      updateCurrUser=(user)=>{
        this.setState({
            currUser: user
          });
      }
    render() { 
        return (
            <Store.Provider value={{...this.state,updateCurrUser :this.updateCurrUser}}>
                {this.props.children}
            </Store.Provider>
        );
    }
}
 
export default StoreProvider;