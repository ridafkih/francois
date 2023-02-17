from time import time
from transformers import pipeline

MODEL_NAME = 'papluca/xlm-roberta-base-language-detection'
MAX_INPUT_LENGTH = 2048

class ClassificationResponse:
  language: str
  execution_time: int

classification = pipeline("text-classification", model=MODEL_NAME)

async def classify(text: str) -> ClassificationResponse:  
  start_time = time()
  output = classification(text, truncation=True, max_length=MAX_INPUT_LENGTH)
  end_time = time()

  execution_time = end_time - start_time

  return {
    'language': output,
    'execution_time': execution_time
  }
