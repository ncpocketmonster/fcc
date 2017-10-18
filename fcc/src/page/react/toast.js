import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import './sass/recipe/recipe.scss';

const container=document.createElement('div');
document.body.appendChild(container);

let flag=false;
let pointer=null;
let func=()=>{};

class FullCover extends React.Component{
  constructor(props){
    super(props);
    this.state={show:false};
    pointer=this;
  }

  render(){
    const div=<div className='ReactModal'></div>
    const show=true;
    return(
      <div 
        className={this.state.show ? 'ReactModal' : 'hide'} 
        onClick={()=>{
          this.setState({show:false});
          func();
        }
        }
      >
      {/*<button onClick={()=>{this.setState({show:false})}}>hide</button>*/}
      </div>
    );
  }
}
ReactDOM.render(<FullCover/>,container);

const control={
    show:(flag)=>{
      pointer.setState({show:flag});
    },
    word:()=>{
        return 'hello world';
    },
    ff:(f)=>{
      func=f;
    },
}
export default control;
