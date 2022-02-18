import datetime
import time
from flask import current_app

def start_attack():
    print('start')
    start = datetime.datetime.now()
    current_app.logger.error("start at :::::::::: " + str(start))
    
    time.sleep(10)
    
    end = datetime.datetime.now()
    current_app.logger.error("end at ::::::::::" + str(end))
