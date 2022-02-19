FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/of-watchdog:0.9.2 as watchdog
FROM --platform=${TARGETPLATFORM:-linux/amd64} python:3.7-slim-buster

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

# Uncomment if you want to use native modules
#RUN apt-get -qy update && apt-get -qy install gcc make

# Add non root user
RUN addgroup --system app && adduser app --system --ingroup app
RUN chown app /home/app

USER app
ENV PATH=$PATH:/home/app/.local/bin

WORKDIR /home/app/

COPY main.py             .
COPY requirements.txt   .

USER root

RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

WORKDIR /home/app/

RUN chown -R app:app *
USER app

ENV fprocess="python main.py"

ENV upstream_url="http://127.0.0.1:8009"
ENV mode="http"
ENV cgi_headers="true"

CMD ["fwatchdog"]