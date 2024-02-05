const {
  DynamoDBClient,
  UpdateItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "eu-west-2" });

const updateItem = async ({ id, name, quantity, form, icon, collection }) => {
  const command = new UpdateItemCommand({
    TableName: "items",
    Key: {
      id: {
        S: id,
      },
    },
    UpdateExpression:
      "set #n = :n, quantity = :q, form = :f, icon = :i, #c = :c",
    ExpressionAttributeNames: {
      "#n": "name",
      "#c": "collection",
    },
    ExpressionAttributeValues: {
      ":n": { S: name },
      ":q": { N: quantity.toString() },
      ":f": { S: form },
      ":i": { S: icon },
      ":c": { S: collection },
    },
  });

  return await client.send(command);
};

const getItem = async (id) => {
  const command = new GetItemCommand({
    TableName: "items",
    Key: {
      id: {
        S: id,
      },
    },
  });

  const { Item } = await client.send(command);

  return parseItem(Item);
};

const parseItem = ({ quantity, form, id, name, icon, collection }) => {
  return {
    quantity: parseInt(quantity.N, 10),
    form: form.S,
    id: id.S,
    name: name.S,
    icon: icon.S,
    collection: collection.S,
  };
};

exports.handler = async (event, _context) => {
  console.info("Event received", event);

  const { id, collection } = event.pathParameters;
  const { name, quantity, form, icon } = JSON.parse(event.body);

  try {
    await updateItem({ id, name, quantity, form, icon, collection });

    const updatedItem = await getItem(id);

    console.info("Returning updated item", updatedItem);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedItem),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.log("Encountered error:", error);

    return { statusCode: 500 };
  }
};
