/**
 * Class User Controller
 * @method Construct
 * @method init
 * @return null
 */

class User{
  constructor(user){
    this.user = user;

    // run init
    this.init();
  }
  
  init(){
    console.log("hola ", this.user);
     document.getElementById('test').innerHTML = 'router user: welcome ' + this.user;
  }    

}

export default User;