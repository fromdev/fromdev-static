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

  $resultText.val('<script> var titles = [\n');
  var separator = "";
  for (var title in arr) {
    $resultText.val($resultText.val() + separator);
    $resultText.val($resultText.val() + '"');
    $resultText.val($resultText.val() + arr[title]);
    $resultText.val($resultText.val() + '"');
    separator = ",\n";
  }
 $resultText.val($resultText.val() + '\n];</script>');
};


var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


var generateTitlesRandom = function(targets, topics, targetUrls) {
  var titleArray = new Array();
  if(templates) {
    var step;
    var currentTitle;
    for (step = 0; step < 75; step++) {
      currentTitle = (' ' + templates[getRandomInt(0, templates.length - 1)]).slice(1);
      currentTitle = currentTitle.replace("TARGETUSER", targets[getRandomInt(0, targets.length - 1)]);
      currentTitle = currentTitle.replace("HASHTAGS", topics[getRandomInt(0, topics.length - 1)]);
      currentTitle = currentTitle.replace("TARGETURL", targetUrls[getRandomInt(0, targetUrls.length - 1)]);
      titleArray.push(currentTitle);
      log(currentTitle);
    }
  }
  return titleArray;
};

var $singleTitle = $("#singleTitle");

$(document).ready(function() {
  $("#submit").click(function() {
    var targets = ["iPhone", "iOS", "iPad"];
    var topics = ["English Grammar"];
    targets = $('#target').val().split("\n");
    topics = $('#topic').val().split("\n");
    log('len = ' + targets.length);
    var targetUrls = $('#targetUrls').val().split("\n");
    var titleArray = generateTitlesRandom(targets, topics, targetUrls);
    showArray(titleArray);
    
    if($singleTitle) {
      $singleTitle.val(titleArray[getRandomInt(0, titleArray.length - 1)]);
    }
  });
  $("#result").selectOnFocus();
  if($singleTitle) {
    $singleTitle.selectOnFocus();
  }
});
