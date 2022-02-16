/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as haircolor from '@tensorflow-models/face-tfjs';
import * as tf from '@tensorflow/tfjs-core';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

const stats = new Stats();
stats.showPanel(0);
document.body.prepend(stats.domElement);

// eslint-disable-next-line one-var
let model, ctx, videoWidth, videoHeight, video, canvas;

const state = {
  backend: 'webgl',
};

const gui = new dat.GUI();
gui.add(state, 'backend', ['wasm', 'webgl', 'cpu'])
  .onChange(async (backend) => {
  await tf.setBackend(backend);
});

async function setupCamera() {
  video = document.getElementById('video');

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {facingMode: 'user'},
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

const status = (message) => {
  // const statusMessage = document.getElementById('status-message');
  // statusMessage.innerText = message;
  console.log(message);
};

const renderPrediction = async () => {
  stats.begin();

  // const returnTensors = false;
  // const flipHorizontal = true;
  // const annotateBoxes = true;
  // const predictions = await model.estimateMask(video);
  // console.log(predictions);

  // ctx.putImageData(segmentationMapData, 0, 0);
  // const initialisationStart = performance.now();
  model.segment(video).then((output) => {
    // console.log(output);
    displaySegmentationMap(output);

    // status(`Ran in ${
    //   ((performance.now() - initialisationStart) / 1000).toFixed(2)} s`);
  });

  stats.end();

  requestAnimationFrame(renderPrediction);
};

const displaySegmentationMap = (segmentOutput) => {
  const {height, width, segmentationMap} = segmentOutput;
  const segmentationMapData = new ImageData(segmentationMap, width, height);

  ctx.putImageData(segmentationMapData, 0, 0);
};

const setupPage = async () => {
  await tf.setBackend(state.backend);
  await setupCamera();
  video.play();

  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;
  video.width = videoWidth;
  video.height = videoHeight;

  canvas = document.getElementById('output');
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  ctx = canvas.getContext('2d');
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = 'blue';
  // ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

  model = await haircolor.load({videoWidth, videoHeight});
  console.log(model);
  renderPrediction();
};

setupPage();
