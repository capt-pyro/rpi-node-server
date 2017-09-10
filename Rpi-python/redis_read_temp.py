import redis
import requests
import time

r = redis.StrictRedis(host = 'localhost', port = 6379, db = 0)

temp = "temp"
pollTime = 9
try:
    while 1:
        tempArray = r.lrange(temp,0,pollTime)
        r.ltrim(temp,pollTime,-1)
        tempArrayfl = map(float, tempArray)
        print(tempArrayfl)
        tempAverage = sum(tempArrayfl)/float(pollTime +1)
        print(tempAverage)
        w = requests.post('http://192.168.1.109:3000/temp',json = {temp: tempAverage,"timestamp": time.time()})
        time.sleep(10)
        
except KeyboardInterrupt:
    print('\nWill stop sending data')
    print('BYE :>>>')        

