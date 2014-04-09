# hxL8

hxL8 is a command line application to talk to the L8 smartlight via USB

Features
--------
* set led matrix - one color or from PNG
* read led matrix (experimental)
* set superled
* text scroll
* version and UID
* color changer app
* dice app
* poweroff
* displaying notifications


Requirements
------------
* hxcpp
* hxSerial
* hxlode

* hxjava
* JDK 

* XCode on MacOSX
* Visual Studio on Windows
* gcc/g++ on Linux


Compile
-------
Just call `haxe build.hxml`
it should generate out, out32 and outJava folders containing a 64bit, a 32bit and a Java version.
The Java version is platform independent, the 64/32bit binaries are platform specific. 
If your compiler / system does not support 64bit (or 32bit) compiles, just comment out the section in build.hxml
Same goes for Java target.


Usage
-----
`L8Ctl \<command\> \[\<parameter(s)\>\]`

Commands (case insensitive):
* `AppStop` - stop current app
* `BatChg` - battery charge status
* `Brightness true|false` - set low brightness of LEDs (matrix and super) true = high, false = low, default: false
* `ColorChange 1|2|3|4 speed` - Start color changer app
* `Dice RGB|RRGGBB` - Start dice app with optional color, default: F00
* `EnableAllNotifcations true|false` - enable/disable all notifications, default: true
* `GetMatrix` - get current Matrix LED
* `GetNotifyApp app#` - get Name, Matrix colors, Super LED color and Enabled flag of app number (0-255)
* `GetNumNotifyApps` - get the number of notification apps
* `Init` - get trace info
* `Interface devicename` - sets COM-port to use, default: /dev/ttyACM0
* `MatrixLEDFile Filename.png offsetX offsetY` - set matrix to 8x8 pixel area of Filename.png at offsetX/offsetY, default offset: 0/0 - only PNG supported!
* `MatrixLEDUni RGB|RRGGBB` - set matrix to one color, default: 000 = off
* `Notify "Phone Call"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom on|mod|off category#` - display notification, parameters see below
* `Poweroff` - poweroff
* `Reset` - reset
* `SuperLED RGB|RRGGBB` - set superled to color, default: 000 = off
* `StatusLED true|false` - turn status LEDs on or off, default: false = off
* `Text RGB|RRGGBB text 0|1|2 true|false` - scrolling text with speed 0 = fast, 1 = medium, 2 = slow and true|false for loop, Default: loop = true
* `UID` - query device UID - decoder misssing
* `Versions` - query device versions - decoder misssing

`RGB|RRGGBB` - values in hex, either 3 or 6 digits, LEDs only support 4-bits per channel

Notifications
`"Phone Call"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom` - name of notifcation to display, Custom =  use your own notification
`on|mod|off` - allows to activate / show, modify and deactivate / remove a notification (only Incoming Call can be turned off)
`category#` - notification category number (0 = Other|1 = Incoming Call|2 = MIssed Call|3 = Voice Mail|4 = Social|5 = Schedule|6 = E-Mail|7 = News|8 = Health/Fitness|9 = Business/Finance|10 = Location|11 = Entertainment|255 = Unknown)


default interface: /dev/ttyACM0

(for Mac it is something like `/dev/tty.usbmodem641` for USB and `/dev/tty.L8-SerialPortServerPort1` for Bluetooth)
(for Windows it is something like `COM3` or `COM4` )

Samples
-------
(on Windows using COM3)

`L8Ctl interface COM3 super f00`
sets super led to red

`L8Ctl interface COM3 super fff matrixuni f00`
sets super led to white and matrix to all red

`L8Ctl interface COM3 matrixfile icon.png 50 50`
sets matrix to contents of icon.png at offset 50×50

`L8Ctl interface COM3 text 00f “this is a test” 20 true`
starts text scroller in blue with speed 20 and loop = true (notice: L8 does not use speed parameter)

`L8Ctl interface COM3 dice fff`
starts dice app in white

`L8Ctl interface COM3 appstop`
stops current app


Caution
-------
Use at your own risk!

The MacOSX binaries are unstable, they only work approx 10% of the time.

Windows32 binary was tested on Windows XP.
Java binary was tested on Linux.

