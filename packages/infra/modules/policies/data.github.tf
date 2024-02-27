data "aws_iam_policy_document" "s3_storage_manager_put_acl" {
  statement {
    sid = "S3StorageManagerPutACL"
    actions = [
      "s3:PutObject",
      "s3:ListBucket",
      "s3:DeleteObject",
      "s3:PutObjectAcl"
    ]
    effect = "Allow"
    resources = [
      var.s3_storage_manager_arn,
      format("%s/*", var.s3_storage_manager_arn)
    ]
  }
}

data "aws_iam_policy_document" "s3_storage_manager_lambdas_put_acl" {
  statement {
    sid = "S3StorageManagerLambdasPutACL"
    actions = [
      "s3:PutObject",
      "s3:ListBucket",
      "s3:DeleteObject",
      "s3:PutObjectAcl"
    ]
    effect = "Allow"
    resources = [
      var.s3_storage_manager_lambdas_arn,
      format("%s/*", var.s3_storage_manager_lambdas_arn)
    ]
  }
}
