locals {
  s3_bucket_name = format("storage-manager-lambdas-%s", var.random_name)

  lambda_functions = {
    "add_item" = {
      environment_variables = {}
      permissions = {
        database = "read-write"
        rds      = "connect"
      }
    }
    "get_items" = {
      environment_variables = {}
      permissions = {
        database = "read-only"
        rds      = "connect"
      }
    }
    "delete_item" = {
      environment_variables = {}
      permissions = {
        database = "read-write"
        rds      = "connect"
      }
    }
    "update_item" = {
      environment_variables = {}
      permissions = {
        database = "read-write"
        rds      = "connect"
      }
    }
    "get_collections" = {
      environment_variables = {}
      permissions = {
        database = "read-only"
        rds      = "connect"
      }
    }
  }
}
