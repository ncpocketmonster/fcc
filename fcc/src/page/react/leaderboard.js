import React from 'react'

class Leaderboard extends React.Component{
  constructor(props){
    super(props);

    this.getLeaderboard=this.getLeaderboard.bind(this);
    this.objectToDiv=this.objectToDiv.bind(this);
    this.state={message:'nothing',data:'waiting...'};
  }

  getLeaderboard(){
    let component=this;
    fetch("http://fcctop100.herokuapp.com/api/fccusers/top/recent").then(
    function(response){
        if(response.status!==200){
            return;
        }
        //检查响应文本
        response.json().then(function(data){
            //this.setState({message:data});
            //component.setState({message:data[0]});
            component.setState({message:'something',data:data});
        });
    }
)
  }
 
  objectToDiv(obj){
    if(typeof obj !== 'object'){
      throw 'not an object'
    }
    else{
      
    }
  }

  componentDidMount(){
    this.getLeaderboard();
    //this.state=this.getLeaderboard();
  }

  render(){
    console.log('rendering')
    if(this.state.message==='nothing'){
      return(
        <div><p>{this.state.data}</p></div>
      )
    }
    else{ 
      let i=1;
      let data=this.state.data;
      const x=(obj,index)=>(
          <tr key={index} style={{margin:'5px'}}>
            <td style={{height:'30px',width:'100px'}}>{index}</td>
            <td style={{height:'30px',width:'100px'}}><img src={obj.img} style={{height:'30px',width:'30px'}}/></td>
            <td style={{height:'30px',width:'100px'}}>{obj.username}</td>
            <td style={{height:'30px',width:'100px'}}>{obj.recent}</td>
            <td style={{height:'30px',width:'100px'}}>{obj.alltime}</td>
          </tr>
      );

      let xx=data.map(x);

      return(
        <div>
          <table>
            <tbody>
              {xx}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export {Leaderboard};