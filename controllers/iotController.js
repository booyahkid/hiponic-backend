const queryData = require('../services/load_bq');
const send_alert = require('../services/send_alert')

exports.getAllSensor = async (req, res) => {
  try{
    const row = await queryData();
    const sensorData = {
      ph:row.ph,
      humidity:row.humidity,
      temp: row.temp,
      tds: row.tds
    };
    res.status(200).json({
      status: 'success',
      sensorData: sensorData 
    });
  }catch(error){
    res.status(500).json({
      status: 'error',
      message:error.message
    });
  }
}
exports.getPh = async (req,res) => {
  
  try{
    const row = await queryData();
    const ph = row.ph;
    const ph_status = row.ph_status;
   /*  if(!ph_status){
      await send_alert();
    } */
    res.status(200).json({
      status: 'success',
      ph: ph      
    });
  }catch(error){
    res.status(500).json({
      status: 'error',
      message:error.message
    });
  }
}

exports.getHumidity = async (req,res) => {
  try{
    const row = await queryData();
    const humidity = row.humidity;
    const dht_status = row.dht_status;
    /* if(!hd_status){
      await send_alert();
    } */
    res.status(200).json({
      status: 'success',
      humidity: humidity     
    });
  }catch(error){
    res.status(500).json({
      status: 'error',
      message:error.message
    });
  }
}
exports.getTemp = async (req,res) => {
  try{
    const row = await queryData();
    const temp = row.temp;
    const dht_status = row.dht_status;
    /* if(!hd_status){
      await send_alert();
    } */
    res.status(200).json({
      status: 'success',
      temp: temp     
    });
  }catch(error){
    res.status(500).json({
      status: 'error',
      message:error.message
    });
  }
}
exports.getTDS = async (req,res) => {
  try{
    const row = await queryData();
    const tds = row.tds;
    const tds_status = row.tds_status;
    /* if(!tds_status){
      await send_alert();
    } */
    res.status(200).json({
      status: 'success',
      tds: tds     
    });
  }catch(error){
    res.status(500).json({
      status: 'error',
      message:error.message
    });
  }
}
