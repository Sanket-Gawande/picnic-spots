module.exports=  function random(){
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
}