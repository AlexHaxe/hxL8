# hxL8

hxL8 is a Haxe based communication library for L8 smartlight

There are currently two tools based on that library:
* L8Ctl is a command line application for Windows, Mac OSX and Linux and enables you to send commands to your L8 - also comes as Java version
* L8NodeSrv is a node.js server version of L8Ctl, with most of the commands the cli version offers, it enables you to talk to your L8 over a network using simple HTTP GET requests

The `bin` folder contains binaries for all supported systems in zip/tgz format and unpacked.

You can also compile it from Haxe sources (by calling `haxe build.hxml` see requirements)

Features
--------
* setting led matrix
* framegrab
* superled
* text scroller
* version and UID
* running firmware apps (color changer, dice, etc.)
* notifications
* L8y support
* frame support
* animation support
* read sensor data
* boxes
* ad-hoc animations
* server based using node.js

Requirements
------------
* git
* XCode on MacOSX
* Visual Studio on Windows
* gcc/g++ on Linux

* JDK
* haxe

install Haxe libraries
* `haxelib install hxcpp`
* `haxelib git hxSerial https://github.com/AlexHaxe/hxSerial.git`
* `haxelib install hxlode`
* `haxelib install nodejs`
* `haxelib install hxjava`

Compile L8Ctl on Windows
------------------------
`haxe buildWin.hxml`

output folder out32

Compile L8Ctl on Mac
--------------------
`haxe buildMac.hxml`

output folders
* out32
* out
* outJava
* outNodeJS

Compile L8Ctl on Linux
----------------------
`haxe buildMac.hxml`

output folders
* out32
* out
* outJava
* outNodeJS

Running L8NodeSrv
-----------------
- you need a working node.js installation
- download bin/L8/NodeJS/L8NodeSrv.js to a new folder
- run `npm install serialport` in that folder
- launch with `node L8NodeSrv.js`
- point your browser to http://localhost:1818/

You can add two parameters to the start command, a port and the default serial device:
`node L8NodeSrv.js 8888 /dev/rfcomm0`

L8NodeSrv.js has a simple Homepage that contains a few examples with direct links. You can call any command by just putting it in the address bar of your browser.
L8NodeSrv.js accepts GET requests and works similar to the command line version, only you have to use a `/` instead of a space to set your parameters.

You can also send the interface with every GET request, so if you have multiple L8s you can specify which one to use.

You cann have multiple commands in one GET request, as long as you put in the required parameters (same as cli version).

Not everything is working perfectly, if you specify the wrong serial device node.js might crash.

Usage
-----
`L8Ctl <command> [<parameter(s)>]`

Commands (case insensitive):

### L8 applications
* `appstop`
 -> stop current app
* `appambient RGB RGB threshold`
 -> start ambient light app with matrix color, superled color and threshold
* `appcolorchange Multicolor|Tropical|Galaxy|Aurora speed true|false`
 -> Start color changer app with speed in SuperLED invert(= true), default: false
* `appdice RGB|RRGGBB`
 -> Start dice app with optional color, default: F00
* `appproximity RGB RGB threshold`
 -> start proximity app with matrix color, superled color and threshold
* `party`
 -> run party app

### L8 sensors
* `AutoRotate true|false`
 -> enable / disable autorotate
* `BatChg`
 -> battery charge status
* `Button`
 -> read button status
* `GetAcc`
 -> get values of accelerometer
* `GetAmb`
 -> get values of ambient sensor
* `GetMCUTemp`
 -> get current MCU temperature
* `GetMic`
 -> get current noise sensor value
* `GetProx`
 -> get value of proximity sensor
* `GetTemp`
 -> get value of temperature sensor
* `GetThreshold`
 -> get current ambient, noise and proximity thresholds
* `GetVoltage`
 -> get the voltage of L8 battery
* `GetVBUS`
 -> get the voltage of USB connection
