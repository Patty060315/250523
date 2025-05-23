let video;
let facemesh;
let predictions = [];
const leftEyeLineIndices = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  // 模型載入完成
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 畫左眼紅色粗線
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    for (let i = 0; i < leftEyeLineIndices.length - 1; i++) {
      const idxA = leftEyeLineIndices[i];
      const idxB = leftEyeLineIndices[i + 1];
      const [xA, yA] = keypoints[idxA];
      const [xB, yB] = keypoints[idxB];
      line(xA, yA, xB, yB);
    }
  }
}
