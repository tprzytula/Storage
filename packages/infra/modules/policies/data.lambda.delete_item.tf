data "aws_iam_policy_document" "delete_item_dynamodb_policy" {
  statement {
    sid = "DeleteItemDynamoDB"
    actions = [
      "dynamodb:DeleteItem",
    ]
    effect = "Allow"
    resources = [
      var.dynamodb_items_arn
    ]
  }
}
