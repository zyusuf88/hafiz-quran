data "aws_acm_certificate" "cert" {
  domain   = "echo.zeynabyusuf.com"
  statuses = ["ISSUED"]
}

# ECS Cluster
resource "aws_ecs_cluster" "echo_app_cluster" {
  name = "echo-app-cluster"
}

# ECS Task Definition
resource "aws_ecs_task_definition" "echo_app_task_def" {
  family                   = "echo-app-td"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = var.ecs_execution_role_arn
  cpu                      = "1024"
  memory                   = "3072"

  container_definitions = jsonencode([{
    name  = "app-container"
    image = var.app_image
    cpu   = 0
    memory = 300
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
      protocol      = "tcp"
    }]
  }])
}

# ALB
resource "aws_lb" "team_echo_app_lb" {
  name               = "echo-app-lb"
  load_balancer_type = "application"
  security_groups    = [var.alb_sg_id]
  subnets            = var.subnet_ids

  tags = {
    Name = "echo-app-lb"
  }
}


# ECS Service
resource "aws_ecs_service" "echo_app_service" {
  name            = "echo-app-service"
  cluster         = aws_ecs_cluster.echo_app_cluster.id
  task_definition = aws_ecs_task_definition.echo_app_task_def.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    assign_public_ip = true
    subnets         = var.subnet_ids
    security_groups = [var.alb_sg_id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app_tg.arn
    container_name   = "app-container"
    container_port   = 3000
  }
    deployment_controller {
    type = "ECS"
  }
  depends_on = [aws_lb_listener.https_listener, aws_lb_listener.http_listener, aws_lb.team_echo_app_lb]
}



# Target Group
resource "aws_lb_target_group" "app_tg" {
  name     = "app-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = var.vpc_id
  target_type = "ip"

  health_check {
    path     = "/"
    protocol = "HTTP"
  }
  depends_on = [aws_lb.team_echo_app_lb]
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.team_echo_app_lb.arn
  port              = 80
  protocol          = "HTTP"
 

  default_action {
    type = "redirect"
    redirect {
      protocol    = "HTTPS"
      port        = "443"
      status_code = "HTTP_301"
    }
  }
}

# ALB for HTTPS
resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.team_echo_app_lb.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = data.aws_acm_certificate.cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}
