const predictClassification = require('../services/inference_data');

exports.postPredictHandler = async (req, res) => {
    try{
        const { image } = req.body;
   
        const { confidenceScore, label, message } = await predictClassification(image);
        const data = {
        "result": label,
        "message": message,
        "confidenceScore": confidenceScore
        }
        res.status(200).json({
            status:"success",
            predictResult: data
        });
    }catch(error){
        res.status(500).json(error.message);
    }
  }
   