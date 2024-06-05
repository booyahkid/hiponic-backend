
const { BigQuery } = require("@google-cloud/bigquery");
async function queryData() {
  const datasetId = 'sensor_datastream';
  const tableId = 'device_data';
  const projectId = 'capstone-trial-424209';
  try{
    const bigquery = new BigQuery({
      projectId: process.env.GOOGLE_CLOUD_PROJECT
    });
   
    const query =
    `
    SELECT * 
    FROM \`${projectId}.${datasetId}.${tableId}\`
    WHERE device_id = 'fawwaz anrico'
    ORDER BY timestamp DESC
    LIMIT 1;`;

    const options = {
      query: query,
    };
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    if (rows.length === 0) {
      throw new Error("No data found for the given device ID.");
    }
    console.log('Query results:');
    console.log(rows);
    console.log(typeof(rows));
    
    const {timestamp, device_id,ph,ph_status,humidity,hd_status,tds,tds_status} = rows[0];
    return {timestamp, device_id,ph,ph_status,humidity,hd_status,tds,tds_status};
  }catch(error){
    console.error('Original error:', error.message);
    throw new Error("Failed to query data");
  }
  
}
const coba = queryData();
module.exports = queryData;
