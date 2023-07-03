// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

/*importacion carrillo*/
import { AppRegistry } from 'react-native';
import AWS from 'aws-sdk';
/*---------------------*/

const PostStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const { Post } = initSchema(schema);

export {
  Post,
  PostStatus
};

/* tabla carrillo */
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
