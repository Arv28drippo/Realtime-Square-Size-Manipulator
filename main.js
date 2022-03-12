noseX = 0;
noseY = 0;

leftWrist = 0;
rightWrist = 0;

difference = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log('PoseNet Is Initialized!');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        console.log("noseX = " + noseX + "noseY = " + noseY);

        leftWrist = results[0].pose.leftWrist.x;
        rightWrist = results[0].pose.rightWrist.x;

        difference = leftWrist - rightWrist;
        difference = floor(leftWrist - rightWrist);
        
        console.log("leftWrist = " + leftWrist + "rightWrist = " + rightWrist + "difference = " + difference);
    }
}

function draw()
{
    background('#969A97');

    document.getElementById("square_side").innerHTML = "Height And Width Of The Square Will Be " + difference + "px";

    fill('#F90093');
    stroke('#F90093');

    square(noseX, noseY, difference)
}