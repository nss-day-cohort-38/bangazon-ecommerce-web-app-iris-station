//made by Kurt Krafft 

// this thing tests all the characters that can't be allowed into a title of a product as specified by the directions 
// NOTE: not all characters are included and this has been made with the help of our stack overflow overlords


function isValid(str){
    return !/[!#$@%\^&*\()\[\]\\/\\]/g.test(str);
   }

//    !@#$%^&*()
   export default isValid