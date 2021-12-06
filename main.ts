datalogger.onLogFull(function () {
    logging = false
    basic.showIcon(IconNames.Sad)
    bitbot.setLedColor(0xFF8000)
})
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
    if (logging) {
        basic.showString("Logging")
    } else {
        basic.clearScreen()
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "Go") {
        bitbot.setLedColor(0x40C0FF)
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . . # . .
            . . # . .
            `)
        bitbot.goms(BBDirection.Forward, 30, value)
    } else if (name == "Rotate") {
        bitbot.setLedColor(0x40C0FF)
        basic.showLeds(`
            . . # . .
            # # # # .
            # . # . .
            # . . . .
            # # # # #
            `)
        bitbot.rotatems(BBRobotDirection.Right, 30, value)
    } else {
        basic.showIcon(IconNames.No)
        bitbot.setLedColor(0xFF0000)
        basic.pause(500)
    }
    basic.showLeds(`
        # # . . .
        # . # . .
        # . # . .
        # . # . .
        # # . . .
        `)
    bitbot.setLedColor(0x659900)
})
let logging = false
bitbot.select_model(BBModel.Classic)
radio.setGroup(99)
basic.showLeds(`
    # # # . .
    # . # . .
    # # . . .
    # # . . .
    # . # . .
    `)
bitbot.setLedColor(0xFFFF00)
bitbot.ledBrightness(40)
datalogger.deleteLog()
logging = false
datalogger.setColumns(["Compass"])
loops.everyInterval(100, function () {
    if (logging) {
        datalogger.logData([datalogger.createCV("Compass", input.compassHeading())])
    }
})
