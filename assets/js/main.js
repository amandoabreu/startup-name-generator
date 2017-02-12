'use strict';

(function () {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
  var tlds = ['.com', '.io', '.co.uk', '.me', '.co', '.eu', '.ly', '.fm', '.am', '.in', '.it', '.us'];

  var numLetters = 5;
  var letterTypes = undefined;
  var pattern = [];
  var includePos = 0;
  var includePosElements = document.getElementsByName('include-location[]');
  for (var i = 0; i < includePosElements.length; i++) {
    includePosElements[i].addEventListener('change', function () {
      includePos = this.value;
    });
  }

  var checkboxHouse = document.getElementById('checkbox-house');

  var tldHouse = document.getElementById('tld-house');

  for (var _i = 0; _i < tlds.length; _i++) {
    tldHouse.innerHTML += '<input type="checkbox" value="' + (_i + 1) + '" name="tlds[]"> ' + tlds[_i] + '<br/>';
  }

  var updateCheckbox = function updateCheckbox() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : numLetters;

    checkboxHouse.innerHTML = '';
    for (var _i2 = 0; _i2 < num; _i2++) {
      pattern[_i2] = false;
      checkboxHouse.innerHTML += '<input type="checkbox" name="letter-type[]" class="letter-type" //>';
      letterTypes = document.getElementsByName('letter-type[]');
      for (var _i3 = 0; _i3 < letterTypes.length; _i3++) {
        letterTypes[_i3].addEventListener('change', updatePattern);
      }
    }
  };

  var toggleClass = function toggleClass(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0) classes.splice(existingIndex, 1);else classes.push(className);

      el.className = classes.join(' ');
    }
  };

  var init = function init() {
    updateCheckbox();
    var toggles = document.querySelectorAll('.toggle');
    for (var _i4 = 0; _i4 < toggles.length; _i4++) {
      toggles[_i4].addEventListener('click', function () {
        var toBeToggled = document.querySelectorAll(this.dataset.toggle);
        for (var _i5 = 0; _i5 < toBeToggled.length; _i5++) {
          toggleClass(toBeToggled[_i5], 'hidden');
        }
      });
    }
  };

  var include = undefined;

  var descriptions = ['A job listing startup', 'A hotel metasearch', 'A food delivery app', 'A "tinder-like" dating app'];

  var allFalse = function allFalse(array) {
    var first = array[0];
    return array.every(function (element) {
      return element === false;
    });
  };

  var updateTlds = function updateTlds() {};

  var includeText = document.getElementById('include-text');
  includeText.addEventListener('keyup', function () {
    include = this.value;
  });

  var sendOutput = function sendOutput(str) {
    var outElem = document.getElementById('output');
    outElem.innerHTML = str;
  };

  var makeWord = function makeWord(size) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var word = '';
    if (include !== undefined) {
      size = size - include.length;
    }
    for (var _i6 = 0; _i6 < size; _i6++) {
      if (allFalse(pattern)) {
        if (_i6 % 2 == 0) {
          word += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
          word += vowels[Math.floor(Math.random() * vowels.length)];
        }
      } else {
        if (pattern[_i6] == true) {
          word += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
          word += vowels[Math.floor(Math.random() * vowels.length)];
        }
      }
    }
    if (include !== undefined) {
      var position = 0;
      switch (includePos) {
        case '1':
          position = 0;
        case '2':
          break;
        case '3':
          position = size;
          break;
        default:
          position = Math.floor(Math.random() * (size + 1));
      }

      var word = [word.slice(0, position), include, word.slice(position)].join('');
    }
    word += tlds[Math.floor(Math.random() * tlds.length)];
    return word;
  };

  var numLettersInput = document.getElementById('letters');
  numLettersInput.addEventListener('keyup', function () {
    numLetters = this.value;
    updateCheckbox(numLetters);
  });

  var submit = function submit(e) {
    e.preventDefault();
    var word = makeWord(numLetters);
    sendOutput(word);
  };

  var updatePattern = function updatePattern() {
    for (var _i7 = 0; _i7 < letterTypes.length; _i7++) {
      pattern[_i7] = letterTypes[_i7].checked;
    }
  };

  init();

  var form = document.getElementById('main-form');
  form.addEventListener('submit', submit);
})();