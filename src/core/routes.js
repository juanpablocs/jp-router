/**
   * Class Routes
   * @method Construct
   * @method map
   * @return null
   */
export default class Routes{
  /**
   * Construct
   * @param  posiblemente el window.location podrá ser definido
   *         como parametro para futuros proyectos
   */
  constructor() {
      this.urlHashBrowser = window.location.hash.replace('#','');
      this.routesList = [];
      this.stopRouteMap = false;
  }

  /**
   * map
   * @param  string ruta donde aplicara logica
   * @param  function callback que despachara si todo es correcto
   * @return mixed
   */
  map(pathValue, objectFunction){
    let self = this;
    
    // si ya encontro
    if(self.stopRouteMap)
      return;

    // validar si routesList ya contiene el pathvalue
    if(self.routesList.indexOf(pathValue) !== -1)
      throw new Error('pathvalue is already defined');

    // added path in to routes List
    self.routesList.push(pathValue);
  
    // valid
    if (!pathValue) throw new Error(' route requires a path');
    
    // valid
    if (!objectFunction) throw new Error(' route ' + pathValue.toString() + ' requires a callback');
    
    // valid
    if(!/^\//.test(pathValue)) throw new Error('match Router: not slash / base');

    // run
    if(self.validMatchToRoutes(pathValue)){
      self.stopRouteMap = true;
      let values = Routes.getValuesFromUrl(self,pathValue);

      try{
        // return only function anonymous
        return objectFunction.apply(this, values);
      }catch(e){

        values.unshift([]);

        // return object class function
        return new (Function.bind.apply(objectFunction, values));
      }
    }
    // return 404
    return false;
  }
  
  /**
   * validMatchToRoutes
   * @param  pathValue defined in map
   * @return boolean
   */
  validMatchToRoutes(path){
    let pathConvert = path.replace(/\:\w+/g, '\\w+');
    let pathRegex   = new RegExp('^' + pathConvert + '$');
    let valid       = pathRegex.test(this.urlHashBrowser);

    console.info('valid Routes map');
    console.log('route map: ',path);
    console.log('url browser: ',this.urlHashBrowser);
    console.log('regex: ', pathRegex);
    console.log('valid: ', valid);
    console.log('---------------------------------------');
    if(valid)
      return true;

    return false;
  }

  /**
   * getValuesFromUrl
   * @param this context
   * @param path pathvalue defined in map
   * @return array
   */
  static getValuesFromUrl(self,path){
    let urlHashToRegex = path;
    if(/\:\w+/.test(path)){
      urlHashToRegex = path.replace(/\:\w+/g,'(\\w+)');
    }
    urlHashToRegex = urlHashToRegex.replace(/\[(.*?)\](\+)?/, '([$1]$2)');

    let h = new RegExp('^' + urlHashToRegex + '$', 'i');
    let args = self.urlHashBrowser.match(h);

    if(!args.length)
      return [];

    return args.slice(1);
  }

  static isRegexBase(str){
    return /\(|\[|\\/.test(str);
  }

};
