
module "network" {
  source = "./modules/network"
  vpc_cidr      = var.vpc_cidr
  subnet_1_cidr = var.subnet_1_cidr
  subnet_2_cidr = var.subnet_2_cidr
}


module "ecs" {
  source = "./modules/ecs"
  vpc_id         = module.network.vpc_id
  subnet_ids     = module.network.subnet_ids
  alb_sg_id      = module.network.alb_sg_id
  app_image      = local.team_echo_app_image
  certificate_arn = data.aws_acm_certificate.cert.arn
  domain_name    = var.zone_name
  zone_id        = local.cloudflare_zone_id 
  ecs_execution_role_arn = local.ecs_execution_role_arn  
}

module "cloudflare_dns" {
  source       = "./modules/cloudflare_dns"
  zone_id      = local.cloudflare_zone_id  
  record_name  = var.record_name          
  record_value = module.ecs.alb_dns_name   
  ttl          = 300
  proxied      = false       
  alb_dns_name = module.ecs.alb_dns_name              
}

resource "cloudflare_dns_record" "alb_cname_record" {
  zone_id = local.cloudflare_zone_id  
  name    = var.record_name            
  type    = "CNAME"
  content   = module.ecs.alb_dns_name    
  ttl     = var.ttl
  proxied = var.proxied                
}


output "alb_dns_name" {
  value = module.ecs.alb_dns_name
}


# Fetch  from Secrets Manager
data "aws_secretsmanager_secret_version" "ecs_execution_role_value" {
  secret_id = "ecs_execution_role_arn"
}

data "aws_secretsmanager_secret_version" "team_echo_app_image_value" {
  secret_id = "team_echo_app_image"
}

data "aws_secretsmanager_secret_version" "cloudflare_api_token_version" {
  secret_id = "cloudflare_api_token"
}

data "aws_secretsmanager_secret_version" "cloudflare_zone_version" {
  secret_id = "cloudflare_zone_id"
}


locals {
  ecs_execution_role_arn = jsondecode(data.aws_secretsmanager_secret_version.ecs_execution_role_value.secret_string)["role_arn"]
  team_echo_app_image    = jsondecode(data.aws_secretsmanager_secret_version.team_echo_app_image_value.secret_string)["image"]
  cloudflare_api_token   = jsondecode(data.aws_secretsmanager_secret_version.cloudflare_api_token_version.secret_string)["api_token"]
  cloudflare_zone_id     = jsondecode(data.aws_secretsmanager_secret_version.cloudflare_zone_version.secret_string)["zone_id"]
}
# Cloudflare DNS Module




data "aws_acm_certificate" "cert" {
  domain   = "echo.zeynabyusuf.com"
  statuses = ["ISSUED"]
}
