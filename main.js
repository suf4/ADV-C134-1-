music = "";
status = "";
objects = [];

function preload()
{
    music = loadSound("welcome_to_my_house.mp3");
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("number_of_objects").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0 ; i < objects.length ; i++) {
            document.getElementById("baby_found").innerHTML = "Object Detected";
            fill(255, 0, 0);
            noFill();
            stroke(255, 0, 0);
            text(objects[i].label, objects[i].x + 15 , objects[i].y + 15 );
            rect(objects[i].x, objects[i].y, objects[i].width , objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("baby_found").innerHTML = "Baby Found";
                music.stop();
            }
            else{
                document.getElementById("baby_found").innerHTML = "Baby Not Found";
                music.play();
            }
        }

    }
    
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);

    objects = results;
}