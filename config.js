const AWS = require('aws-sdk');
require('dotenv').config()
// Configuring AWS with credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,      // IAM user's access key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // IAM user's secret key
  region: 'us-east-1'                     // Replace with your region
});

// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// const params = {
//     TableName: 'brands',   // Replace with your table name
//     Key: {
//       'brandID': '123'         // Replace with the actual primary key value
//     }
//   };
  
//   dynamoDB.get(params, function (err, data) {
//     if (err) {
//       console.log("Error reading item:", err);
//     } else {
//       console.log("Item retrieved:", data.Item);
//     }
//   });
// const params = {
//   TableName: 'brands',  // Replace with your table name
//   Item: {
//     'brandID': '123',       // Replace with the partition key
//     'Attribute1': 'value1',    // Replace with the actual attributes
//     'Attribute2': 'value2'
//   }
// };

// dynamoDB.put(params, function (err, data) {
//   if (err) {
//     console.log("Error inserting item:", err);
//   } else {
//     console.log("Item inserted successfully:", data);
//   }
// });
