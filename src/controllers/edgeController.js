const queryData = require('../services/load_bq');
const send_alert = require('../services/send_alert')
exports.getPh = async (req,res) => {
  try{
    const row = await queryData();
    const ph = row.ph;
    await send_alert();
    res.status(200).json({
      status: 'success',
      data: ph      
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
    res.status(200).json({
      status: 'success',
      data: humidity     
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
    res.status(200).json({
      status: 'success',
      data: tds     
    });
  }catch(error){
    res.status(500).json({
      status: 'error',
      message:error.message
    });
  }
}
