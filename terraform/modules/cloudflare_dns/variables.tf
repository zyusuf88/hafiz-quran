variable "zone_id" {
  description = "cloudflare zone id"
  type        = string
}

variable "record_name" {
  description = "dns record name (e.g., echo.zeynabyusuf.com)"
  type        = string
}

variable "record_value" {
  description = "dns record value, usually alb dns name"
  type        = string
}

variable "ttl" {
  description = "dns record time to live"
  type        = number
  default     = 1
}

variable "proxied" {
  description = "enable cloudflare proxy?"
  type        = bool
  default     = false
}

variable "alb_dns_name" {
  description = "dns name of application load balancer"
  type        = string
}
