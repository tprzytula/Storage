resource "aws_iam_policy" "add_item_lambda_dynamodb_policy" {
  name   = format("add_item_lambda_dynamodb_policy_%s", var.random_name)
  policy = data.aws_iam_policy_document.add_item_dynamodb_put_policy.json
}

resource "aws_iam_role_policy_attachment" "add_item_lambda_role_attachment" {
  role       = var.lambda_functions["add_item"].iam_role_name
  policy_arn = aws_iam_policy.add_item_lambda_dynamodb_policy.arn
}
