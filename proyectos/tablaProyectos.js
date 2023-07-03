import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: '185346174304',
    secretAccessKey: 'Taskverse123##$$',
    region: 'us-east-1',
  });
  
const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Prueba_Carrillo',
  KeySchema: [
    { AttributeName: 'ID', KeyType: 'HASH' }, // Hash key
  ],
  AttributeDefinitions: [
    { AttributeName: 'ID', AttributeType: 'N' }, // Number type
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Error al crear la tabla:', err);
  } else {
    console.log('Tabla creada exitosamente:', data);
  }
});
