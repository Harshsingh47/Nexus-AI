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

resource "aws_s3_bucket" "nexusmind_storage" {
  bucket = "nexusmind-enterprise-storage-2026"
  tags = {
    Environment = var.environment
  }
}

resource "aws_db_instance" "postgres" {
  allocated_storage    = 100
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.m6g.xlarge"
  db_name              = "nexusmind_db"
  username             = "nexusmind"
  password             = "super_secure_vault_password_2026"
  skip_final_snapshot  = true
}

output "db_endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "s3_bucket_name" {
  value = aws_s3_bucket.nexusmind_storage.id
}
