import React from 'react'
import Remarkable from 'remarkable';

class Remark extends React.Component{
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.state={value:"Type some *markdown* here"}
  }

  handleChange(e){
    this.setState({value:e.target.value});
  }

  getMarkup(){
    const md=new Remarkable();
    return {__html:md.render(this.state.value)};
  }
  render(){
    return (
      <div>
        <h3>input</h3>
        <textarea
          onChange={this.handleChange}
          defaultValue={this.state.value}/>
        <h3>output</h3>
        <div className='content' dangerouslySetInnerHTML={this.getMarkup()}/>
      </div>)
  }
}

export {Remark};