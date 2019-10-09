# LCD1602

LCD1602 lib

## TODO

- [ ] Add a reference for your blocks here
- [ ] Add "icon.png" image (300x200) in the root folder
- [ ] Add "- beta" to the GitHub project description if you are still iterating it.
- [ ] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [ ] On GitHub, create a new file named LICENSE. Select the MIT License template.
- [ ] Get your package reviewed and approved https://makecode.microbit.org/extensions/approval

Read more at https://makecode.microbit.org/extensions

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

# i2cLCD1602

makecode I2C LCD1602 package for micro:bit  

Author: tangjie  
Date:   2019.October  
  

## Add extension

open your microbit makecode project, in Extension, paste  

https://github.com/tangjie133/RGB_LCD

to search box then search.

## Basic usage

```
let x = 0
RGB_LCD.showColor(0x00ff00)
RGB_LCD.ShowString("DFRobot", 0, 0)
basic.forever(function () {
    RGB_LCD.ShowNumber(x, 0, 2)
    basic.pause(1000)
    x += 1
    RGB_LCD.clear(clear.block2)
})
```


## API

- ShowNumber(n: number, x: number, y: number)  
show a number in LCD at given position.  
n: number will be show  
x: is LCD column position, [0 - 15]  
y: is LCD row position, [0 - 1]  

- ShowString(s: string, x: number, y: number)  
show a string in LCD at given position.  
s: string will be show  
x: is LCD column position, [0 - 15]  
y: is LCD row position, [0 - 1]  
  
- clear(c: clear)  
clear LCD content  

- clear1(y: number, s: number, x: number)
Remove content specified location

- RGB(R: number, G: number, B: number) 
Set the RGB

- showColor(rgb: number)
Set screen color


## License

MIT

Copyright (c) 2018, microbit/micropython Chinese community  


## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
