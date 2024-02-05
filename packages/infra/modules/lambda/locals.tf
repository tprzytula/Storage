locals {
  lambda_root_directory = "../lambdas"
  lambda_build_output_directory = format("%s/dist", local.lambda_root_directory)
  lambda_source_directory = format("%s/sources", local.lambda_root_directory)

  lambda_functions = {
    "add_item" = {}
    "get_items" = {}
    "delete_item" = {}
    "update_item" = {}
    "get_collections" = {}
  }
}
