
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var gamePattern = [];
var level = 0
var count = 0
var wrong = false;

$(document).keypress(function() {
    if(!started) {
        started = true;
        nextSequence();
        $("h1").text("Level " + level)
    }
    if(started && wrong === true) {
        wrong = false;
        level = 0;
        count = 0;
        gamePattern = [];
        $("h1").text("Level " + level)
        nextSequence()
    }
})

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
  count = 0;
  level += 1
  $("h1").text("Level " + level)
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)

}

function checkAnswer(check) {
    if(check != gamePattern[count]) {
        wrong = true
        playSound("wrong")
        $("h1").text("Game Over. Press Any Key to restart.")
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);

    }
}

$(".btn").on("click", function() {
    var c = $(this).attr("id");
    playSound(c)
    animatePress(c)
    checkAnswer(c)
    count += 1
    if(count == gamePattern.length) {
        count = 0
        setTimeout(nextSequence, 1000);
    }
})
