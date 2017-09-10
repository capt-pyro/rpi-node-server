# Raspberry Pi-node-weather-project

A project intended to test my skills in Nodejs, SocketIO, Express, Redis, Python and GPIO on the Raspberry Pi. This project covers everything, from gathering data from a sensor, to data processing, sending it to a server and finally displaying it on a site as a graph. 

# The start (data gathering and processing in the RPi)

A DHT11 sensor capable of reading the current temperature and humidity every second is hooked on to the GPIO ports of my RPi. A python code is used to feed the data to redis database. Another python program reads from redis and averages it to represent data for the past 10 seconds. It then sends this data to a nodejs server via http and waits 10 seconds and repeats the process.

# The middle (server side)

The nodejs server, hosted on another device and connected to mongoDB, provides the api to receive sensor data. It stores that on the database and also hosts a website that people can view to see the data. It uses socketio to send the latest data to that site as http protocol doesn't allow the server to send data without request.

# The end (the site)

The site uses Google visualization tools to create two graphs. One showing the variation in temperature and the other showing variation in humidity over time. It doesn't use polling http requests to get data but rather a socket connection that allows connection both ways. It has buttons that would allow the graphs to display different time periods, but isn't currently implemented.

# Additional Information

* Ensure that the folder named RPi-python is placed and used in a RPi 3 and the data wire of the sensor is connected to pin 4.  
* Ensure that you install Adafruit Dht python handler on the RPi. Download from here https://github.com/adafruit/Adafruit_Python_DHT
