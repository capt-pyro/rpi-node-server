import redis
import time
from random import *


r = redis.StrictRedis(host='localhost', port=6379, db=0)

try:
    while True:
        randTemp = randint(20,50)
        r.rpush('temp',randTemp)
        time.sleep(0.001)
except KeyboardInterrupt:         
    print('\nShutting down temperature simulator')
    r.delete("temp")
    print('Cleared memory from redis')
    print('All done :)')

