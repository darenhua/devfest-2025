import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from functools import lru_cache

load_dotenv()

class Settings(BaseSettings):
    # API Keys
    OPENAI_API_KEY: str
    TAVILY_API_KEY: str
    
    # Database
    DATABASE_URL: str
    
    # Security
    SECRET_KEY: str
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    TAVILY_API_KEY = os.getenv('TAVILY_API_KEY') 