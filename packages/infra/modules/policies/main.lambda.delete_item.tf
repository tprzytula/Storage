resource "aws_iam_policy" "delete_item_lambda_dynamodb_policy" {
  name   = format("delete_item_lambda_dynamodb_policy_%s", var.random_name)
  policy = data.aws_iam_policy_document.delete_item_dynamodb_policy.json
}

resource "aws_iam_role_policy_attachment" "delete_item_lambda_role_attachment" {
  role       = var.lambda_functions["delete_item"].iam_role_name
  policy_arn = aws_iam_policy.delete_item_lambda_dynamodb_policy.arn
}
