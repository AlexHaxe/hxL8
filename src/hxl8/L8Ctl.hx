package hxl8;

import EReg;
import sys.FileSystem;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.Types;

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

        var responseHandler : L8ResponseHandler = new L8ResponseHandler ();
        var parser : L8CmdParser = new L8CmdParser (args, responseHandler);

        if (!parser.hasCommands ())
        {
            showHelp ();
            Sys.exit (0);
            return;
        }

        var serial : Serial = setup (parser.getComPort (), true, responseHandler);
        if (serial == null)
        {
            Sys.exit (-1);
            return;
        }
        var sender : L8CmdQueueSender;
        if (parser.isRepeat ())
        {
            sender = new L8CmdRepeatingQueueSender (serial, parser, responseHandler);
        }
        else
        {
            sender = new L8CmdQueueSender (serial, parser, responseHandler);
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
        Sys.println ("");
        Sys.println ("L8 applications");
        Sys.println ("---------------");
        Sys.println ("appstop\n -> stop current app");
        Sys.println ("appambient RGB RGB threshold\n -> start ambient light app with matrix color, superled color and threshold");
        Sys.println ("appcolorchange Multicolor|Tropical|Galaxy|Aurora speed true|false\n -> Start color changer app with speed in SuperLED invert(= true), default: false");
        Sys.println ("appdice RGB|RRGGBB\n -> Start dice app with optional color, default: F00");
        Sys.println ("appproximity RGB RGB threshold\n -> start proximity app with matrix color, superled color and threshold");
        Sys.println ("party\n -> run party app");
        Sys.println ("");
        Sys.println ("L8 sensors");
        Sys.println ("----------");
        Sys.println ("AutoRotate true|false\n -> enable / disable autorotate");
        Sys.println ("BatChg\n -> battery charge status");
        Sys.println ("Button\n -> read button status");
        Sys.println ("GetAcc\n -> get values of accelerometer");
        Sys.println ("GetAmb\n -> get values of ambient sensor");
        Sys.println ("GetMCUTemp\n -> get current MCU temperature");
        Sys.println ("GetMic\n -> get current noise sensor value");
        Sys.println ("GetProx\n -> get value of proximity sensor");
        Sys.println ("GetTemp\n -> get value of temperature sensor");
        Sys.println ("GetThreshold\n -> get current ambient, noise and proximity thresholds");
        Sys.println ("GetVoltage\n -> get the voltage of L8 battery");
        Sys.println ("GetVBUS\n -> get the voltage of USB connection");
        Sys.println ("SetOrientation top|bottom|left|right\n -> sets orientation");
        Sys.println ("SetAmbThreshold min max\n -> sets min max values of ambient threshold");
        Sys.println ("SetNoiseThreshold min max\n -> sets min max values of noise threshold");
        Sys.println ("SetProxThreshold min max\n -> sets min max values of proximity threshold");
        Sys.println ("");
        Sys.println ("L8 response output options");
        Sys.println ("--------------------------");
        Sys.println ("CSV\n -> print responses in CSV format");
        Sys.println ("CSVHeader\n -> print responses in CSV format with header");
        Sys.println ("Hex\n -> print responses in raw hex format");
        Sys.println ("");
        Sys.println ("L8y");
        Sys.println ("---");
        Sys.println ("DeleteL8y l8y#\n -> Delete L8y by number (between 0 and GetNumL8ies)");
        Sys.println ("GetNumL8ies\n -> get the number of L8ies in User space");
        Sys.println ("L8y l8y#\n -> show L8y (between 0 and GetNumL8ies)");
        Sys.println ("ReadL8y l8y#\n -> get matrix colors for L8y (l8y# between 0 and GetNumL8ies)");
        Sys.println ("StoreL8y 64*(RGB|RRGGBB)\n -> stores a L8y (returns new index of L8y)");
#if cpp
        Sys.println ("StoreL8yFile Filename.png offsetX offsetY\n -> stores a L8y from PNG file at offsetX/offsetY (returns new index of L8y)");
#end
        Sys.println ("");
        Sys.println ("L8 notifications");
        Sys.println ("----------------");
        Sys.println ("EnableAllNotifications true|false\n -> enable/disable all notifications, default: true");
        Sys.println ("EnableNotification notification# true|false\n -> enable/disable notification, default: true");
        Sys.println ("GetNotifyApp app#\n -> get Name, Matrix colors, Super LED color and Enabled flag of app number (0-255)");
        Sys.println ("GetNumNotifyApps\n -> get the number of notification apps");
        Sys.println ("Notify \"Phone Call\"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom on|mod|off category#\n -> display notification, parameters see below");
        Sys.println ("StoreNotification appbundle 64*(RGB|RRGGBB) RGB true|false\n -> creates a new notification for app-bundlename with color-matrix and SuperLED color and initial enabled status");
        Sys.println ("");
        Sys.println ("L8 frames");
        Sys.println ("---------");
        Sys.println ("DeleteFrame frame#\n -> Delete Frame by number (between 0 and GetNumFrames)");
        Sys.println ("GetNumFrames\n -> get the number of Frames in User space");
        Sys.println ("ReadFrame frame#\n -> gets frame from User Space (frame# between 0 and GetNumFrames)");
        Sys.println ("StoreFrame 64*(RGB|RRGGBB)\n -> stores a new frame in userspace (returns new index of frame)");
#if cpp
        Sys.println ("StoreFrameFile Filename.png offsetX offsetY\n -> stores a new frame in userspace from PNG file at offsetX/offsetY (returns new index of frame)");
#end
        Sys.println ("");
        Sys.println ("L8 animations");
        Sys.println ("-------------");
        Sys.println ("DeleteAnim anim#\n -> Delete Animation by number (between 0 and GetNumAnims)");
        Sys.println ("GetNumAnims\n -> get the number of anims in User space");
        Sys.println ("PlayAnim anim# true|false\n -> plays animation # as loop = true or once = false; default: loop=true");
        Sys.println ("ReadAnim anim#\n -> gets frame and duration for animation from User Space (anim# between 0 and GetNumAnims)");
        Sys.println ("StopAnim\n -> stops current animation");
        Sys.println ("StoreAnim frame#,duration,frame#,duration,...\n -> stores a new animation in userspace (returns new index of anim)");
        Sys.println ("");


        
        Sys.println ("L8 matrix");
        Sys.println ("---------");
        Sys.println ("Brightness true|false\n -> set low brightness of LEDs (matrix and super) true = high, false = low, default: false");
        Sys.println ("Box left top right bottom RGB RGB RGB\n -> shows a box from left/top to right/bottom with border, fill and outside color");
        Sys.println ("GetMatrix\n -> get current Matrix LED");
#if cpp
        Sys.println ("MatrixLEDFile Filename.png offsetX offsetY\n -> set matrix to 8x8 pixel area of Filename.png at offsetX/offsetY, default offset: 0/0 - only PNG supported!");
#end
        Sys.println ("MatrixLEDUni RGB|RRGGBB\n -> set matrix to one color, default: 000 = off");
        Sys.println ("MatrixLEDString 64*(RGB|RRGGBB)\n -> set matrix to colorlist");
        Sys.println ("MatrixOff\n -> clear matrix");
        Sys.println ("Led x y RGB|RRGGBB\n -> set a single LED pixel");
        Sys.println ("");
        Sys.println ("L8 super LED");
        Sys.println ("------------");
        Sys.println ("SuperLED RGB|RRGGBB\n -> set superled to color, default: 000 = off");
        Sys.println ("");
        Sys.println ("L8 text");
        Sys.println ("-------");
        Sys.println ("DisplayChar char top|bottom|left|right offset\n -> displays char with offset in pixels from top|bottom|left|right");
        Sys.println ('Text RGB|RRGGBB text 0|1|2 true|false\n -> scrolling text (max length: ${L8CmdSetText.MAX_LENGTH}, color and text are required parameter) with speed 0 = fast, 1 = medium, 2 = slow and true|false for loop, Default: loop = true');
        Sys.println ("");

        Sys.println ("L8 ad-hoc animations");
        Sys.println ("--------------------");
        Sys.println ("Repeat #|forever delay\n -> repeats all commands number of times specified or forever with optional delay (specified in 100th of a second) between commands");
        Sys.println ("RepeatSilent #|forever delay\n -> repeats all commands number of times specified or forever with optional delay (specified in 100th of a second) between commands without printing responses from L8");
        Sys.println ("");
        Sys.println ("L8 serial port");
        Sys.println ("--------------");
        Sys.println ("Interface devicename\n -> sets COM-port to use, default: /dev/ttyACM0");
        Sys.println ("");
        Sys.println ("L8 misc");
        Sys.println ("-------");
        Sys.println ("Bootloader\n -> switch to DFU mode");
        Sys.println ("Delay ms\n -> delay in ms between commands when sending multiple commands, default: 100");
        Sys.println ("DeleteUserSpace\n -> Delete userspace");
        Sys.println ("Init\n -> get trace info");
        Sys.println ("Poweroff\n -> poweroff");
        Sys.println ("Reset\n -> reset");
        Sys.println ("StatusLED true|false\n -> turn status LEDs on or off, default: false = off");
        Sys.println ("UID\n -> query device UID");
        Sys.println ("Version\n -> query device versions");
        Sys.println ("");
        Sys.println ("RGB|RRGGBB - values in hex, either 3 or 6 digits, LEDs only support 4-bits per channel");
        Sys.println ("64*(RGB|RRGGBB) - values in hex should be: RGBRGBRGB... (= 192 chars) or RRGGBBRRGGBBRRGGBB... (= 384 chars)");
        Sys.println ("");
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
