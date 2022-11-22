sound="";
status="";
object=[];

function preload() {
    sound=loadSound("sound.mp3");
}

function setup() {
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
   
    if (status != "") {
        r=random(255);
        g=random(255);
        b=random(255);
            objectDetector.detect(video, gotResults);
            for (i=0;i<object.length;i++) {
            document.getElementById("status").innerHTML="status: objects detected";
            fill(r, g, b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object[i].label=="person") {
                document.getElementById("number_of_objects").innerHTML="baby found";
                console.log("stop");
                sound.stop();
            }
            else {
                document.getElementById("number_of_objects").innerHTML="baby not found";
                console.log("play");
                sound.play(); 
            }
        }
        if (object.length==0) {
            document.getElementById("number_of_objects").innerHTML="baby not found";
            console.log("play");
            sound.play(); 
        }
    }
}

function modelLoaded() {
    console.log("model is loaded");
    status=true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);

    object=results;
}
