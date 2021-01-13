var noseX, noseY, difference, leftWrist, rightWrist;

function preload() { }

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent('canvas_div')
    video = createCapture(VIDEO);
    video.parent('video_div');
    posenet = ml5.poseNet(video, modelLoaded);
}

function draw() {
    background('#aaa');
    posenet.on('pose', gotPoses)
    colours = ["chartreuse", "cyan", "red", "yellow", "darkorange", "violet", "pink"]
    borderColours = ["green", "blue", "darkred", "darkgoldenrod", "orange", "purple", "hotpink"]
    setTimeout(()=>{
        i = round(random(0, 8));
        fill(colours[i]);
        strokeWeight(10);
        stroke(borderColours[i]);
        console.log(i)
        console.log(borderColours[i])
    }, 2000);
    square(noseX, noseY, difference);
    document.getElementById('size').innerHTML = "Size of the square:" + difference;
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = round(results[0].pose.nose.x);
        noseY = round(results[0].pose.nose.y);
        console.log("Nose X:" + noseX, "Nose Y:" + noseY);
        leftWrist = results[0].pose.leftWrist.x;
        rightWrist = results[0].pose.rightWrist.x;
        console.log(leftWrist, rightWrist);
        difference = floor(leftWrist - rightWrist);
    }
}

function modelLoaded() {
    console.log('Model initialized');
}