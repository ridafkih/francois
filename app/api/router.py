from fastapi import FastAPI
from fastapi.responses import JSONResponse

# This is an API handler which will expose the routes for the service.
app = FastAPI()

@app.exception_handler(Exception)
async def handle_exception(request, exception):
  status_code = getattr(exception, "status_code", 500)
  detail = getattr(exception, "detail", "Internal Error")
  return JSONResponse(status_code=status_code, content={"error": detail})