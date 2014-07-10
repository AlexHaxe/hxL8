package hxl8;

import EReg;
import sys.FileSystem;

#if cpp
import cpp.vm.Thread;

// force static compile
import hxcpp.StaticStd;
#elseif java
import java.vm.Thread;
#else
fail - unsupported
#end

#if cpp
import hxSerial.Serial;
#elseif java
import hxl8.java.Serial;
#else
fail - unsupported
#end

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.commands.*;
import hxl8.exceptions.*;
import hxl8.responses.*;

class L8Ctl extends L8CommBase
{
    public function new ()
    {
        super ();
    }

    public function run () : Void
    {
        var args : Array<String> = Sys.args();
        if (args.length <= 0)
        {
            showHelp ();
            Sys.exit (0);
            return;
        }

        var parser : L8CmdParser = new L8CmdParser (args);

        if (parser.commands.length <= 0)
        {
            showHelp ();
            Sys.exit (0);
            return;
        }
        var responseHandler : L8ResponseHandler = new L8ResponseHandler ();
        responseHandler.setCSV (parser.csv);
        responseHandler.setCSVHeader (parser.csvHeader);
        responseHandler.setHex (parser.hex);
        responseHandler.setSilent (parser.silent);

        var serial : Serial = setup (parser.comPort, true, responseHandler);
        if (serial == null)
        {
            Sys.exit (-1);
            return;
        }
        var sender : L8CmdQueueSender;
        if (parser.repeat)
        {
            sender = new L8CmdRepeatingQueueSender (serial, parser.commands, parser.repeatsDelay, parser.repeatsCount, parser.repeatForever, responseHandler);
        }
        else
        {
            sender = new L8CmdQueueSender (serial, parser.commands, parser.delay, responseHandler);
        }
        sender.start ();

        closeConnection (serial, responseHandler);
    }

