const tf = require('@tensorflow/tfjs');

const loadModel = require('./load_model');
let model;

// Load the model once when the server starts
(async () => {
    try {
        model = await loadModel();
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Failed to load model:', error);
    }
})();

async function predictClassification(image){
    try{
    const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()


    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
    const classes = ['Bacterial', 'Deficient', 'Fungal', 'Healthy'];
    
    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    let message;

    if(label === 'Bacterial'){
        message = "tanaman anda terserang bakteri!";
    }
    if(label === 'Deficient'){
        message = "tanaman anda kurang nutrisi!";
    }
    if(label === 'Fungal'){
        message = "tanaman anda terserang jamur!";
    }
    if(label === 'Healthy'){
        message = "tanaman anda sangat sehat!";
    }
    return { confidenceScore, label, message};

    } catch(error) {
        throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
    }
}


module.exports = predictClassification;