import { randomUUID } from "crypto";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { callProcedure } from "@storage-lambda-common/database";

const client = new DynamoDBClient({ region: "eu-west-2" });

const addItemMysql = async ({ name, quantity, form, icon, collection }) => {
  try {
    await callProcedure(
      "AddItemToCollection",
      name,
      form,
      quantity,
      collection,
      icon
    );
  } catch (error) {
    console.error("addItemMysql error", error);
  }
};

const addItemDynamoDB = async ({ name, quantity, form, icon, collection }) => {
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

export const handler = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  console.info("Event received", event);

  const { collection } = event.pathParameters ?? {};
  const { name, quantity, form, icon } = JSON.parse(event.body as any);

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
    addItemMysql({ name, quantity, form, icon, collection });
    const addedItem = await addItemDynamoDB({
      name,
      quantity,
      form,
      icon,
      collection,
    });

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
      body: "Internal Server Error",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 500,
    };
  }
};
