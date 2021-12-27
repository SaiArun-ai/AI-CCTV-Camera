var img = "";
var status = "";
var objects = [];
var counter = 1;
var counter2 = 1;
function setup(){
    canvas = createCanvas(380,380);
    canvas.position(600,300)
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    ml52 = ml5.objectDetector("cocossd",ML);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}
function ML(){
    status = true;
}
function gotresult(error,result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        objects = result;
    }
}
function Start(){
    ml52.detect(video,gotresult);
    counter = 0;
    counter2 = 0;
}
function Stop(){
    counter = 1;
    counter2 = 1;
}
function draw(){
    image(video,0,0,380,380);
    if(counter == 0 && status != ""){
        Start()
        for(i = 0; i<objects.length; i++){
            r = random(0,255);
            g = random(0,255);
            b = random(0,255);
            document.getElementById("status").innerHTML = "Status:Object Identified";
            fill(r,g,b);
            text(objects[i].label + ", " + 100*objects[i].confidence + "%",objects[i].x,objects[i].y);
            document.getElementById("NOODOS").innerHTML = "No. Of Objects Detected On Site = " + objects.length;
            noFill();
            stroke(b,r,g);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }else if (status != ""){
       console.error("IF IS WORKING GOOODDOODODODODO");
}}