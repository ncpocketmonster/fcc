const c=console.log
const compmare=(callback,argument)=>{
  let t=new Date();
  let start=t.getTime();
  callback.call(callback,argument);
  //c(callback.call(callback,argument))
  let tt=new Date();
  let end=tt.getTime();
  return (end-start);
}

let insertSort=require('./sort_insert.js').sort;
let normalSort=require('./sort_normal.js').sort;
let rand=require('./rand.js').rand;

let arr=rand(10000,1,100);

c(compmare(normalSort,arr)+' normal');
c(compmare(insertSort,arr)+' insert');