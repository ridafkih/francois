from pydantic import BaseModel

class TranslationRequest(BaseModel):
  # The structure for API requests that relate to translation.
  prospect: str

class ClassificationRequest(BaseModel):
  # The structure for API requests that relate to language classification.
  prospect: str
