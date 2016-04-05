

System.import('/lib/MutationObserverPolyfill.js');

export class Observe{
  static element(target,config,callback){
    var observer = new MutationObserver(function (mutations) {
      callback(mutations);
    });
    observer.observe(target, config);
  }
}