function isValid(str){
    return !/[!#$@%\^&*\()\[\]\\/\\]/g.test(str);
   }

//    !@#$%^&*()
   export default isValid