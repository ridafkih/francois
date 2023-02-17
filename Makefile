install:
	cd language-tools && pip3 install -r requirements.txt

run:
	cd language-tools && python3 -m uvicorn main:app --host 0.0.0.0 --port 8000

clean:
	find . -name "*.pyc" -delete
	rm -rf __pycache__ .pytest_cache