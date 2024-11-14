# Ruedas
RUEDA_IZQ_F = DigitalPin.P3
RUEDA_IZQ_B = DigitalPin.P4
RUEDA_DER_F = DigitalPin.P6
RUEDA_DER_B = DigitalPin.P7

# Sensores
SENSOR_IZQ = DigitalPin.P0
SENSOR_CEN = DigitalPin.P1
SENSOR_DER = DigitalPin.P2
SENSOR_ANALOGO_VAL = 400 # Se leen de forma análoga, este número define la diferencia entre 0 y 1
pins.set_pull(SENSOR_IZQ, PinPullMode.PULL_UP)
pins.set_pull(SENSOR_CEN, PinPullMode.PULL_UP)
pins.set_pull(SENSOR_DER, PinPullMode.PULL_UP)

# Otras constantes
GIRO_MCR = 0 # Por cuantos microsegundos debe girar el robot para darse vuelta 90°

# Globales
x = 0
y = 0
d = 0
nodos = []
infoSensores = []
enejec = False

# Pantalla de inicio
input.on_button_pressed(Button.A, iniciar)
basic.show_string("AMAZEDBOT")


### FUNCIONES DE LÓGICA PRINCIPALES ###

# Funcion llamada al apretar "A"
def iniciar():
    global enejec

    if enejec:
        return # Solo ejecuta esta función si el programa no esta en ejecución
    enejec = True
    basic.clear_screen()
    led.enable(False)
    music.set_built_in_speaker_enabled(True)
    basic.pause(1000)
    calibrar()
    pass

# Calibración
def calibrar():
    global infoSensores
    global GIRO_MCR

    # Calibrar giro
    dir_i = input.compass_heading()
    girar("d",200000)
    dir_f = input.compass_heading()
    if dir_f < dir_i:
        dir_f += 360
    dir_total = dir_f - dir_i
    if dir_total == 0:
        music.play(music.tone_playable(Note.A, music.beat(BeatFraction.WHOLE)), music.PlaybackMode.UNTIL_DONE)
        control.reset() # La microbit no giró, entonces marca error
    GIRO_MCR = int((90/dir_total)*200000)
    girar("i",200000)
    basic.pause(100)

    # Asegurarse que esté en el laberinto
    if verCaminos()[1] == 1:
        music.play(music.tone_playable(Note.B, music.beat(BeatFraction.WHOLE)), music.PlaybackMode.UNTIL_DONE)
        control.reset() # El robot está parado en el camino, entonces marca error

    bucle()

# Bucle Principal
def bucle():
    global x
    global y
    global d
    global nodos
    global infoSensores
    global GIRO_MCR
    escapado = False
    
    while(not escapado):
        pass
    
    return


### FUNCIONES DE SENSORES ###
def verCaminos():
    global SENSOR_ANALOGO_VAL
    global SENSOR_IZQ
    global SENSOR_CEN
    global SENSOR_DER

    v1 = 0
    v2 = 0
    v3 = 0
    if pins.analog_read_pin(SENSOR_IZQ) > SENSOR_ANALOGO_VAL:
        v1=1
    if pins.analog_read_pin(SENSOR_CEN) > SENSOR_ANALOGO_VAL:
        v2=1
    if pins.analog_read_pin(SENSOR_DER) > SENSOR_ANALOGO_VAL:
        v3=1

    return [
        v1,
        v2,
        v3
    ]


### FUNCIONES DE MOTORES ###
def girar(direccion,tiempo):
    global RUEDA_IZQ_F
    global RUEDA_IZQ_B
    global RUEDA_DER_F
    global RUEDA_DER_B

    if direccion == "d":
        pins.digital_write_pin(RUEDA_IZQ_F, 1)
        pins.digital_write_pin(RUEDA_DER_B, 1)
        control.wait_micros(tiempo)
        pins.digital_write_pin(RUEDA_IZQ_F, 0)
        pins.digital_write_pin(RUEDA_DER_B, 0)
    elif direccion == "i":
        pins.digital_write_pin(RUEDA_IZQ_B, 1)
        pins.digital_write_pin(RUEDA_DER_F, 1)
        control.wait_micros(tiempo)
        pins.digital_write_pin(RUEDA_IZQ_B, 0)
        pins.digital_write_pin(RUEDA_DER_F, 0)

    basic.pause(20)
    return

def mover(direccion = True):
    global RUEDA_IZQ_F
    global RUEDA_IZQ_B
    global RUEDA_DER_F
    global RUEDA_DER_B

    if direccion:
        pins.digital_write_pin(RUEDA_IZQ_F, 1)
        pins.digital_write_pin(RUEDA_DER_F, 1)
    else:
        pins.digital_write_pin(RUEDA_IZQ_B, 1)
        pins.digital_write_pin(RUEDA_DER_B, 1)

    return

def parar():
    global RUEDA_IZQ_F
    global RUEDA_IZQ_B
    global RUEDA_DER_F
    global RUEDA_DER_B

    pins.digital_write_pin(RUEDA_IZQ_F, 0)
    pins.digital_write_pin(RUEDA_IZQ_B, 0)
    pins.digital_write_pin(RUEDA_DER_F, 0)
    pins.digital_write_pin(RUEDA_DER_B, 0)

    return