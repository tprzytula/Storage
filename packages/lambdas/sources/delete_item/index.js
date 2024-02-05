const {
  DynamoDBClient,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "eu-west-2" });

const deleteItem = async (id) => {
  const command = new DeleteItemCommand({
    TableName: "items",
    Key: {
      id: {
        S: id,
      },
    },
  });

  return await client.send(command);
};

exports.handler = async (event, _context) => {
  console.info("Event received", event);

  const { id, collection } = event.pathParameters;

  try {
    await deleteItem(id, collection);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.log("Encountered error:", error);

    return { statusCode: 500 };
  }
};
