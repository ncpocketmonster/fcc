exports.rand = (length = 10, min = 0, max = 20) => {
  let arr = [];
  for(let i = 0; i< length;  i++){
    arr.push( Math.floor(Math.random()*(max - min + 1) + min))
  }
  return arr;
}