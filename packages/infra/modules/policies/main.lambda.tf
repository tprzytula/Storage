resource "aws_iam_policy" "lambda_policies" {
  for_each = var.lambda_functions

  name   = format("%s_lambda_policy_%s", each.key, var.random_name)
  policy = data.aws_iam_policy_document.lambda_policies[each.key].json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_role_attachment" {
  for_each = var.lambda_functions

  role       = each.value.iam_role_name
  policy_arn = aws_iam_policy.lambda_policies[each.key].arn
}
