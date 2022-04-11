FROM pytorch/pytorch:1.11.0-cuda11.3-cudnn8-runtime

WORKDIR /usr/app

RUN apt-get update && apt-get install libpq-dev gcc -y

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV run_mode=release

CMD ["python", "main.py"]
