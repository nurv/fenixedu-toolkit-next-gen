export var currentLocale = {
    "tag":"en-GB",
    "displayName": "English (United Kingdom)",
    "lang":"en"
}

export var avaibleLocales = [
  {
    "tag":"pt-PT",
    "displayName": "português (Portugal)",
    "lang":"pt"
  }, currentLocale
];

export var currentLang = "en";

export function getLocale(tag){
  for (var i = 0; i < avaibleLocales.length; i++) {
    if (avaibleLocales[i].tag === tag){
      return avaibleLocales[i];
    }
  }
  return null;
}