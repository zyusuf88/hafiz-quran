variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_1_cidr" {
  description = "CIDR block for the first subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "subnet_2_cidr" {
  description = "CIDR block for the second subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "zone_name" {
  description = "Route 53 hosted zone name"
  type        = string
  default     = "zeynabyusuf.com"
}


variable "region" {
  description = "AWS region for deployment"
  type        = string
  default     = "eu-west-2"
}

variable "record_name" {
  type        = string
  default     = "echo.zeynabyusuf.com"
}

variable "ttl" {
  description = "DNS record time-to-live (TTL)"
  type        = number
  default     = 1
}

variable "proxied" {
  description = "Enable Cloudflare proxy"
  type        = bool
  default     = false
}
