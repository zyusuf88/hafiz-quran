# VPC
resource "aws_vpc" "echo_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "echo-vpc"
  }
}

# subnets
resource "aws_subnet" "subnet_1" {
  vpc_id            = aws_vpc.echo_vpc.id
  cidr_block        = var.subnet_1_cidr
  availability_zone = "eu-west-2a"

  tags = {
    Name = "subnet_1"
  }
}

resource "aws_subnet" "subnet_2" {
  vpc_id            = aws_vpc.echo_vpc.id
  cidr_block        = var.subnet_2_cidr
  availability_zone = "eu-west-2b"

  tags = {
    Name = "subnet_2"
  }
}

#  IGW
resource "aws_internet_gateway" "echo_igw" {
  vpc_id = aws_vpc.echo_vpc.id

  tags = {
    Name = "echo-igw"
  }
}

# route table
resource "aws_route_table" "app_rt" {
  vpc_id = aws_vpc.echo_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.echo_igw.id
  }

  tags = {
    Name = "app-rt"
  }
}

# link route table to subnet
resource "aws_route_table_association" "subnet_1_association" {
  subnet_id      = aws_subnet.subnet_1.id
  route_table_id = aws_route_table.app_rt.id
}

resource "aws_route_table_association" "subnet_2_association" {
  subnet_id      = aws_subnet.subnet_2.id
  route_table_id = aws_route_table.app_rt.id
}

# Security Group
resource "aws_security_group" "app_sg" {
  vpc_id = aws_vpc.echo_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
   ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "app-sg"
  }
}

output "vpc_id" {
  value = aws_vpc.echo_vpc.id
}

output "subnet_ids" {
  value = [aws_subnet.subnet_1.id, aws_subnet.subnet_2.id]
}

output "alb_sg_id" {
  value = aws_security_group.app_sg.id
}
