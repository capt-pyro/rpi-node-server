import redis
import requests
import time
from Crypto.Cipher import AES

r = redis.StrictRedis(host = 'localhost', port = 6379, db = 0)

temp = "temp"
humid = "humid"
pollTime = 9



try:
    while 1:
        tempArray = map(float,r.lrange(temp,0,pollTime))
        humArray = map(float,r.lrange(humid,0,pollTime))
        r.ltrim(temp,pollTime,-1)
        r.ltrim(humid,pollTime,-1)
        #print(tempArray)
        tempAverage = sum(tempArray)/float(pollTime +1)
        humAverage = sum(humArray)/float(pollTime +1)
        #print(tempAverage)
        w = requests.post(
            'http://192.168.1.109:3000/temp',
            json = {
                temp: tempAverage,
                "timestamp": time.time(),humid:humAverage
                },
            auth=('edgesensor', 'Crafty20**')
            )
        time.sleep(pollTime + 1)
        
except KeyboardInterrupt:
    print('\nWill stop sending data')
    print('BYE :>>>')        

