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


Requirements
------------
hxcpp
hxSerial
hxlode



Usage
-----
L8Ctl \<command\> \[\<parameter(s)\>\]

Commands (case insensitive):
* AppStop - stop current app
* BatChg - battery charge status
* ColorChange 1|2|3|4 speed - Start color changer app
* Dice RGB|RRGGBB - Start dice app with optional color, default: F00
* EnableAllNotifcations true|false - enable/disable all notifications, default: true
* GetMatrix - get current Matrix LED (experimental)
* Init - get trace info
* Interface devicename - sets COM-port to use, default: /dev/ttyACM0
* Poweroff - poweroff
* Reset - reset
* MatrixLEDFile Filename.png offsetX offsetY - set matrix to 8x8 pixel area of Filename.png at offsetX/offsetY, default offset: 0/0 - only PNG supported!
* MatrixLEDUni RGB|RRGGBB - set matrix to one color, default: 000 = off
* SuperLED RGB|RRGGBB - set superled to color, default: 000 = off
* Text RGB|RRGGBB text speed true|false - scrolling text with speed (not working) and true|false for loop, Default: color=F00, loop=true
* UID - query device UID - decoder misssing
* Versions - query device versions - decoder misssing

RGB|RRGGBB - values in hex, either 3 or 6 digits, LEDs only support 4-bits per channel

default interface: /dev/ttyACM0
