data "aws_iam_policy_document" "add_item_dynamodb_put_policy" {
  statement {
    sid = "AllowAllActionsOnLogs"
    actions = [
      "dynamodb:PutItem",
    ]
    effect = "Allow"
    resources = [
      var.dynamodb_items_arn
    ]
  }
}
