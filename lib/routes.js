/**
   * Class Routes
   * @method Construct
   * @method map
   * @return null
   */

module.exports = function Routes(obj){
  /**
   * Construct
   * @param  posiblemente el window.location podrá ser definido
   *         como parametro para futuros proyectos
   */
  this.option = obj;
  this.urlHashBrowser = obj ? obj.pathValue : null;
  this.routesList = [];
  this.stopRouteMap = false;

  /**
   * map
   * @param  string ruta donde aplicara logica
   * @param  function callback que despachara si todo es correcto
   * @return mixed
   */
  this.map = function(pathValue, objectFunction){
    var self = this;
    
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
      var values = self.getValuesFromUrl(pathValue, self.urlHashBrowser);

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
  
  this.test = function(path, pathTest){
    var pathConvert = path.replace(/\:\w+/g, '\\w+');
    var pathRegex   = new RegExp('^' + pathConvert + '$');
    return {regex:pathRegex.test(pathTest), values: this.getValuesFromUrl(path,pathTest)};
  }
  /**
   * validMatchToRoutes
   * @param  pathValue defined in map
   * @return boolean
   */
  this.validMatchToRoutes = function(path){
    var pathConvert = path.replace(/\:\w+/g, '\\w+');
    var pathRegex   = new RegExp('^' + pathConvert + '$');
    var valid       = pathRegex.test(this.urlHashBrowser);

    if(this.debug){
      console.info('valid Routes map');
      console.log('route map: ',path);
      console.log('url browser: ',this.urlHashBrowser);
      console.log('regex: ', pathRegex);
      console.log('valid: ', valid);
      console.log('---------------------------------------');
    }
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
  this.getValuesFromUrl = function(path,urlpath){
    var self = this;
    var urlHashToRegex = path;
    if(/\:\w+/.test(path)){
      urlHashToRegex = path.replace(/\:\w+/g,'(\\w+)');
    }
    urlHashToRegex = urlHashToRegex.replace(/\[(.*?)\](\+)?/, '([$1]$2)');

    var h = new RegExp('^' + urlHashToRegex + '$', 'i');
    var args = urlpath.match(h);

    if(!args || !args.length)
      return [];

    return args.slice(1);
  }

  this.isRegexBase = function(str){
    return /\(|\[|\\/.test(str);
  }

};
