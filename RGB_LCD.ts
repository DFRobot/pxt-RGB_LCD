/** 
 * @file pxt-RGB_LCD/RGB_LCD.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/goods-1727.html)
 * @n RGB color font LCD screen can display a variety of color fonts.
 * 
 * @copyright    [DFRobot](http://www.dfrobot.com), 2016
 * @copyright    GNU Lesser General Public License
 * 
 * @author [email](jie.tang@dfrobot.com)
 * @version  V0.1
 * @date  2019-10-08
*/
enum clear {
    //%block="first line"
    block1 = 1,
    //%block="second line"
    block2 = 2,
    //%block="Full screen"
    block3 = 3
}
let j: number = 0;
let i: number
//% weight=100 color=#0020ff block="RGB_LCD"
namespace RGB_LCD {
    let i2cAddr = 0x3E;
    let buf: number[] = [];
    export function LcdInit() {
        i2cAddr = 0x3e;
        basic.pause(50);
        cmd(0x28);      // set 4bit mode
        basic.pause(5);
        cmd(0x28);      // set 4bit mode
        basic.pause(1);
        cmd(0x0c);
        //cmd(0x01);// clear wait more then 2ms
        cmd(0x06);
        basic.pause(5);
        Reg(0x00, 0x00);
        Reg(0x08, 0xff);
        Reg(0x01, 0x20);
        //setRGB(252, 255, 255);
    }
    /** 
     * Displays the number in the specified position of the liquid crystal
     * @param  n is a number will be show ,eg: 2019
     * @param  x is a column position ,eg: 0
     * @param  y is a row position ,eg: 0
    */
    //%  block="Displays number %n| position x %x|y %y"
    //% weight=90 
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowNumber(n: number, x: number, y: number): void {
        if (j == 0) {
            j = 1;
            LcdInit();
            setRGB(252, 255, 255);
        }
        let s = n.toString()
        ShowString(s.slice(0, 9), x, y);
    }
    /** 
     * Displays the string in the specified position of the liquid crystal
     * @param   s is a string will be show ,eg: "DFRobot"
     * @param   x is a column position ,eg: 0
     * @param   y is a row position ,eg: 0
    */

    //%  block="Displays string %s| position x %x|y %y"
    //% weight=90 
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowString(s: string, x: number, y: number): void {
        if (j == 0) {
            j = 1;
            LcdInit();
            setRGB(252, 255, 255);
        }
        setCursor(x, y);
        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i));
        }
    }
    /** 
     * Clear screen
    */
    //%block="LCD remove |%c content"
    //%weight=40
    export function clear(c: clear): void {
        serial.writeNumber(c)
        if (c == 1) {
            for (i = 0; i <= 15; i++)
                String(" ", i, 0);
        }
        if (c == 2) {
            for (i = 0; i <= 15; i++)
                String(" ", i, 1);
        }
        if (c == 3) {
            cmd(0x01);
        }
    }
    /**
     * Remove content specified location
     */
    //%weight=30
    //%block="Remove LCD|%y column and|%s row to |%x row"
    //%y.min=0 y.max=1
    //%s.min=0 s.max=15
    //%x.min=0 x.max=15
    export function clear1(y: number, s: number, x: number): void {
        let t: number
        t = x - s
        for (i = 0; i <= t; i++) {
            String(" ", s, y);
            s = s + 1;
        }
    }
    /**
     * Set the color
     */
    //% weight=70
    //% R.min=0 R.max=255
    //% G.min=0 G.max=255
    //% B.min=0 B.max=255
    //%block="R %R| G %G| B %B"
    export function RGB(R: number, G: number, B: number): number {
        return (R << 16) + (G << 8) + (B);
    }
    /**
     * Set screen color
     */
    //%weight=60
    //% rgb.shadow="colorNumberPicker"
    //% block="Set screen color |%rgb"
    export function showColor(rgb: number): void {
        LcdInit();
        j = 1;
        let _brightness = 255;
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        setRGB(r, g, b);
    }
    /** 
     * Set cursor position
    */
    function setCursor(col: number, row: number) {
        col = (row == 0 ? col | 0x80 : col | 0xc0);
        cmd(col);
    }

    /**
     * send command
     */
    function cmd(d: number) {
        buf = [0x80, d];
        let cmd = pins.createBufferFromArray(buf);
        pins.i2cWriteBuffer(i2cAddr, cmd);
        basic.pause(1);
    }
    /** 
     *   send data
    */
    function dat(d: number) {
        buf = [0x40, d];
        let dat = pins.createBufferFromArray(buf);
        pins.i2cWriteBuffer(i2cAddr, dat);
        basic.pause(1);
    }
    /** 
     * send RGB
    */
    function Reg(d: number, n: number) {
        buf = [d, n];
        let lcd = pins.createBufferFromArray(buf);
        let i2cAddr_lcd = 0x60;
        pins.i2cWriteBuffer(i2cAddr_lcd, lcd);
        basic.pause(10);
    }
    function setRGB(r: number, g: number, b: number) {
        Reg(0x04, r);
        Reg(0x03, g);
        Reg(0x02, b);
        //basic.pause(1);
    }
    function String(s: string, x: number, y: number): void {
        setCursor(x, y);
        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i));
        }
    }
}