provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "production"
}

resource "aws_vpc" "nexusmind_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "nexusmind-vpc-${var.environment}"
  }
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.nexusmind_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true
  tags = { Name = "nexusmind-public-a" }
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id                  = aws_vpc.nexusmind_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true
  tags = { Name = "nexusmind-public-b" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.nexusmind_vpc.id
  tags   = { Name = "nexusmind-igw" }
}

resource "aws_security_group" "db_sg" {
  name        = "nexusmind-db-sg"
  description = "Allow PostgreSQL access"
  vpc_id      = aws_vpc.nexusmind_vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_subnet_group" "db_subnets" {
  name       = "nexusmind-db-subnet-group"
  subnet_ids = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
}

resource "aws_s3_bucket" "nexusmind_storage" {
  bucket = "nexusmind-enterprise-storage-2026"
  tags = {
    Environment = var.environment
  }
}

resource "aws_db_instance" "postgres" {
  allocated_storage      = 100
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.m6g.xlarge"
  db_name                = "nexusmind_db"
  username               = "nexusmind"
  password               = "super_secure_vault_password_2026"
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  skip_final_snapshot    = true
}

output "db_endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "s3_bucket_name" {
  value = aws_s3_bucket.nexusmind_storage.id
}
