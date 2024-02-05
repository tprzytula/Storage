terraform {
  backend "s3" {
    bucket  = "terraform-state-evvzl7ombf"
    key     = "state/terraform-aws-household-storage/terraform.tfstate"
    region  = "eu-west-2"
    profile = "household-storage"
  }
}
