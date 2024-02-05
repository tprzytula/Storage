const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "eu-west-2" });

const getItems = async (collection) => {
  const command = new ScanCommand({
    TableName: "items",
    FilterExpression: "#c = :c",
    ExpressionAttributeValues: {
      ":c": {
        S: collection,
      },
    },
    ExpressionAttributeNames: {
      "#c": "collection",
    },
  });

  const { Items } = (await client.send(command)) ?? {};

  return Items;
};

const parseItems = (Items) => {
  return Items.map(({ quantity, form, id, name, icon, collection }) => ({
    quantity: parseInt(quantity.N, 10),
    form: form.S,
    id: id.S,
    name: name.S,
    icon: icon.S,
    collection: collection.S,
  }));
};

exports.handler = async (event, _context) => {
  console.info("Event received", event);

  const { collection } = event.pathParameters;

  try {
    const items = (await getItems(collection)) ?? [];
    const parsedItems = parseItems(items);

    console.info("Returning items", parsedItems);

    return {
      statusCode: 201,
      body: JSON.stringify(parsedItems),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.log("Encountered error:", error);

    return { statusCode: 500 };
  }
};
