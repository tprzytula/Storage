resource "aws_iam_policy" "update_item_lambda_dynamodb_policy" {
  name   = format("update_item_lambda_dynamodb_policy_%s", var.random_name)
  policy = data.aws_iam_policy_document.update_item_dynamodb_policy.json
}

resource "aws_iam_role_policy_attachment" "update_item_lambda_role_attachment" {
  role       = var.lambda_functions["update_item"].iam_role_name
  policy_arn = aws_iam_policy.update_item_lambda_dynamodb_policy.arn
}
