from time import time
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
from devices.device_selection import get_most_performant_device

MODEL_NAME = 'facebook/nllb-200-distilled-1.3B'
SOURCE_LANGUAGE = "fra_Latn"
TARGET_LANGUAGE = "eng_Latn"
MAX_INPUT_LENGTH = 2000

class TranslationResponse:
  translation: str
  execution_time: int

def get_translation_tokenizer():
  return AutoTokenizer.from_pretrained(MODEL_NAME)

def get_translation_model():
  return AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

def get_translation_pipeline_options():
  return {
    'model': get_translation_model(),
    'tokenizer': get_translation_tokenizer(),
    'device': get_most_performant_device(),
    'src_lang': SOURCE_LANGUAGE,
    'tgt_lang': TARGET_LANGUAGE,
  }

def get_translation_pipeline():
  tokenizer = get_translation_tokenizer()
  model = get_translation_model()

  return pipeline('translation', **get_translation_pipeline_options())

translation = get_translation_pipeline()

async def translate(text: str) -> TranslationResponse:  
  start_time = time()
  output = translation(text, max_length=MAX_INPUT_LENGTH)
  end_time = time()

  execution_time = end_time - start_time

  return {
    'translation': output[0]['translation_text'],
    'execution_time': execution_time
  }
