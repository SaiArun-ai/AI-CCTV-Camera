var img = "";
var status = "";
var objects = [];
var Objectos;
counter;
function setup(){
    counter = "";
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    ml5 = ml5.objectDetector("cocossd",ML);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}
function ML(){
    status = true;
    ml5.detect(video,gotresult);
}
function Start(){
    if(document.getElementById("Objectos").value != ""){
        ml5.detect(video,gotresult);
        counter = 0;
        counter2 = 0;
        Objectos = document.getElementById("Objectos").value;
    }
}
function Stop(){
    counter = 1;
    counter2 = 1;
}
function draw(){
    image(video,0,0,380,380);
    if(status != "" && counter == 0){
        Start()
        for(i = 0; i<objects.length; i++){            
            r = random(0,255);
            g = random(0,255);
            b = random(0,255);
            document.getElementById("status").innerHTML = "Status:Checking Objects";
            fill(r,g,b);
            text(objects[i].label + ", " + 100*objects[i].confidence + "%",objects[i].x,objects[i].y);
            document.getElementById("NOODOS").innerHTML = "No. Of Objects Detected On Site = " + objects.length;
            noFill();
            stroke(b,r,g);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == Objectos){
                document.getElementById("status").innerHTML = "Status:Object Found";
            }else if(objects[i].label != Objectos) {
                    document.getElementById("status").innerHTML = "Status:Object Not found";
                }
            }
        }
        
    }

function gotresult(error,result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        objects = result;
    }
}
