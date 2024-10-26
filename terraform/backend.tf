terraform {
  backend "s3" {
    bucket         = "team-echo-state-bucket"
    key            = "terraform/state"
    region         = "eu-west-2"
    dynamodb_table = "team-echo-tf-state-lock"
    encrypt        = true
  }
}



