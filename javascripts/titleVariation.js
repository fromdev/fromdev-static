var debug = false;

var log = function(msg) {
  if (debug) {
    console.log(msg);

  }
};

var shuffle = function(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

var showArray = function(arr) {
  //arr = shuffle(arr);
  var $resultText = $("#result");

  $resultText.val('');
  var separator = "";
  for (var title in arr) {
    $resultText.val($resultText.val() + separator);
    $resultText.val($resultText.val() + '"');
    $resultText.val($resultText.val() + arr[title]);
    $resultText.val($resultText.val() + '"');
    separator = ",\n";
  }
  log('arrval = ' + arr);

};



var templates = [
  "Best TOPIC Apps for TARGET",
  "Best TOPIC App for TARGET",
  "Top TOPIC App for TARGET",
  "Top TOPIC App for TARGET",
  "Recommended TOPIC Apps for TARGET",
  "Recommended TOPIC App for TARGET",
  "Best Apps To Learn TOPIC for TARGET",
  "Good TOPIC Apps for TARGET",
  "Good TOPIC App for TARGET",
  "Learn TOPIC Apps for TARGET",
  "Learn TOPIC App for TARGET",
  "TOPIC Apps for TARGET",
  "TOPIC App for TARGET",
  "Best TARGET TOPIC App",
  "TOPIC for TARGET App",
  "TARGET TOPIC Apps"
];

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var generateTitles = function(targets, topics) {
  var titleArray = new Array();
  var currentTitle;
  for (var template in templates) {
    currentTitle = (' ' + templates[template]).slice(1);
    for (var target in targets) {
      if (targets[target]) {
        currentTitle = currentTitle.replace("TARGET", targets[target]);
        for (var topic in topics) {
          if (topics[topic]) {
            currentTitle = currentTitle.replace("TOPIC", topics[topic]);
            titleArray.push(currentTitle);
          }
        }
      }
    }
  }
  return titleArray;
};
var generateTitlesRandom = function(targets, topics) {
  var titleArray = new Array();
  var step;
  var currentTitle;
  for (step = 0; step < 75; step++) {
    currentTitle = (' ' + templates[getRandomInt(0, templates.length - 1)]).slice(1);
    currentTitle = currentTitle.replace("TARGET", targets[getRandomInt(0, targets.length - 1)]);
    currentTitle = currentTitle.replace("TOPIC", topics[getRandomInt(0, topics.length - 1)]);
    titleArray.push(currentTitle);
    log(currentTitle);
  }

  return titleArray;
};

$(document).ready(function() {
  $("#submit").click(function() {
    var targets = ["iPhone", "iOS", "iPad"];
    var topics = ["English Grammar"];
    targets = $('#target').val().split("\n");
    topics = $('#topic').val().split("\n");
    log('len = ' + targets.length);
    var titleArray = generateTitlesRandom(targets, topics);
    showArray(titleArray);
  });
  $("#result").selectOnFocus();
});
