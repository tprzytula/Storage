const { randomUUID } = require("crypto");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "eu-west-2" });

const addItem = async ({ name, quantity, form, icon, collection }) => {
  const id = randomUUID();

  const command = new PutItemCommand({
    TableName: "items",
    Item: {
      id: { S: id },
      name: { S: name },
      quantity: { N: `${quantity}` },
      form: { S: form },
      icon: { S: icon },
      collection: { S: collection },
    },
  });

  await client.send(command);

  return {
    id,
    name,
    quantity,
    form,
    icon,
    collection,
  };
};

exports.handler = async (event, _context) => {
  console.info("Event received", event);

  const { collection } = event.pathParameters;
  const { name, quantity, form, icon } = JSON.parse(event.body);

  console.info(
    "Adding name: ",
    name,
    "quantity:",
    quantity,
    "form:",
    form,
    "icon:",
    icon,
    "collection:",
    collection
  );

  try {
    const addedItem = await addItem({ name, quantity, form, icon, collection });

    return {
      statusCode: 201,
      body: JSON.stringify(addedItem),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.log("Encountered error:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
