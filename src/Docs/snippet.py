from microbit import *
import radio

radio.config(group = 3)
radio.on()

def move(direction):
	if direction == 'forward':
		#Move car forward
		return
	else if direction == 'right':
		#Move car to the right
		return
	else if direction == 'left':
		#Move car to the left
		return

def stop():
	#Stops the car

while True:
	signal = radio.receive()

	if signal == 'start':
		#Starts car algorithm

		move('forward')
	else if signal == 'stop':
		#Stops car algorithm

		stop()