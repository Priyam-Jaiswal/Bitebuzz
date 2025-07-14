import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);

        this.state ={
          userInfo:{
            name: "Dummy",
            location: "Default",
          },
        };
    }

    async componentDidMount(){
        // console.log("Child ComponentDid Mount");
        //Api call
        const data = await fetch("https://api.github.com/users/Priyam-Jaiswal");
        const json=await data.json();

        this.setState({
            userInfo: json,
        });

        console.log(json);
    }

   render(){
        // console.log("Child rendered");
        const {name,location, avatar_url} = this.state.userInfo;

        return(
        <div className="user-card">
           <img src={avatar_url}/>
           <h2>Name: {name}</h2>
           <h3>Location:{location}</h3>
           <h4>Contact: @priyamjaiswal</h4>
        </div>
     );
    }
}

export default UserClass;