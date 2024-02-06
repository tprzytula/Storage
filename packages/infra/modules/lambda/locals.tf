locals {
  lambda_root_directory         = "../lambdas"
  lambda_build_output_directory = format("%s/dist", local.lambda_root_directory)
  lambda_source_directory       = format("%s/sources", local.lambda_root_directory)

  lambda_functions = {
    "add_item" = {
      permissions = {
        database = "read-write"
      }
    }
    "get_items" = {
      permissions = {
        database = "read-only"
      }
    }
    "delete_item" = {
      permissions = {
        database = "read-write"
      }
    }
    "update_item" = {
      permissions = {
        database = "read-write"
      }
    }
    "get_collections" = {
      permissions = {
        database = "read-only"
      }
    }
  }
}
