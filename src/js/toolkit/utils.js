import { currentLocale } from "toolkit/locales";

export function uniqueArray(arr){
   var u = {}, a = [];
   for(var i = 0, l = arr.length; i < l; ++i){
      if(u.hasOwnProperty(arr[i])) {
         continue;
      }
      a.push(arr[i]);
      u[arr[i]] = 1;
   }
   return a;
};

export function updateAttrs(input, widgetInput, allowedAttrs){
    input = $(input);

    var cache = widgetInput.data("attrCache");

    if (cache){
        // If the attribute was removed after attaching to dom;
        for (var i = 0; i < cache.length; i++) {
            var attr = cache[i];
            if (hasAttr(input, attr)){
                widgetInput.removeAttr(attr);
            } 
        };
    }

    cache = [];

    $.each(input[0].attributes, function(i, attrib){
        if (!(allowedAttrs.indexOf(attrib.name) < 0)){
            widgetInput.attr(attrib.name,attrib.value);
            cache.push(attrib.name);
        }
    });

    widgetInput.data("attrCache", cache)        
};

export function hasAttr(obj,attr){
    var val = $(obj).attr(attr);
    return (typeof val !== typeof undefined && val !== false);
};

export function replaceRequired(input){
    input = $(input);

    if (hasAttr(input,'required')) {
        input.removeAttr("required");
        input.attr("bennu-required","required");
    }
}

export function gensym() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    })

    // traverse parents
    while (el!==null) {
        parent = el.parentElement;
        if (parent!==null && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}

export function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export function cloneObject(obj) {
  if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
    return obj;

  if (obj instanceof Date)
    var temp = new obj.constructor(); //or new Date(obj);
  else
    var temp = obj.constructor();

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = clone(obj[key]);
      delete obj['isActiveClone'];
    }
  }

  return temp;
}

export class LocalizedString{
  constructor(){
    switch(arguments.length){
      case 0:
        this.data = {};
        break;
      case 1:
        this.data = arguments[0];
        break;
      case 2:
        this.data = {}
        this.data[arguments[0]] = arguments[1];
    }
  }
  
  get(){
      var locale;
      var exactMatch = (arguments.length === 3) ? arguments[2] : false;
      if(arguments.length === 0){
        locale = currentLocale;
      }else{
        locale = arguments[0];
      }

      if (locale && typeof locale !== "string"){
          var tag = locale.tag;
      }else if(!locale){
          var tag = Bennu.locale.tag;
      }else{
          var tag = locale
      }

      if (tag in input) {
          return input[tag];
      }

      tag = tag.split('-')[0];
      
      if (tag in input) {
          return input[tag];
      }
      
      for (var lang in input) {
          if (lang.indexOf(tag) === 0) {
              return input[lang];
          }
      }
      
      return exactMatch ? null : input[Object.keys(input)[0]];
  }

  set(){
    if(arguments.length === 1){
      this.data[currentLocale] = arguments[0];
    }else{
      return this.data[arguments[1]] = arguments[0];
    }
  }

  json(){
    return this.data;
  }

  getLocales(){
    var res = []
    for(var k in this.data){
      res.push(k);
    }
    return res;
  }

  toString(){
    return JSON.stringify(this.data);
  }
}



 