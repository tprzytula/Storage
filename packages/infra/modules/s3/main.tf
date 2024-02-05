resource "aws_s3_bucket" "storage-manager-bucket" {
  bucket = format("storage-manager-%s", var.random_name)
}

resource "aws_s3_bucket_website_configuration" "storage_manager_website_configuration" {
  bucket = aws_s3_bucket.storage-manager-bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}
