var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(event){
    if(!started){
    nextSequence();
    $("h1#level-title").text("Level "+level);
    started=true;
    }
});


$(".btn").click(function(){
    if(started){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    }
});


function nextSequence(){
    userClickedPattern=[];

    level++;
    $("h1#level-title").text("Level "+level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100);
    
}

function checkAnswer(currentLevel){
    console.log(gamePattern[currentLevel]);
    console.log(userClickedPattern[currentLevel]);
    console.log(gamePattern);
    console.log(userClickedPattern);
    console.log(currentLevel);
   
   
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ 
            if (userClickedPattern.length === gamePattern.length){ 
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        }else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
        
        }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
