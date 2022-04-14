FROM pytorch/pytorch:1.11.0-cuda11.3-cudnn8-runtime

WORKDIR /usr/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY data .
COPY datasets .

COPY attack .
COPY conf .
COPY __init__.py .
COPY main.py .

ENV run_mode=release

ENV PYTHONUNBUFFERED=1

CMD ["python", "main.py"]
