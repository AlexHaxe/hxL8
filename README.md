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
* L8y support
* Frame support
* Animation support

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

Setup on Windows
----------------
To setup a build system you need to install:
- haxe (you will probably need to add haxe and neko folders to your path)
- git
- Visual Studio C++ (Express)

then run:
- `haxelib setup` (default folder is ok)
- `haxelib install hxcpp`
- `haxelib install hxlode`
- `haxelib git hxSerial https://github.com/AlexHaxe/hxSerial.git`

to compile you go into the hxl8 root folder (where build.hxml is located) and compile with
`haxe.exe -cp src -cpp out32 -lib hxSerial -lib hxlode -lib hxcpp -D static -main hxl8.L8Ctl`

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
* `AutoRotate true|false` - enable / disable autorotate
* `BatChg` - battery charge status
* `Brightness true|false` - set low brightness of LEDs (matrix and super) true = high, false = low, default: false
* `ColorChange 1|2|3|4 speed` - Start color changer app
* `DeleteAnim anim#` - Delete Animation by number (between 0 and GetNumAnims)
* `DeleteFrame frame#` - Delete Frame by number (between 0 and GetNumFrames)
* `DeleteL8y l8y#` - Delete L8y by number (between 0 and GetNumL8ies)
* `Dice RGB|RRGGBB` - Start dice app with optional color, default: F00
* `EnableAllNotifcations true|false` - enable/disable all notifications, default: true
* `GetMatrix` - get current Matrix LED
* `GetNotifyApp app#` - get Name, Matrix colors, Super LED color and Enabled flag of app number (0-255)
* `GetNumAnims` - get the number of anims in User space
* `GetNumFrames` - get the number of Frames in User space
* `GetNumL8ies` - get the number of L8ies in User space
* `GetNumNotifyApps` - get the number of notification apps
* `Init` - get trace info
* `Interface devicename` - sets COM-port to use, default: /dev/ttyACM0
* `L8y l8y#` - Show L8y (between 0 and GetNumL8ies)
* `MatrixLEDFile Filename.png offsetX offsetY` - set matrix to 8x8 pixel area of Filename.png at offsetX/offsetY, default offset: 0/0 - only PNG supported!
* `MatrixLEDString 64*(RGB|RRGGBB)` - set matrix to colorlist
* `MatrixLEDUni RGB|RRGGBB` - set matrix to one color, default: 000 = off
* `Notify "Phone Call"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom on|mod|off category#` - display notification, parameters see below
* `Poweroff` - poweroff
* `ReadAnim anim#` - gets frame and duration for animation from User Space (anim# between 0 and GetNumAnims)
* `ReadFrame frame#` - gets frame from User Space (frame# between 0 and GetNumFrames)
* `ReadL8y l8y#` - get matrix colors for L8y (l8y# between 0 and GetNumL8ies)
* `Reset` - reset
* `SuperLED RGB|RRGGBB` - set superled to color, default: 000 = off
* `StatusLED true|false` - turn status LEDs on or off, default: false = off
* `StopAnim` - stops current animation
* `StoreAnim frame#,duration,frame#,duration,...` - stores a new animation in userspace (returns new index of anim)
* `StoreFrame 64*(RGB|RRGGBB)` - stores a new frame in userspace (returns new index of frame)
* `StoreL8y 64*(RGB|RRGGBB)` - stores a L8y (returns new index of L8y)
* `Text RGB|RRGGBB text 0|1|2 true|false` - scrolling text with speed 0 = fast, 1 = medium, 2 = slow and true|false for loop, Default: loop = true
* `UID` - query device UID - decoder misssing
* `Versions` - query device versions - decoder misssing

`RGB|RRGGBB` - values in hex, either 3 or 6 digits, LEDs only support 4-bits per channel
`64*(RGB|RRGGBB)` - values in hex should be: RGBRGBRGB... (= 192 chars) or RRGGBBRRGGBBRRGGBB... (= 384 chars)

Notifications
* `"Phone Call"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom` - name of notifcation to display, Custom =  use your own notification
* `on|mod|off` - allows to activate / show, modify and deactivate / remove a notification (only Incoming Call can be turned off)
* `category#` - notification category number (0 = Other|1 = Incoming Call|2 = MIssed Call|3 = Voice Mail|4 = Social|5 = Schedule|6 = E-Mail|7 = News|8 = Health/Fitness|9 = Business/Finance|10 = Location|11 = Entertainment|255 = Unknown)


default interface: /dev/ttyACM0

(for Mac it is something like `/dev/tty.usbmodem641` for USB and `/dev/tty.L8-SerialPortServerPort1` for Bluetooth)
(for Windows it is something like `COM3` or `COM4` )

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

