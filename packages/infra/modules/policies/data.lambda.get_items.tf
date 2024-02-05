data "aws_iam_policy_document" "get_items_dynamodb_scan_policy" {
  statement {
    sid = "DynamoDBScanPolicy"
    actions = [
      "dynamodb:Scan",
    ]
    effect = "Allow"
    resources = [
      var.dynamodb_items_arn
    ]
  }
}
