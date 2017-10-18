let sort=(source)=>{
  let arr=source.slice(0,source.length);
  let length = arr.length;
  for(let i=0;i<length-1;i++){
    let index=i;
    for(let j=i+1;j<length;j++){
      index=arr[j]<arr[i] ? j : index;
    }
    [arr[i],arr[index]]=[arr[index],arr[i]];
  }
  return arr;
}

let check=(source,target)=>{
  let flag=true;
  if(source.length!==target.length){
    flag=false;
  }
  let sourceSub=[],targetSub=[];
  for(let i=0;i<source.length;i++){
    sourceSub[i]=null;
    targetSub[i]=null;
  }
  for(let i=0;i<source.length;i++){
    for(let j=0;j<target.length;j++){
      let numflag=(source[i]===target[j]);
      let subflag=(sourceSub[i]===null)&&(targetSub[j]===null);
      if(numflag&&subflag){
        sourceSub[i]=true;
        targetSub[j]=true;
      }
    }
  }
  for(let i=0;i<source.length;i++){
    if(sourceSub[i]===null || targetSub[i]===null){
      flag=false;
    }
  }
  return flag;
}
exports.sort=sort;
exports.check=check;