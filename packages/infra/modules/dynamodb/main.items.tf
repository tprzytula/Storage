resource "aws_dynamodb_table" "items" {
  name           = "items"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "collection"
    type = "S"
  }

  global_secondary_index {
    name            = "CollectionIndex"
    hash_key        = "collection"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }
}