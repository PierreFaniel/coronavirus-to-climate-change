const wordsToReplace = {
  'Coronavirus': 'Climate Change',
  'coronavirus': 'climate change', 
  'corona virus': 'climate change', 
  'COVID-19': 'Climate Change', 
  'covid-19': 'climate change'
};

function replaceInText(element) {
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

document.addEventListener("DOMContentLoaded", function() {
  console.log('CORONAHAHA');
  setTimeout(() => {

    walkTextNodes(document.body);
  }, 100);
});
