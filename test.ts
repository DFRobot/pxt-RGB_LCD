let x = 0
RGB_LCD.showColor(0x00ff00)
RGB_LCD.ShowString("DFRobot", 0, 0)
basic.forever(function () {
    RGB_LCD.ShowNumber(x, 0, 2)
    basic.pause(1000)
    x += 1
    RGB_LCD.clear(clear.block2)
})
