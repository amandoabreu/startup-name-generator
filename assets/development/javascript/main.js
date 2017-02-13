(() => {
  const vowels       = ['a', 'e', 'i', 'o', 'u'];
  const consonants   = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
  var tlds         = ['.com', '.io', '.co.uk', '.me', '.co', '.eu', '.ly', '.fm', '.am', '.in', '.it', '.us'];

  var numLetters = 5;
  var letterTypes = undefined;
  var pattern = [];
  var includePos = 0;
  var includePosElements = document.getElementsByName('include-location[]');
  for(let i = 0; i < includePosElements.length;i++){
    includePosElements[i].addEventListener('change', function(){
      includePos = this.value;
    });
  }

  const checkboxHouse = document.getElementById('checkbox-house');

  const tldHouse = document.getElementById('tld-house');

  for(let i = 0; i < tlds.length; i++){
    tldHouse.innerHTML += '<input type="checkbox" value="'+ (i + 1) +'" name="tlds[]"> ' + tlds[i] + '<br/>';
  }

  const updateCheckbox = (num = numLetters) => {
    checkboxHouse.innerHTML = '';
    for(let i = 0; i < num;i++){
      pattern[i] = false;
      checkboxHouse.innerHTML += '<input type="checkbox" name="letter-type[]" class="letter-type" //>';

    }
    letterTypes = document.getElementsByName('letter-type[]');
    for(let i = 0; i < letterTypes.length;i++){
      letterTypes[i].addEventListener('change', updatePattern);
    }
  };

  const toggleClass = (el, className) => {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
  }

  const init = () => {
    updateCheckbox();
    var toggles = document.querySelectorAll('.toggle');
    for(let i = 0; i < toggles.length;i++){
      toggles[i].addEventListener('click', function(){
        var toBeToggled = document.querySelectorAll(this.dataset.toggle);
        for(let i = 0; i < toBeToggled.length;i++){
          toggleClass(toBeToggled[i], 'hidden');
        }
      });
    }
  }

  var include = undefined;

  var descriptions = [
    'A job listing startup',
    'A hotel metasearch',
    'A food delivery app',
    'A "tinder-like" app for X'
  ];

  const allFalse = (array) => {
    var first = array[0];
    return array.every(function(element) {
        return element === false;
    });
  }


  const updateTlds = () => {

  }

  const includeText = document.getElementById('include-text');
  includeText.addEventListener('keyup', function(){
    include = this.value;
  });

  const sendOutput = (str) => {
    const outElem = document.getElementById('output');
    outElem.innerHTML = str;
  };

  const makeWord = (size, options = []) => {
    var word = '';
    if(include !== undefined){
      size = size - include.length;
    }
    for(let i = 0; i < size;i++){
      if(allFalse(pattern)){
        if(i % 2 == 0){
          word += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
          word += vowels[Math.floor(Math.random() * vowels.length)];
        }
      } else {
        if(pattern[i] == true){
          word += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
          word += vowels[Math.floor(Math.random() * vowels.length)];
        }
      }

    }
    if(include !== undefined){
      var position = 0;
      switch(includePos){
        case '1':
          position = 0;
        case '2':
          break;
        case '3':
          position = size;
          break;
        default:
          position = Math.floor(Math.random() * (size +1));
      }

      var word = [word.slice(0, position), include, word.slice(position)].join('');
    }
    word += tlds[Math.floor(Math.random() * tlds.length)];
    return word;
  }

  var numLettersInput = document.getElementById('letters');
  numLettersInput.addEventListener('keyup', function(){
    numLetters = this.value;
    updateCheckbox(numLetters);
  });

  const submit = (e) => {
    e.preventDefault();
    var word = makeWord(numLetters);
    sendOutput(word);
  };

  const updatePattern = () => {
    for(let i = 0; i < letterTypes.length;i++){
      pattern[i] = letterTypes[i].checked;
    }
  };

  init();

  const form = document.getElementById('main-form');
  form.addEventListener('submit', submit);


})();
