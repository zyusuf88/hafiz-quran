
output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  value       = aws_lb.team_echo_app_lb.dns_name
}
