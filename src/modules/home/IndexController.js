import React from 'react';
import ReactDOM from 'react-dom';
import SearchFormAdvanced from './components/SearchFormAdvanced';
/**
 * Class Index Controller
 * @method Construct
 * @method init
 * @return null
 */

class IndexController{
  constructor(){
    this.container = document.getElementById('container');
    
    // run init
    this.init();
  }
  
  init(){
    document.getElementById('test').innerHTML = 'Index Controller';
    ReactDOM.render(<SearchFormAdvanced name="Mundo" />, this.container);
  }    

}

export default IndexController;