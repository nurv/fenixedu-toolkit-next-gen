import { InputWidget, UIRegister, UIOutlet, UIView, UIAttribute, UIOn } from "toolkit/ui/widgets";
import { avaibleLocales, currentLocale, getLocale } from "toolkit/locales";
import { Observe } from "toolkit/observers";

function getSingleTag(locale){
  return locale.tag.split("-")[0].toUpperCase();
}

@UIView
class LocalizedStringWidget extends InputWidget{
  
  @UIOutlet(".fenixedu-toolkit-localized-string-menu") menu;
  @UIOutlet(".fenixedu-toolkit-localized-string-button-long") longButton;
  @UIOutlet(".fenixedu-toolkit-localized-string-button-short") shortButton;

  @UIOutlet(".fenixedu-toolkit-localized-string-language") language;
  @UIOutlet(".fenixedu-toolkit-localized-string-tag") tag;

  @UIAttribute("name") name;
  @UIAttribute("locale") locale;

  update() {
    var localeObj = getLocale(this.locale);
    var val = this.value;

    if (val === "") {
        this.value = "{}"
        val = "{}";
    }

    var val = JSON.parse(val)
    var tag = localeObj.tag;
    
    if (!(tag in val)){
        var singleTag = getSingleTag(localeObj).toLowerCase();
        if (singleTag in val){
            tag = singleTag;
        }
    }

    val = val[tag]
    if (val !== this.presentationValue){
        this.presentationValue = val || "";
        this.language.innerHTML = localeObj.displayName
        this.tag.innerHTML = localeObj.tag;
    }
  }

  makeMenu(callback) {
    for (var i = 0; i < avaibleLocales.length; i++) {
      let locale = avaibleLocales[i];
      let menuOption = document.createElement("li");
      let a = document.createElement("a");
      a.setAttribute("href","#");
      a.setAttribute("onclick","return false;");
      a.innerHTML = (locale.displayName || locale.tag);
      menuOption.appendChild(a)


      a.setAttribute("data-locale",locale.tag);
      
      menuOption.addEventListener("click", (x) => this.locale = x.target.getAttribute("data-locale"));
      this.menu.appendChild(menuOption);
    }
  }

  @UIOn("input", ".form-control")
  @UIOn("propertychange", ".form-control")
  change(evt){
    var data = JSON.parse(this.value);

    var locale = getLocale(this.locale);
    var tag = locale.tag

    if (!(tag in data)){
        var singleTag = getSingleTag(locale).toLowerCase();
        if (singleTag in data){
            tag = singleTag;
        }
    }

    data[tag] = this.presentationValue;
    this.value = JSON.stringify(data);
    let event = new CustomEvent("change", { "target": this, cancelable:false, bubbles:false, type: "change" });
    document.dispatchEvent(event);
  }
 
  get disabled(){
    return this._disabled;
  }

  set disabled(value){
    this._disabled = value;
  }

  attachedCallback(){
    this._disabled = false;
    this.makeMenu();
    this.recalculateButtons();
    this.addEventListener("resize", () => this.recalculateButtons());

    this.onchange = function(){
      this.update();
    }

    this.locale = currentLocale.tag;

    Observe.element(this,{
      attributes: true
    },(mutations) => {
      if(mutations){
        if (mutations.filter((x) => x.type == "attributes" && x.attributeName == "locale").length > 0){
          this.update();
        }
      }
    });
  }

  get locale(){
    return this.getAttribute("locale");
  }

  set locale(value){
    if (value == "string"){
      value = getLocale(value);  
    }
    this.setAttribute("locale", value.tag);
    
    this._localeObject = value;
    this.view.querySelector(".fenixedu-toolkit-localized-string-language").innerHTML = value.displayName || getSingleTag(value);
  }

  setTagButton(locale, tagButton){
      if(tagButton && tagButton.length) { tagButton.html(getSingleTag(locale)) };
  }

  recalculateButtons() { 
      let el = this.view.querySelectorAll(".fenixedu-toolkit-localized-string-input-group");
      for (var i = 0; i < el.length; i++) {
        let e = el[i]
        var z = e.querySelector(".fenixedu-toolkit-localized-string-button-long");
        var x = e.querySelector(".fenixedu-toolkit-localized-string-button-short");
        if(x && z){
          if ((z.offsetWidth / e.offsetWidth) > 1/3){
              if (z.style.display !== "none"){
                  x.style.display = "inline";
                  z.style.display = "none";
              }
          }else{
              if (x.style.display !== "none"){
                  z.style.display = "inline";
                  x.style.display = "none";
              }
          }
        }
      }
  }
}

@UIRegister("ls-input","input")
export class InputLocalizedStringWidget extends LocalizedStringWidget{

  @UIOutlet(".fenixedu-toolkit-localized-string-input") inputElement;

  get presentationValue(){
    return this.inputElement.value;
  }

  set presentationValue(v){
    this.inputElement.value = v;
  }

  render(){
    return `<div class="fenixedu-toolkit-localized-string-input-group" >
    <div class="input-group">
      <input type="text" class="form-control fenixedu-toolkit-localized-string-input">
      <div class="input-group-btn fenixedu-toolkit-localized-string-group dropdown">
        <button type="button" class=" btn btn-default dropdown-toggle fenixedu-toolkit-localized-string-button-long fenixedu-toolkit-localized-string-button" data-toggle="dropdown">
          <span class="fenixedu-toolkit-localized-string-language"></span> 
          <span class="caret"></span>
        </button>
        <button type="button" class=" btn btn-default dropdown-toggle fenixedu-toolkit-localized-string-button-short fenixedu-toolkit-localized-string-button" data-toggle="dropdown">
          <span class="fenixedu-toolkit-localized-string-tag"></span>
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu fenixedu-toolkit-localized-string-menu pull-right" role="menu"></ul>
      </div>
    </div>
    <p class="help-block"></p>
  </div>`
  }
}

@UIRegister("ls-textarea", "textarea")
export class TextAreaLocalizedStringWidget extends LocalizedStringWidget{

  @UIOutlet("fenixedu-toolkit-localized-string-textarea") inputElement;

  get presentationValue(){
    return this.inputElement.value;
  }

  set presentationValue(v){
    this.inputElement.value = v;
  }

  render(){
    return `<div class="fenixedu-toolkit-localized-string-textArea">
    <p>
      <div class="btn-group fenixedu-toolkit-localized-string-group">
        <button type="button" class="btn btn-default dropdown-toggle fenixedu-toolkit-localized-string-button" data-toggle="dropdown">
          <span class="fenixedu-toolkit-localized-string-language"></span>
          <span class="caret"></span>
        </button>

        <ul class="dropdown-menu fenixedu-toolkit-localized-string-menu" role="menu"></ul>
      </div>
    </p>
    <p>
      <textarea class="form-control fenixedu-toolkit-localized-string-textarea"></textarea>
      <p class="help-block">
    </p>
  </div>`;
  }
}
