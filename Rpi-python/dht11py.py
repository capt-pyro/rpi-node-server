#!/usr/bin/python
import sys
import Adafruit_DHT
import redis

r = redis.StrictRedis(host = 'localhost', port = 6379, db = 0)

try:
    
    while True:

        humidity, temperature = Adafruit_DHT.read_retry(11, 4)
        #print 'Temp: {0:0.1f} C  Humidity: {1:0.1f} %'.format(temperature, humidity)
        if temperature is not None and humidity is not None:
            r.rpush('temp',temperature)
            r.rpush('humid',humidity)

except KeyboardInterrupt:
    r.delete('temp')
    r.delete('humid')
    print("Closing Sensor Down")
    print("Bye!!!:\)")
