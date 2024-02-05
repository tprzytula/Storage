import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

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
  const parsed = (Items as any).map(({ collection }) => collection.S);

  return [...new Set(parsed)];
};

export const handler = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
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

    return { body: "Internal Server Error", statusCode: 500 };
  }
};
