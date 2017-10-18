const sort=(source)=>{
  let arr=source.slice(0,source.length);
  for(let i=0;i<arr.length;i++){
    for(let j=i;j>0 && arr[j]<arr[j-1];j--){
      [arr[j],arr[j-1]]=[arr[j-1],arr[j]];
    }
  }
  return arr;
}
exports.sort=sort;