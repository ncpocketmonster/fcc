import React from 'react'
import ReactDOM from 'react-dom'
import control from './toast.js'

import './sass/recipe/recipe.scss';
/*
state{
  edit:{
    status:false(no edit frame)/true(yes, edit frame)
    (if yes)
    type:old(change the old ones after editing)/new(add a new dish after editing)/null
  }
  list:[](all the dishes ),
  focus:'egg'(when the user focus on 1 dish, show the details of the dish)
} 
*/
class Edit extends React.Component{
  constructor(props){
    super(props);

    /*there are 2 conditions:
      1:create an empty recipe;
      2:edit an exiting recipe;*/
    if(this.props.newOrOld==='new'){
      this.state={newOrOld:'new'};
    }
    else{
      this.state={
        newOrOld:'old',
        recipe:this.props.recipe,
        ingredient:this.props.ingredient,
      };
    }

    this.close=this.close.bind(this);
    this.ok=this.ok.bind(this);
    this.recipeOnChange=this.recipeOnChange.bind(this);
    this.ingredientOnChange=this.ingredientOnChange.bind(this);
    this.clear=this.clear.bind(this);
    this.refIngredient=this.refIngredient.bind(this);
    this.refRecipe=this.refRecipe.bind(this);
  }

  /*ok means finish editing the recipe of the next dish*/
  ok(){
    let stringOrNot=(typeof this.state.recipe==='string')&&(typeof this.state.ingredient==='string');
    if(stringOrNot){
      let rec=this.state.recipe.trim();
      let ing=this.state.ingredient.trim();
      if( (rec!=="") && (ing!=="") ){
        if(this.props.newOrOld==='new'){
          this.props.addDish(rec,ing);
          this.close();
        }
        else if(this.props.newOrOld==='old'){
          this.props.editOldDish(rec,ing);
          this.close();
        }
      }
    }
  }

  clear(){
    let rec=this.state.refRecipe;
    let ing=this.state.refIngredient;
    rec.value='';
    ing.value='';
    this.state.recipe='';
    this.ingredient='';
  }

  close(){
    this.state={};
    control.show(false);
    this.props.editUpdate(false);
  }

  recipeOnChange(e){
    this.setState({recipe:e.target.value});
  }

  ingredientOnChange(e){
    this.setState({ingredient:e.target.value});
  }

  refRecipe(ins){
    this.setState({refRecipe:ins});
  }

  refIngredient(ins){
    this.setState({refIngredient:ins});
  }

  componentDidMount(){
    control.show(true);
    control.ff(this.close);
  }

  render(){
    let neww=this.props.newOrOld==='new';
    let old=this.props.newOrOld==='old';
    let oldRecipe=old ? this.props.recipe : '';
    let oldIngredient=old ? this.props.ingredient : '';
    return(
      <div className="editPanel">
        <p>add some dish</p>
        <p>recipe</p>
        <textarea onChange={this.recipeOnChange} ref={this.refRecipe} defaultValue={oldRecipe}/>
        <p>ingredient</p>
        <textarea onChange={this.ingredientOnChange} ref={this.refIngredient} defaultValue={oldIngredient}/>
        <div>
          <button className='editButton' onClick={this.ok}>ok</button>
          <button className='editButton' onClick={this.clear}>clear</button>
          <button className='editButton' onClick={this.close}>close</button>
        </div>
      </div>
    )
  }
}


class Recipe extends React.Component{
  constructor(props){
    super(props);

    this.showPanel=this.showPanel.bind(this);
    this.onEditUpdate=this.onEditUpdate.bind(this);
    this.addDish=this.addDish.bind(this);
    this.focus=this.focus.bind(this);
    this.delete=this.delete.bind(this);
    this.editOldDish=this.editOldDish.bind(this);

    this.list=[
      {name:'egg',ingredient:'1,2,3,4'},
      {name:'egg1',ingredient:'1,2,3,45'},
      {name:'egg2',ingredient:'1,2,3,445324'},
      {name:'egg3',ingredient:'1,2,3,4234534'},
    ];
    if(localStorage.recipe===undefined){
      localStorage.recipe=JSON.stringify(this.list);
    }
    else{
      console.log(localStorage.recipe);
      this.list=JSON.parse(localStorage.recipe);
    }

    this.state={
      editing:false,
      newOrOld:'new',
      length:4,
      'list':this.list,
      focus:null,
    }

  }

  showPanel(){
    this.setState({editing:true,newOrOld:'new'});
  }

  focus(id){
    //this.setState({editing:true,newOrOld:'new'});
    this.setState({focus:id});
  }

  onEditUpdate(flag){
    this.setState({editing:flag});
  }

  addDish(recipeName,ingredientName){
    let newDish={name:recipeName,ingredient:ingredientName};
    this.setState({list:[...this.state.list,newDish]});
    localStorage.recipe=JSON.stringify([...this.state.list,newDish]);
  }
  
  editOldDish(recipeName,ingredientName){
    let oldDish={name:recipeName,ingredient:ingredientName};
    this.state.list.splice(this.state.focus,1,oldDish);
  }

  delete(index){
    this.state.list.splice(index,1);
    this.state.focus=null;
    this.setState({length:this.state.list.length});
    console.log(this.state.list);
    console.log(this.state.list.length);
  }

  editOld(index){
    this.setState({editing:true,newOrOld:'old'});
  }

  render(){
    const dish=(obj,index)=>{
      if(index!==this.state.focus){
        return(
          <div key={index} className="listItem">
            <a href='#' className="listHref" onClick={()=>{this.focus(index)}}>{obj.name}</a>
          </div>
        )
      }
      else{
        return(
          <div key={index} className="listItem">
            <a href='#' className='listHref' onClick={()=>{this.focus(null)}}>{obj.name}</a>
            <hr style={{marginLeft:'-5px',marginRight:'-5px'}}/>
            <p>ingredient:{' '+obj.ingredient}</p>
            <div>
              <button className="editButton" onClick={()=>this.editOld(index)}>edit</button>
              <button className="editButton" onClick={()=>{this.delete(index)}}>delete</button>
            </div>
          </div>
        );
      }
    }
    console.log(this.state.list);
    let dishList=this.state.list.map(dish);
    return (
      <div className="container wideGray">
        <div>{dishList}</div>
        <div>
          <button onClick={this.showPanel} style={{marginLeft:'9px'}}>add</button>
        </div>
        {this.state.editing ? 
          <Edit 
            newOrOld={this.state.newOrOld} 
            editUpdate={this.onEditUpdate}
            addDish={this.addDish}
            editOldDish={()=>{console.log('error another Edit tag')}}
          /> : null
        }
        <div>
          {(this.state.editing && (this.state.newOrOld==='old')) ?
            <Edit
              newOrOld={this.state.newOrOld} 
              editUpdate={this.onEditUpdate}
              addDish={this.addDish}
              recipe={this.state.list[this.state.focus].name}
              ingredient={this.state.list[this.state.focus].ingredient}
              editOldDish={this.editOldDish}
            />:null
          }
        </div>
      </div>
   );
  }
}

export {Recipe}