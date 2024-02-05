resource "aws_iam_role" "lambda_roles" {
  for_each = local.lambda_functions

  name               = format("%s_lambda_role_%s", each.key, var.random_name)
  assume_role_policy = data.aws_iam_policy_document.basic_lambda_role.json
}

resource "aws_lambda_function" "lambda_functions" {
  for_each = local.lambda_functions

  filename         = format("%s/%s/%s.zip", local.lambda_build_output_directory, each.key, each.key)
  function_name    = format("%s_%s", each.key, var.random_name)
  role             = aws_iam_role.lambda_roles[each.key].arn
  handler          = "index.handler"
  source_code_hash = filebase64sha256(format("%s/%s/%s.zip", local.lambda_build_output_directory, each.key, each.key))
  runtime          = "nodejs20.x"
  memory_size      = "512"
  publish          = true
  timeout          = 5
}

