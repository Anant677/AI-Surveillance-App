status = "";
value = "";
object = [];
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide(); 
}
function draw(){
    image(video,0,0,400,400);
    if(status!=""){
        objectDetector.detect(video,gotResult);
    }
    for(var i=0;i<object.length ;i++){        
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("status1").innerHTML = "Objects Detected = "+object.length;
        confidence = floor(object[i].confidence*100);
        fill("#eb2c1e");
        text(object[i].label+" "+confidence+" % ",object[i].x,object[i].y-15);
        noFill();
        stroke("#eb2c1e");
        rect(object[i].x , object[i].y , object[i].width , object[i].height);
        if(value == object[i].label){
         video.stop();

         const speak = (msg) => {
            const sp = new SpeechSynthesisUtterance(msg);
            [sp.voice] = speechSynthesis.getVoices();
            speechSynthesis.speak(sp);
          }
          
          speak('Object Detected');
        }
    }
    
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modeLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects 😊"
    value = document.getElementById("input").value.toLowerCase();
    console.log(value);
}
function modeLoaded(){
    console.log("Model is Initialized");
    status = true;
}
function gotResult(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
object = results;
}
}