import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
  API_KEY_DOGS_API=os.environ.get("API_KEY_DOGS_API")
  # AWS_ACCESS_KEY_ID=os.environ.get("AWS_ACCESS_KEY_ID")
  # AWS_SECRET_ACCESS_KEY=os.environ.get("AWS_SECRET_ACCESS_KEY")
  # S3_BUCKET=os.environ.get("S3_BUCKET")