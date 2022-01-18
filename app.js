ethereum. autoRefreshOnNetworkChange = false;
ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0xC828209FCe1ae4bCf971232FcA06bBA00cFA605f";
const contractABI = [
    "function reward(uint256 amt) public" 
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);
// tokenWithSigner.reward(10);


/////p5////
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/g3LNjpnqC/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confidence = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.parent("#sketch");
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label + " , " + confidence, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
let shouldReward = true;
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  ////transaction related code////


  // The results are in an array ordered by confidence.
  //console.log(results[0]);
  label = results[0].label;
  confidence = results[0].confidence;
  //what i need to initiate a transaction
  let shouldReward = true;
  if (results[0].label == "thumbs up" && results[0].confidence > 0.97 && shouldReward){

    // tokenWithSigner.reward(10);
    shouldReward = false;

  }
  // Classifiy again!
  classifyVideo();
}