* `SetOrientation top|bottom|left|right`
 -> sets orientation
* `SetAmbThreshold min max`
 -> sets min max values of ambient threshold
* `SetNoiseThreshold min max`
 -> sets min max values of noise threshold
* `SetProxThreshold min max`
 -> sets min max values of proximity threshold

### L8 response output options
* `CSV`
 -> print responses in CSV format
* `CSVHeader`
 -> print responses in CSV format with header
* `Hex`
 -> print responses in raw hex format

### L8y
* `DeleteL8y l8y#`
 -> Delete L8y by number (between 0 and GetNumL8ies)
* `GetNumL8ies`
 -> get the number of L8ies in User space
* `L8y l8y#`
 -> show L8y (between 0 and GetNumL8ies)
* `ReadL8y l8y#`
 -> get matrix colors for L8y (l8y# between 0 and GetNumL8ies)
* `StoreL8y 64*(RGB|RRGGBB)`
 -> stores a L8y (returns new index of L8y)
* `StoreL8yFile Filename.png offsetX offsetY`
 -> stores a L8y from PNG file at offsetX/offsetY (returns new index of L8y)
 -> not in Java or NodeJS version

### L8 notifications
* `EnableAllNotifications true|false`
 -> enable/disable all notifications, default: true
* `EnableNotification notification# true|false`
 -> enable/disable notification, default: true
* `GetNotifyApp app#`
 -> get Name, Matrix colors, Super LED color and Enabled flag of app number (0-255)
* `GetNumNotifyApps`
 -> get the number of notification apps
* `Notify "Phone Call"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom on|mod|off category#`
 -> display notification, parameters see below
* `StoreNotification appbundle 64*(RGB|RRGGBB) RGB true|false`
 -> creates a new notification for app-bundlename with color-matrix and SuperLED color and initial enabled status

### L8 frames
* `DeleteFrame frame#`
 -> Delete Frame by number (between 0 and GetNumFrames)
* `GetNumFrames`
 -> get the number of Frames in User space
* `ReadFrame frame#`
 -> gets frame from User Space (frame# between 0 and GetNumFrames)
* `StoreFrame 64*(RGB|RRGGBB)`
 -> stores a new frame in userspace (returns new index of frame)
* `StoreFrameFile Filename.png offsetX offsetY`
 -> stores a new frame in userspace from PNG file at offsetX/offsetY (returns new index of frame)
 -> not in Java or NodeJS version

### L8 animations
* `DeleteAnim anim#`
 -> Delete Animation by number (between 0 and GetNumAnims)
* `GetNumAnims`
 -> get the number of anims in User space
* `PlayAnim anim# true|false`
 -> plays animation # as loop = true or once = false; default: loop=true
* `ReadAnim anim#`
 -> gets frame and duration for animation from User Space (anim# between 0 and GetNumAnims)
* `StopAnim`
 -> stops current animation
* `StoreAnim frame#,duration,frame#,duration,...`
 -> stores a new animation in userspace (returns new index of anim)

### L8 matrix
* `Brightness true|false`
 -> set low brightness of LEDs (matrix and super) true = high, false = low, default: false
* `Box left top right bottom RGB RGB RGB`
 -> shows a box from left/top to right/bottom with border, fill and outside color
* `GetMatrix`
 -> get current Matrix LED
* `MatrixLEDFile Filename.png offsetX offsetY`
 -> set matrix to 8x8 pixel area of Filename.png at offsetX/offsetY, default offset: 0/0 - only PNG supported!
 -> not in Java or NodeJS version
* `MatrixLEDUni RGB|RRGGBB`
 -> set matrix to one color, default: 000 = off
* `MatrixLEDString 64*(RGB|RRGGBB)`
 -> set matrix to colorlist
* `MatrixOff`
 -> clear matrix
* `Led x y RGB|RRGGBB`
 -> set a single LED pixel

### L8 super LED
* `SuperLED RGB|RRGGBB`
 -> set superled to color, default: 000 = off

### L8 text
* `DisplayChar char top|bottom|left|right offset`
 -> displays char with offset in pixels from top|bottom|left|right
* `Text RGB|RRGGBB text 0|1|2 true|false`
 -> scrolling text (max length: 18, color and text are required parameter) with speed 0 = fast, 1 = medium, 2 = slow and true|false for loop, Default: loop = true

### L8 ad-hoc animations
* `Repeat #|forever delay`
 -> repeats all commands number of times specified or forever with optional delay (specified in 100th of a second) between commands
* `RepeatSilent #|forever delay`
 -> repeats all commands number of times specified or forever with optional delay (specified in 100th of a second) between commands without printing responses from L8

### L8 serial port
* `Interface devicename`
 -> sets COM-port to use, default: /dev/ttyACM0

### L8 misc
* `Bootloader`
 -> switch to DFU mode
* `DeleteUserSpace`
 -> Delete userspace
* `Init`
 -> get trace info
* `Poweroff`
 -> poweroff
* `Reset`
 -> reset
* `StatusLED true|false`
 -> turn status LEDs on or off, default: false = off
* `UID`
 -> query device UID
* `Version`
 -> query device versions

`RGB|RRGGBB` - values in hex, either 3 or 6 digits, LEDs only support 4-bits per channel
`64*(RGB|RRGGBB)` - values in hex should be: RGBRGBRGB... (= 192 chars) or RRGGBBRRGGBBRRGGBB... (= 384 chars)

Notifications
* `"Phone Call"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom` - name of notifcation to display, Custom =  use your own notification
* `on|mod|off` - allows to activate / show, modify and deactivate / remove a notification (only Incoming Call can be turned off)
* `category#` - notification category number (0 = Other|1 = Incoming Call|2 = MIssed Call|3 = Voice Mail|4 = Social|5 = Schedule|6 = E-Mail|7 = News|8 = Health/Fitness|9 = Business/Finance|10 = Location|11 = Entertainment|255 = Unknown)


default interface: /dev/ttyACM0

(for Linux Bluetooth `/dev/rfcomm0`)
(for Mac it is something like `/dev/tty.usbmodem641` for USB and `/dev/tty.L8-SerialPortServerPort1` for Bluetooth)
(for Windows use `COM3`, `COM4` etc. )

Samples
-------
(on Windows using COM3)

`L8Ctl.exe interface COM3 super f00`
sets super led to red

`L8Ctl.exe interface COM3 super fff matrixuni f00`
sets super led to white and matrix to all red

`L8Ctl.exe interface COM3 matrixfile icon.png 50 50`
sets matrix to contents of icon.png at offset 50×50

`L8Ctl.exe interface COM3 text 00f “this is a test” 1 true`
starts text scroller in blue with medium speed (= 1) and loop = true

`L8Ctl.exe interface COM3 dice fff`
starts dice app in white

`L8Ctl.exe interface COM3 appstop`
stops current app


`L8Ctl.exe interface COM3 storeframe f00f70ff00f000f40880f storeframe f70ff00f000f40880ff00 storeframe ff00f000f40880ff00f70 storeframe 0f000f40880ff00f70ff0 storeframe 00f40880ff00f70ff00f0 storeframe 40880ff00f70ff00f000f storeframe 80ff00f70ff00f000f408`
`L8Ctl.exe interface COM3 storeanim 15,1,16,1,17,1,18,1,19,1,20,1,21,1`
`L8Ctl.exe interface COM3 playanim 11`
rainbow animation (please adjust numbers for storeanim and playanim to match your L8 - storeframe and storeanim will return the actual numbers)


Caution
-------
Use at your own risk!

Windows32 binary was tested on Windows XP.
Java binary was tested on Linux.

L8Ctl works with USB and Bluetooth (for Bluetooth to work you need to pair L8 with your computer first).
