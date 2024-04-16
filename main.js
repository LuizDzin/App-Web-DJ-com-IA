var song;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

var scoreLeftWrist;
var scoreRightWrist;


function preload() {
    song = loadSound("music.mp3");
}

function modelLoaded() {
    console.log('poseNet Is Intialized');
}

function setup() {
 canvas = createCanvas(500, 400)
 canvas.center()
 video = createCapture(VIDEO)
 video.size(500, 400)
 video.hide()

 poseNet = ml5.poseNet(video, modelLoaded);
 poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreRightWrist)
    }
}

function draw() {
    image(video, 0, 0, 500, 400);
    fill("#ff0000");
    stroke("#ff0000");
    
    if(scoreRightWrist > 0.02) {
        circle(rightWristX, rightWristY, 20);
        left = Number(leftWristY);
        remove_decimals = floor(left);
        volume = remove_decimals/500;
        document.getElementById("Volume").innerHTML = "Volume = " + volume;

        song.setVolume(volume);
    }
    if(scoreLeftWrist > 0.02) {
        circle(leftWristX, leftWristY, 20);

        if(leftWristY >0 && leftWristY <=100) {
    document.getElementById("Speed").innerHTML = "Velocidade = 2.5x";
    song.rate(2.5);
        }

        if(leftWristY >100 && leftWristY <=200) {
    document.getElementById("Speed").innerHTML = "Velocidade = 2x";
    song.rate(2);
        }

        if(leftWristY >200 && leftWristY <=300) {
    document.getElementById("Speed").innerHTML = "Velocidade = 1.5x";
    song.rate(1.5);
        }

        if(leftWristY >300 && leftWristY <=400) {
    document.getElementById("Speed").innerHTML = "Velocidade = 1x";
    song.rate(1);
        }

        if(leftWristY >400) {
    document.getElementById("Speed").innerHTML = "Velocidade = 0.5x";
    song.rate(0.5);
        }
        }
    }


function Start() {
    
    if(song.isPlaying()) {
        song.stop();
        //document.getElementById("btn").innerHTML = "Reproduzir"
    } else {
        song.play();
        //document.getElementById("btn").innerHTML = "Pausar"
        song.setVolume(1);
        song.rate(1);
    }
}