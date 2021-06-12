object = [];
status = "";
alarm = "";
function preload() {
    alarm = loadSound('music.mp3');
}

function setup(){
canvas = createCanvas(300, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(300, 380);
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting objects";
}


function draw(){
image(video, 0, 0, 300, 380);
if (status != ""){
    r = random(255);
    b= random(255);
    g= random(255);

    objectDetector.detect(video, gotResult);
    for (i = 0; i < object.length; i++) {
    document.getElementById("status").innerHTML="status= object detected";
    document.getElementById("numberofobjects").innerHTML = "Number Of Objects Detected Are: " + object.length;   
    fill(r,g,b);
    percent = floor(object[i].confidence*100);
    text(object[i].label + " "+ percent + "%", object[i].x, object[i].y);
    noFill();
    stroke(r,g,b);
    rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
}
}

function modelLoaded(){
    console.log('model is loaded');
    status = true;
}

 function gotResult(error, results) {
     if (error){
         console.log(error);
     }
     console.log(results);
     object = results;
 }
