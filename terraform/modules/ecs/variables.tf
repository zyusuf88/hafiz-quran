variable "vpc_id" {
  description = "vpc where ecs service runs"
  type        = string
}

variable "subnet_ids" {
  description = "subnet ids for ecs service"
  type        = list(string)
}

variable "alb_sg_id" {
  description = "security group for alb"
  type        = string
}

variable "app_image" {
  description = "container image for ecs"
  type        = string
}

variable "certificate_arn" {
  description = "acm certificate for https"
  type        = string
}

variable "zone_id" {
  description = "route 53 hosted zone id"
  type        = string
}

variable "domain_name" {
  description = "app's domain name"
  type        = string
}

variable "ecs_execution_role_arn" {
  description = "iam role for ecs api access"
  type        = string
}


