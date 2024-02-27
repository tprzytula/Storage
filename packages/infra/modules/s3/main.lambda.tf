resource "aws_s3_bucket" "storage-manager-lambdas-bucket" {
  bucket = format("storage-manager-lambdas-%s", var.random_name)
}
