resource "aws_iam_policy" "get_collections_lambda_dynamodb_policy" {
  name   = format("get_collections_lambda_dynamodb_policy_%s", var.random_name)
  policy = data.aws_iam_policy_document.get_collections_dynamodb_scan_policy.json
}

resource "aws_iam_role_policy_attachment" "get_collections_lambda_role_attachment" {
  role       = var.lambda_functions["get_collections"].iam_role_name
  policy_arn = aws_iam_policy.get_collections_lambda_dynamodb_policy.arn
}
