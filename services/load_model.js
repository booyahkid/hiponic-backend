const tf = require('@tensorflow/tfjs');
require('dotenv').config();
async function loadModel(){
    return tf.loadGraphModel('https://storage.googleapis.com/hiponic-model/imageModel/imageModel/model.json');
}

module.exports = loadModel;