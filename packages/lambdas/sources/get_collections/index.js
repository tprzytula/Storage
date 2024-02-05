const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "eu-west-2" });

const getCollections = async () => {
  const command = new ScanCommand({
    TableName: "items",
    ProjectionExpression: "#c",
    ExpressionAttributeNames: {
      "#c": "collection",
    },
  });

  const { Items } = (await client.send(command)) ?? {};
  const parsed = Items.map(({ collection }) => collection.S);

  return [...new Set(parsed)];
};

exports.handler = async (event, _context) => {
  console.info("Event received", event);

  try {
    const collections = (await getCollections()) ?? [];

    console.info("Returning collections", collections);

    return {
      statusCode: 200,
      body: JSON.stringify(collections),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.log("Encountered error:", error);

    return { statusCode: 500 };
  }
};
