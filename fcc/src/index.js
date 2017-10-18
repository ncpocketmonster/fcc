import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
 
import {Remark} from './page/react/remark.js'
import {Leaderboard} from './page/react/leaderboard.js'
import {Recipe} from './page/react/Recipe.js'

//import style from './page/react/sass/recipe/recipe.css'

const BasicExample = () => (
  <Router>
    <div>
      <ul >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Remark">Remark</Link></li>
        <li><Link to="/Leaderboard">Leaderboard</Link></li>
        <li><Link to="/Recipe">Recipe</Link></li>
        <li><Link to="/Store">Store</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/Remark" component={Remark}/>
      <Route path="/Leaderboard" component={Leaderboard}/>
      <Route path="/Recipe" component={Recipe}/>
      <Route path="/Store" component={LocalStorage}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class LocalStorage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message:'nothing at present',
      textarea:'',
      marginTop:'0px',
      height:'1%',
    };

    this.messageOnchange=this.messageOnchange.bind(this);
    this.save=this.save.bind(this);
    //this.save=that::this.save;
    this.load=this.load.bind(this);
    this.move=this.move.bind(this);
    this.moveHeight=this.moveHeight.bind(this);
    //this.move();
    this.moveHeight();
  }

  messageOnchange(ev){
    //this.setState({message:ev.target.value});
    this.setState({textarea:ev.target.value});
  }

  save(){
    let x=localStorage.setItem('textarea',this.state.textarea);
    console.log(x);
  }

  load(){
    let loadMessage=localStorage.getItem('textarea');
    this.setState({message:loadMessage});
    console.log(loadMessage);
  }

  move(){
    let y=200;
    let z='-'+y+'px';
    let x=setInterval(()=>{
      if(y===0){
        clearInterval(x);
      }
      else if(y<=1){
        y=0;
      }
      else{
        y=y*0.9;
      }
      z='-'+y+'px';
      console.log(z);
      this.setState({marginTop:z});
    },100);
  }
  moveHeight(){
    let y=1;
    const z=(y)=>(y+'px');
    let x=setInterval(()=>{
      if(y===400){
        clearInterval(x);
      }
      else if(y>=399){
        y=400;
      }
      else{
        y++;
      }
      this.setState({height:z(y)});
      console.log(z(y));
    },10);
  }
  render(){
    return(
      <div>
        <textarea onChange={this.messageOnchange}></textarea>
        <button onClick={this.save}>save</button>
        <button onClick={this.load}>load</button>
        <p>{this.state.message}</p>
        <div id='result'></div>
        <div style={{overflow:'hidden',height:this.state.height,padding:'0',margin:'0'}}>
          <div style={{
              width:'400px',
              height:'400px',
              borderStyle:'solid',
              backgroundColor:'yellow',
              marginTop:this.state.marginTop,
            }}>
            1<br/>
            2<br/>
            3<br/>
            4<br/>
            5<br/>
            6<br/>
          </div>
        </div>
        <p>123</p>
      </div>
    )
  }
}

ReactDOM.render(<BasicExample/>, document.getElementById('main'));


