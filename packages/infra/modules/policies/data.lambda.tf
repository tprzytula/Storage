data "aws_iam_policy_document" "lambda_policies" {
  for_each = var.lambda_functions

  statement {
    sid = "RoleForBasicLambdaLogs"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    effect = "Allow"
    resources = [
      "*"
    ]
  }

  statement {
    sid = "EC2NetworkInterfaceManagement"
    actions = [
      "ec2:CreateNetworkInterface",
      "ec2:DescribeNetworkInterfaces",
      "ec2:DeleteNetworkInterface"
    ]
    effect = "Allow"
    resources = [
      "*"
    ]
  }

  dynamic "statement" {
    for_each = each.value.permissions.database == "read-only" ? [each.key] : []

    content {
      sid = "DatabaseReadOnly"
      actions = [
        "dynamodb:GetItem",
        "dynamodb:Scan",
      ]
      effect = "Allow"
      resources = [
        var.dynamodb_items_arn
      ]
    }
  }

  dynamic "statement" {
    for_each = each.value.permissions.database == "read-write" ? [each.key] : []

    content {
      sid = "DatabaseReadWrite"
      actions = [
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Scan",
        "dynamodb:UpdateItem",
      ]
      effect = "Allow"
      resources = [
        var.dynamodb_items_arn
      ]
    }
  }

  dynamic "statement" {
    for_each = each.value.permissions.rds == "connect" ? [each.key] : []

    content {
      sid = "DatabaseConnect"
      actions = [
        "rds-db:connect",
      ]
      effect = "Allow"
      resources = [
        format("arn:aws:rds-db:%s:%s:dbuser:*/*", data.aws_region.current.name, data.aws_caller_identity.current.account_id)
      ]
    }
  }
}
