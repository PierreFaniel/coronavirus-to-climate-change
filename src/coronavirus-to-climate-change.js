const WORDS_TO_REPLACE = {
  en: {
    'Coronavirus': 'Climate Change',
    'coronavirus': 'climate change', 
    'corona virus': 'climate change', 
    'COVID-19': 'Climate Change', 
    'covid-19': 'climate change'
  },
  fr: {
    'Coronavirus': 'Changement Climatique',
    'coronavirus': 'changement climatique', 
    'corona virus': 'changement climatique', 
    'COVID-19': 'Changement Climatique', 
    'covid-19': 'changement climatique'
  }
};

const supportedLanguages = Object.keys(WORDS_TO_REPLACE);

function replaceInText(element) {
  const wordsToReplace = WORDS_TO_REPLACE[getLang()];
  for (let word in wordsToReplace) {
    element.nodeValue = element.nodeValue.replace(
      new RegExp(word, "ig"), 
      wordsToReplace[word]
    );
  }
}

function walkTextNodes(rootElement) {
  const allElements = rootElement.getElementsByTagName("*");
  for(let i in allElements) {
    const element = allElements[i];

    if (element.nodeType === Node.ELEMENT_NODE) {
      for(let j in element.childNodes) {
        const childElement = element.childNodes[j];
        if (childElement.nodeType === Node.TEXT_NODE) {
          replaceInText(childElement);
        }
      }

    }

    if (element.nodeType === Node.TEXT_NODE) {
      replaceInText(element);
    }
  }
}

function getLang() {
  if (
      navigator.language && 
      navigator.language.length >= 2 && 
      supportedLanguages.includes(navigator.language.substring(0,2))
    ) {
      return navigator.language.substring(0, 2);
  }
  // Use en as default
  return 'en';
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => {
    walkTextNodes(document.body);
  }, 100);
});