    public static function showHelp () : Void
    {
#if cpp
        Sys.println ("L8Ctl <command> [<parameter(s)>]");
#elseif java
        Sys.println ("java -jar L8Ctl.jar <command> [<parameter(s)>]");
#end
        Sys.println ("");
        Sys.println ("Commands (case insensitive):");
        Sys.println ("AppStop - stop current app");
        Sys.println ("AppAmbient RGB RGB threshold - start ambient light app with matrix color, superled color and threshold");
        Sys.println ("AppColorChange Multicolor|Tropical|Galaxy|Aurora speed true|false - Start color changer app with speed in SuperLED invert(= true), default: false");
        Sys.println ("AppDice RGB|RRGGBB - Start dice app with optional color, default: F00");
        Sys.println ("AppProximity RGB RGB threshold - start proximity app with matrix color, superled color and threshold");

        Sys.println ("AutoRotate true|false - enable / disable autorotate");
        Sys.println ("BatChg - battery charge status");
        Sys.println ("Bootloader - switch to DFU mode");
        Sys.println ("Brightness true|false - set low brightness of LEDs (matrix and super) true = high, false = low, default: false");
        Sys.println ("Box left top right bottom RGB RGB RGB - shows a box from left/top to right/bottom with border, fill and outside color");
        Sys.println ("Button - read button status");
        Sys.println ("CSV - print responses in CSV format");
        Sys.println ("CSVHeader - print responses in CSV format with header");
        Sys.println ("DeleteAnim anim# - Delete Animation by number (between 0 and GetNumAnims)");
        Sys.println ("DeleteFrame frame# - Delete Frame by number (between 0 and GetNumFrames)");
        Sys.println ("DeleteL8y l8y# - Delete L8y by number (between 0 and GetNumL8ies)");
        Sys.println ("DeleteUserSpace - Delete userspace");
        Sys.println ("DisplayChar char top|bottom|left|right offset - displays char with offset in pixels from top|bottom|left|right");
        Sys.println ("EnableAllNotifications true|false - enable/disable all notifications, default: true");
        Sys.println ("EnableNotification notification# true|false - enable/disable notification, default: true");
        Sys.println ("GetAcc - get values of accelerometer");
        Sys.println ("GetAmb - get values of ambient sensor");
        Sys.println ("GetMatrix - get current Matrix LED");
        Sys.println ("GetMCUTemp - get current MCU temperature");
        Sys.println ("GetMic - get current noise sensor value");
        Sys.println ("GetNotifyApp app# - get Name, Matrix colors, Super LED color and Enabled flag of app number (0-255)");
        Sys.println ("GetNumNotifyApps - get the number of notification apps");
        Sys.println ("GetNumAnims - get the number of anims in User space");
        Sys.println ("GetNumFrames - get the number of Frames in User space");
        Sys.println ("GetNumL8ies - get the number of L8ies in User space");
        Sys.println ("GetProx - get value of proximity sensor");
        Sys.println ("GetTemp - get value of temperature sensor");
        Sys.println ("GetThreshold - get current ambient, noise and proximity thresholds");
        Sys.println ("GetVoltage - get the voltage of L8 battery");
        Sys.println ("GetVBUS - get the voltage of USB connection");
        Sys.println ("Hex - print responses in raw hex format");
        Sys.println ("Init - get trace info");
        Sys.println ("Interface devicename - sets COM-port to use, default: /dev/ttyACM0");
        Sys.println ("L8y l8y# - show L8y (between 0 and GetNumL8ies)");
        Sys.println ("Led x y RGB|RRGGBB - set a single LED pixel");
#if cpp
        Sys.println ("MatrixLEDFile Filename.png offsetX offsetY - set matrix to 8x8 pixel area of Filename.png at offsetX/offsetY, default offset: 0/0 - only PNG supported!");
#end
        Sys.println ("MatrixLEDUni RGB|RRGGBB - set matrix to one color, default: 000 = off");
        Sys.println ("MatrixLEDString 64*(RGB|RRGGBB) - set matrix to colorlist");
        Sys.println ("MatrixOff - clear matrix");
        Sys.println ("Notify \"Phone Call\"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom on|mod|off category# - display notification, parameters see below");
        Sys.println ("Party - run party app");
        Sys.println ("PlayAnim anim# true|false - plays animation # as loop = true or once = false; default: loop=true");
        Sys.println ("Poweroff - poweroff");
        Sys.println ("ReadAnim anim# - gets frame and duration for animation from User Space (anim# between 0 and GetNumAnims)");
        Sys.println ("ReadFrame frame# - gets frame from User Space (frame# between 0 and GetNumFrames)");
        Sys.println ("ReadL8y l8y# - get matrix colors for L8y (l8y# between 0 and GetNumL8ies)");
        Sys.println ("Reset - reset");
        Sys.println ("Repeat #|forever delay - repeats all commands number of times specified or forever with optional delay (specified in 100th of a second) between commands");
        Sys.println ("RepeatSilent #|forever delay - repeats all commands number of times specified or forever with optional delay (specified in 100th of a second) between commands without printing responses from L8");
        Sys.println ("SetOrientation top|bottom|left|right - sets orientation");
        Sys.println ("SetAmbThreshold min max - sets min max values of ambient threshold");
        Sys.println ("SetNoiseThreshold min max - sets min max values of noise threshold");
        Sys.println ("SetProxThreshold min max - sets min max values of proximity threshold");
        Sys.println ("SuperLED RGB|RRGGBB - set superled to color, default: 000 = off");
        Sys.println ("StatusLED true|false - turn status LEDs on or off, default: false = off");
        Sys.println ("StopAnim - stops current animation");
        Sys.println ("StoreAnim frame#,duration,frame#,duration,... - stores a new animation in userspace (returns new index of anim)");
        Sys.println ("StoreFrame 64*(RGB|RRGGBB) - stores a new frame in userspace (returns new index of frame)");
#if cpp
        Sys.println ("StoreFrameFile Filename.png offsetX offsetY - stores a new frame in userspace from PNG file at offsetX/offsetY (returns new index of frame)");
#end
        Sys.println ("StoreNotification appbundle 64*(RGB|RRGGBB) RGB true|false - creates a new notification for app-bundlename with color-matrix and SuperLED color and initial enabled status");
        Sys.println ("StoreL8y 64*(RGB|RRGGBB) - stores a L8y (returns new index of L8y)");
#if cpp
        Sys.println ("StoreL8yFile Filename.png offsetX offsetY - stores a L8y from PNG file at offsetX/offsetY (returns new index of L8y)");
#end
        Sys.println ('Text RGB|RRGGBB text 0|1|2 true|false - scrolling text (max length: ${L8CmdSetText.MAX_LENGTH}, color and text are required parameter) with speed 0 = fast, 1 = medium, 2 = slow and true|false for loop, Default: loop = true');
        Sys.println ("UID - query device UID - decoder missing");
        Sys.println ("Version - query device versions - decoder missing");
        Sys.println ("");
        Sys.println ("RGB|RRGGBB - values in hex, either 3 or 6 digits, LEDs only support 4-bits per channel");
        Sys.println ("64*(RGB|RRGGBB) - values in hex should be: RGBRGBRGB... (= 192 chars) or RRGGBBRRGGBBRRGGBB... (= 384 chars)");
        Sys.println ("");
        Sys.println ("Notifications");
        Sys.println ("\"Phone Call\"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom - name of notification to display, Custom = use your own notification");
        Sys.println ("on|mod|off - allows to activate / show, modify and deactivate / remove a notification (only Incoming Call can be turned off)");
        Sys.println ("category# - notification category number (0 = Other|1 = Incoming Call|2 = MIssed Call|3 = Voice Mail|4 = Social|5 = Schedule|6 = E-Mail|7 = News|8 = Health/Fitness|9 = Business/Finance|10 = Location|11 = Entertainment|255 = Unknown)");
        Sys.println ("");
        Sys.println ("Repeat is implemented in L8Ctl and requires a constant connection, it is not a native capability of the L8.");
        Sys.println ("");
        Sys.println ("Interface allows you to change the default interface to match your system");
#if mac
        Sys.println ("default interface: /dev/cu.usbmodem641");
#elseif windows
        Sys.println ("default interface: COM3");
#else
        Sys.println ("default interface: /dev/ttyACM0");
#end
// Space for example commands...
        Sys.println ("");
        Sys.println ("");
        Sys.println ("Example (Windows)");
#if cpp
        Sys.println ("L8Ctl interface COM3 [<parameter(s)>]");
#elseif java
        Sys.println ("java -jar L8Ctl.jar interface COM3 [<parameter(s)>]");
#end
    }

    public static function main () : Void
    {
        try
        {
            var reader : L8Ctl = new L8Ctl ();
            reader.run ();
        }
        catch (e : L8Exception)
        {
            Sys.println ("fatal error");
            Sys.println (e.toString ());
        }
    }
}
