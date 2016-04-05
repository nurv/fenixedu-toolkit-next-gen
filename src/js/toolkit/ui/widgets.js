import { closest } from "toolkit/utils";

export class InputWidget extends HTMLInputElement {
  onsubmit(){}
  onchange(){}
}

export function UIRegister(name,extds){
  return function (target, property, descriptor) {
    var opts = {
      prototype: Object.create(target.prototype)
    }
    opts['extends'] = extds;
    document.registerElement(name, opts);
    return target;
  };
}

export function UIOn(code, query){
  return function(target, property, descriptor){
    target._eventHandlers = target._eventHandlers || {};
    target._eventHandlers[target.constructor.name] = target._eventHandlers[target.constructor.name] || []
    target._eventHandlers[target.constructor.name].push({code:code, name:property, query:query})
    return descriptor;
  };
}

export function UIOutlet(query){
  return function(target, property, descriptor) {
    target._outlets = target._outlets || {};
    target._outlets[target.constructor.name] = target._outlets[target.constructor.name] || []
    target._outlets[target.constructor.name].push({name:property, query:query});
    descriptor.initializer = null;
    return descriptor;
  };
}

export function UIAttribute(name){
  return function(target, property, descriptor) {
    delete descriptor.initializer;
    delete descriptor.writable;

    descriptor.get = function(){
      return this.getAttribute(name);
    }

    descriptor.set = function(v){
      this.setAttribute(name,v);
    }

    return descriptor;
  };
}

export function UIView(target, property, descriptor){

  target.prototype.recalculateOutlets = function(){
    console.log(target.prototype.constructor.name);
    if (target.prototype._outlets[target.prototype.constructor.name] && target.prototype._outlets[target.prototype.constructor.name].length){
      var that = this;
      target.prototype._outlets[target.prototype.constructor.name].forEach(function(x){
        Object.defineProperty(that, x.name, {
          enumerable:true,
          configurable:false,
          get:() => that.view.querySelector(x.query),
        });
      })
    }
  }

  target.prototype.attachEvtHandlers = function(){
    if (target.prototype._eventHandlers[target.prototype.constructor.name] && target.prototype._eventHandlers[target.prototype.constructor.name].length){
      var that = this;
      target.prototype._eventHandlers[target.prototype.constructor.name].forEach(function(x){
        let element = x.query? that.view.querySelector(x.query) : that.view;
        element.addEventListener(x.code, (evt)=>that[x.name](evt))  
      });
    }
  }

  target.prototype.createdCallback = function() {
    this.setAttribute("style", "display:none;");
    let render = this.render(); 
    this.view = document.createElement("div")
    this.view.className += "fenixedu-toolkit-sd";
    if(typeof render === "string"){
      this.view.innerHTML = render;
    }else if (HTMLElement.prototype.isPrototypeOf(render)){
      this.view.appendChild(render);
    }else{
      throw new Error ("I don't know how to attach " + render.toString());
    }

    this.parentNode.insertBefore(this.view, this.nextSibling);
    this.recalculateOutlets();
    this.attachEvtHandlers();

    var element = closest(this, "form");

    if(element){
      element.addEventListener("submit", x => this.onsubmit(x));
    }

    this.addEventListener("DOMSubtreeModified", x => this.onchange(x), false);
  }

  return target;
}