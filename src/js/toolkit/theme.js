var cache = {};

function hackColor(cls){
  if (!(cls in cache)){
    var a = $("<button style='display:none;' class='btn btn-" + cls + "'></button>"); 
    $(document.body).append(a); 
    var color = a.css("backgroundColor");
    a.remove();
    cache[cls] = color;
    return color;
  }else{
    return cache[cls];
  }
}

function hackParagraph(){
    if (!("paragraph" in cache)){
        var a = $("<p style='display:none;'></p>"); 
        $(document.body).append(a); 
        var font = a.css("fontFamily");
        a.remove();
        cache["paragraph"] = font;
        return font;
    }else{
        return cache["paragraph"];
    }
}

function hackHeading(){
    if (!("heading" in cache)){
        var a = $("<h1 style='display:none;'></h1>"); 
        $(document.body).append(a); 
        var font = a.css("fontFamily");
        a.remove();
        cache["heading"] = font;
        return font;
    }else{
        return cache["heading"];
    }
}

export function hFontFamily(){
    return hackHeading();
};

export function pFontFamily(){
    return hackParagraph();
};

export function primary(){
  return hackColor("primary");
};

export function success(){
  return hackColor("success");
};

export function info(){
  return hackColor("info");
};

export function warning(){
  return hackColor("warning");
};

export function danger(){
  return hackColor("danger");
};