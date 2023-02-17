from api.router import app
from api.requests import TranslationRequest, ClassificationRequest
from fastapi import APIRouter, HTTPException

from pipelines.classification import classify
from pipelines.translation import translate

@app.post('/classify')
async def translate_fr_en(request: TranslationRequest):
  result = await classify(request.prospect)

  if not (result):
    raise HTTPException(status_code=500, detail="Translation Failed")

  return result

@app.post('/translate/fr/en')
async def translate_fr_en(request: TranslationRequest):
  result = await translate(request.prospect)

  if not (result):
    raise HTTPException(status_code=500, detail="Translation Failed")

  return result