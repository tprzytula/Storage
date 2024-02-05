data "aws_iam_policy_document" "update_item_dynamodb_policy" {
  statement {
    sid = "DynamoDBUpdateItemPolicy"
    actions = [
      "dynamodb:UpdateItem",
      "dynamodb:GetItem",
    ]
    effect = "Allow"
    resources = [
      var.dynamodb_items_arn
    ]
  }
}
