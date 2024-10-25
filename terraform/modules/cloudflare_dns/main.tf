terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "5.0.0-alpha1"
    }
  }
}

provider "cloudflare" {
  api_token = local.cloudflare_api_token 
}

data "aws_acm_certificate" "cert" {
  domain   = "echo.zeynabyusuf.com"
  statuses = ["ISSUED"]
}

data "aws_secretsmanager_secret_version" "cloudflare_api_token_version" {
  secret_id = "cloudflare_api_token"
}

locals {
  cloudflare_api_token = jsondecode(data.aws_secretsmanager_secret_version.cloudflare_api_token_version.secret_string)["api_token"]
}
