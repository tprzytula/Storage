locals {
  lambda_root_directory         = "../lambdas"
  lambda_build_output_directory = format("%s/dist", local.lambda_root_directory)
  lambda_source_directory       = format("%s/sources", local.lambda_root_directory)

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
