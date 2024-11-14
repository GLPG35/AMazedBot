# Ruedas
RUEDA_DER_F = DigitalPin.P3
RUEDA_DER_B = DigitalPin.P4
RUEDA_IZQ_F = DigitalPin.P6
RUEDA_IZQ_B = DigitalPin.P7

# Sensores
SENSOR_IZQ = DigitalPin.P0
SENSOR_CEN = DigitalPin.P1
SENSOR_DER = DigitalPin.P2
SENSOR_ANALOGO_VAL = 511 # Se leen de forma análoga, este número define la diferencia entre 0 y 1

# Otras constantes
GIRO_MCR = 0 # Por cuantos microsegundos debe girar el robot para darse vuelta 90°

# Globales
modo = "robot"
avanzando = False
enejec = False

# Pantalla de inicio
radio.set_group(49)
led.enable(False)
music.set_built_in_speaker_enabled(True)
radio.set_transmit_power(7)

# Controles
input.on_gesture(Gesture.SHAKE, cambiar_modo)
input.on_button_pressed(Button.A, boton_a)
input.on_button_pressed(Button.B, boton_b)
input.on_button_pressed(Button.AB, boton_ab)


### FUNCIONES DE LÓGICA PRINCIPALES ###

# Funcion llamada al apretar "AB"
def cambiar_modo():
    global modo
    global enejec

    if modo == "robot" and not enejec:
        led.enable(True)
        led.plot(2, 2)
        modo = "host"

# Funcion llamada al apretar "A"
def boton_a():
    global enejec
    global modo

    if modo == "robot":
        if enejec:
            return # Solo ejecuta esta función si el programa no esta en ejecución
        enejec = True

        basic.pause(1500)
        calibrar()
    else:
        radio.send_string("girarIzq")
    pass

# Otros controles
def boton_b():
    global modo
    if modo == "host":
        radio.send_string("girarDer")
    pass
def boton_ab():
    global modo
    global avanzando
    if modo == "host":
        if avanzando:
            avanzando = False
            radio.send_string("parar")
        else:
            avanzando = True
            radio.send_string("avanzar")
    pass

# Calibración
def calibrar():
    global GIRO_MCR

    # Calibrar giro
    dir_i = input.compass_heading()
    basic.pause(25)
    girar("d",200000)
    basic.pause(25)
    dir_f = input.compass_heading()
    if dir_f < dir_i:
        dir_f += 360
    dir_total = dir_f - dir_i
    if dir_total == 0:
        music.play(music.tone_playable(Note.A, music.beat(BeatFraction.WHOLE)), music.PlaybackMode.UNTIL_DONE)
        control.reset() # La microbit no giró, entonces marca error y se reinicia
    GIRO_MCR = int((90/dir_total)*200000)
    girar("i",200000)
    basic.pause(100)
    music.play(music.tone_playable(988, music.beat(BeatFraction.WHOLE)), music.PlaybackMode.UNTIL_DONE)
    
    mover()

# Radio
radio.on_received_string(on_received_string)
def on_received_string(receivedString):
    global enejec
    global GIRO_MCR

    if enejec == False: return

    serial.write_line(receivedString)
    if receivedString == "girarIzq":
        girar("i", GIRO_MCR)
    elif receivedString == "girarDer":
        girar("d", GIRO_MCR)
    elif receivedString == "avanzar":
        mover()
    elif receivedString == "parar":
        parar()
    
    return


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