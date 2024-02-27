output "storage_manager_arn" {
  value = aws_s3_bucket.storage-manager-bucket.arn
}

output "storage_manager_lambdas_arn" {
  value = aws_s3_bucket.storage-manager-lambdas-bucket.arn
}
