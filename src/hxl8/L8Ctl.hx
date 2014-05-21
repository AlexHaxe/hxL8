package hxl8;

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
        
        var commands : Array<L8CmdBase> = new Array<L8CmdBase> ();
        
        var repeat : Bool = false;
        var repeatForever : Bool = false;
        var repeatsCount : Int = 0;
        var repeatsDelay : Int = 10;
        
        var comPort : String = "/dev/ttyACM0"; 
        var param : String;
        while (args.length > 0)
        {
            var command : String = args.shift ();            
	        switch (command.toLowerCase ())
	        {
				case "appstop", "stop":
				    commands.push (new L8CmdAppStop ());
                case "appambient":
                    commands.push (new L8CmdAppStop ());                    
                    var matrixRGB : L8RGB = consumeArgColor (args, "F00");
                    var superRGB : L8RGB = consumeArgColor (args, "F00");
                    var threshold : Int = consumeArgInt (args, 50);
                    commands.push (new L8CmdAppRunAmbient (matrixRGB, superRGB, threshold));
                case "appdice", "dice":
                    commands.push (new L8CmdAppStop ());                    
                    var rgb : L8RGB = consumeArgColor (args, "F00");
                    commands.push (new L8CmdAppRunDice (rgb));
                case "applight", "appcolorchange", "colorchange":
                    commands.push (new L8CmdAppStop ());
                    var color : String = args.shift ();
                    var speed : Int = consumeArgInt (args, 64);
                    var inverted : Bool = consumeArgBool (args, false);
                    commands.push (new L8CmdAppRunColorChanger (color, speed, inverted));
                case "appproximity", "appprox":
                    commands.push (new L8CmdAppStop ());                    
                    var matrixRGB : L8RGB = consumeArgColor (args, "F00");
                    var superRGB : L8RGB = consumeArgColor (args, "F00");
                    var threshold : Int = consumeArgInt (args, 50);
                    commands.push (new L8CmdAppRunProximity (matrixRGB, superRGB, threshold));
				case "autorotate":
                    var enable : Bool = consumeArgBool (args, true);
                    commands.push (new L8CmdEnableAutoRotate (enable));
				case "bootloader", "dfu":
				    commands.push (new L8CmdBootloader ());
                case "batchg", "bat":
                    commands.push (new L8CmdQueryBatChg ());
				case "brightness", "bright":
				    var brightness : Bool = consumeArgBool (args, false);
				    commands.push (new L8CmdSetBrightness (brightness));
                case "box":
                    var left : Int = consumeArgInt (args, 2);
                    var top : Int = consumeArgInt (args, 2);
                    var right : Int = consumeArgInt (args, 6);
                    var bottom : Int = consumeArgInt (args, 6);
                    var border : L8RGB = consumeArgColor (args, "F00");
                    var fill : L8RGB = consumeArgColor (args, "00F");
                    var outer : L8RGB = consumeArgColor (args, "000");
                    commands.push (new L8CmdBox (left, top, right, bottom, border, fill, outer));
                case "button":
                    commands.push (new L8CmdQueryButton ());
			    case "deletel8y":
                    var l8y : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdDeleteL8y (l8y));
                case "deleteanim":
                    var anim : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdDeleteAnim (anim));
                case "deleteframe":
                    var frame : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdDeleteFrame (frame));
                case "deleteusermemory", "deleteuserspace":
                    var really : String = args.shift ();
                    if (really != "YES")
                    {
                        Sys.println ('Please use: $command YES');
                        Sys.exit (-1);
                    }
                    commands.push (new L8CmdDeleteUserMemory ());
                case "displaychar", "char":
                    var char : String = args.shift ();
                    var direction : String = args.shift ();
                    var offset : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdDisplayChar (char, direction, offset));
				case "enableallnotifications", "enableallnotify":
				    var enable : Bool = consumeArgBool (args, true);
				    commands.push (new L8CmdEnableAllNotifications (enable));
                case "enablenotification", "enablenotify", "notifyenable":
                    var index : Int = consumeArgInt (args, 0);
                    var enable : Bool = consumeArgBool (args, true);
                    commands.push (new L8CmdEnableNotification (index, enable));
                case "getacc", "accelerator", "acc":
                    commands.push (new L8CmdQueryAcc ());
                case "getamb", "ambient", "amb":
                    commands.push (new L8CmdQueryAmbientLight ());
				case "getmatrix":
				    commands.push (new L8CmdGetCurrentMatrix ());
                case "getmcutemp", "mcutemperature", "mcutemp":
                    commands.push (new L8CmdQueryMCUTemp ());
                case "getmic", "microphone", "mic", "noise", "getnoise":
                    commands.push (new L8CmdQueryNoise ());
				case "getnotifyapp", "readnotifyapp", "getnotify", "readnotify":
				    var index : Int = consumeArgInt (args, 0);
				    var extended : Bool = consumeArgBool (args, true);
				    commands.push (new L8CmdGetNotifyApp (index, extended));
				case "getnumnotifyapps", "numnotifyapps", "numnotify":
				    commands.push (new L8CmdGetNumNotifyApps ());
                case "getnumanims", "numanims":
                    commands.push (new L8CmdQueryNumAnims ());
                case "getnumframes", "numframes", "numframe":
                    commands.push (new L8CmdQueryNumFrames ());
				case "getnuml8ies", "getnuml8y", "numl8ies", "numl8y":
				    commands.push (new L8CmdQueryNumL8ies ());
                case "getprox", "proximity", "prox":
                    commands.push (new L8CmdQueryProximity ());
                case "getthreshold", "sensorthresholds", "thresholds", "threshold":
                    commands.push (new L8CmdQuerySensorThresholds ());
                case "gettemp", "temperature", "temp":
                    commands.push (new L8CmdQueryTemp ());
                case "getvoltage", "voltage":
                    commands.push (new L8CmdQueryVoltage ());
                case "getvbus", "vbus":
                    commands.push (new L8CmdQueryVBUSVoltage ());
				case "init", "initstatus", "status":
				    commands.push (new L8CmdQueryInitStatus ());
				case "interface":
				    comPort = args.shift ();
                case "matrixoff", "matrixclear", "clear":
                    commands.push (new L8CmdMatrixOff ());
				case "poweroff", "off":
				    commands.push (new L8CmdPowerOff ());
				case "notificationssilent":
				    commands.push (new L8CmdQueryNotificationsSilent ());
				case "notification", "notify":
				    var app : String = args.shift ();
				    var eventType : String = args.shift ();
				    var category : Int = consumeArgInt (args, 0);
				    commands.push (new L8CmdSetNotification (app, eventType, category));
				case "party":
				    commands.push (new L8CmdAppStop ());                    
				    commands.push (new L8CmdAppRunParty ());
                case "playanim", "play":
                    var anim : Int = consumeArgInt (args, 0);
                    var loop : Bool = consumeArgBool (args, true);
                    commands.push (new L8CmdPlayAnim (anim, loop));
				case "ping":
				    commands.push (new L8CmdSendPing ());
			    case "readanim":
                    var anim : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdReadAnim (anim));
                case "readframe":
                    var frame : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdReadFrame (frame));
                case "readl8y":
                    var l8y : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdReadL8y (l8y));
                case "silentrepeat", "repeat", "repeatsilent":
                    var repeatNumber : String = args.shift ();
                    repeatsDelay = consumeArgInt (args, 10);
                    if (repeatNumber == "forever")
                    {
                        repeatForever = true;
                        repeatsCount = 0;
                    }
                    else
                    {
                        repeatForever = false;
                        repeatsCount = Std.parseInt (repeatNumber);
                        if (repeatsCount <= 0)
                        {
                            break;
                        }
                    }
                    if (repeatsDelay <= 0)
                    {
                        repeatsDelay = 1;
                    }
                    repeat = true;
                    if ((command == "repeatsilent") || (command == "silentrepeat"))
                    {
                        L8Receiver.silent = true;
                    }
				case "reset":
				    commands.push (new L8CmdReset ());
				case "setmatrixledfile", "matrixledfile", "matrixfile":
				    var fileName : String = args.shift ();
				    var offsetX : Int = consumeArgInt (args, 0);
				    var offsetY : Int = consumeArgInt (args, 0);
				    commands.push (new L8CmdSetMatrixLEDFile (fileName, offsetX, offsetY));
                case "setled", "led":
                    var x : Int = consumeArgInt (args, 0);
                    var y : Int = consumeArgInt (args, 0);
                    var rgb : L8RGB = consumeArgColor (args, "000");
                    commands.push (new L8CmdSetLED (x, y, rgb));
                case "setl8y", "l8y":
                    var index : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdSetStoredL8y (index));
				case "setmatrixledstring", "matrixledstring", "matrixstring":
                    var rgb : Array<L8RGB> = consumeArgColorArray (args, "000");
                    commands.push (new L8CmdSetMatrixLEDArray (rgb));
				case "setnotificationsilence", "silence", "silent":
				    var silence : Bool = consumeArgBool (args, false);
				    commands.push (new L8CmdSetNotificationsSilence (silence));            
                case "setmatrixleduni", "matrixleduni", "matrixuni":
                    var rgb : L8RGB = consumeArgColor (args, "000");
                    commands.push (new L8CmdSetMatrixLEDUni (rgb));
				case "setsuperled", "superled", "super":
				    var rgb : L8RGB = consumeArgColor (args, "000");
				    commands.push (new L8CmdSetSuperLED (rgb));
                case "setorientation", "orientation", "orient":
                    var orient : String = args.shift ();
                    commands.push (new L8CmdSetOrientation (orient));
                case "setambthreshold", "ambthreshold":
                    var min : Int = consumeArgInt (args, 0);
                    var max : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdSetAmbThreshold (min, max));
                case "setnoisethreshold", "noisethreshold":
                    var min : Int = consumeArgInt (args, 0);
                    var max : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdSetNoiseThreshold (min, max));
                case "setproxthreshold", "proxthreshold":
                    var min : Int = consumeArgInt (args, 0);
                    var max : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdSetProxThreshold (min, max));
				case "statusleds", "statusled":
				    var enable : Bool = consumeArgBool (args, false);
				    commands.push (new L8CmdEnableStatusLEDs (enable));
                case "stopanim":
                    commands.push (new L8CmdStopAnim ());
                case "storeanim":
                    var anim : String = args.shift ();
                    commands.push (new L8CmdStoreAnim (anim));
                case "storel8y":
                    var rgb : Array<L8RGB> = consumeArgColorArray (args, "000");
                    commands.push (new L8CmdStoreL8y (rgb));
                case "storeframe":
                    var rgb : Array<L8RGB> = consumeArgColorArray (args, "000");
                    commands.push (new L8CmdStoreFrame (rgb));
                case "storenotification", "storenotify", "setnotify", "setnotification":
                    var app : String = args.shift ();
                    var rgb : Array<L8RGB> = consumeArgColorArray (args, "000");
                    var superLED : L8RGB = consumeArgColor (args, "000");
                    var enable : Bool = consumeArgBool (args, false);
                    commands.push (new L8CmdStoreNotification (app, rgb, superLED, enable));
				case "text":
				    var rgb : L8RGB = consumeArgColor (args, "F00");
				    var text : String = args.shift ();
				    var speed : Int = consumeArgInt (args, 0);
				    var loop : Bool = consumeArgBool (args, true);
				    commands.push (new L8CmdSetText (speed, loop, rgb, text));
				case "uid":
				    commands.push (new L8CmdQueryMCUID ());
				case "version", "versions", "ver", "v":
				    commands.push (new L8CmdQueryVersions ());
				default:
				    continue; 
	        }
        }
        if (commands.length <= 0)
        {
            showHelp ();
            Sys.exit (0);
            return;
        }
        var needResponse : Bool = false;
        for (command in commands)
        {
            if (command.hasResponse ())
            {
                needResponse = true;
                break;
            }
        }
        var serial : Serial = setup (comPort, needResponse);
        if (serial == null)
        {
            Sys.exit (-1);
            return;
        }
        if (repeat)
        {
	        while (true)
	        {   
	            for (command in commands)
	            {
	                command.send (serial);
	                if (command.hasResponse ())
	                {
	                    // consume responses
	                    Thread.readMessage (false);
	                }
                    Sys.sleep (repeatsDelay / 100);
	            }
	            if (repeatForever)
	            {
	                continue;
	            }
	            repeatsCount--;
	            if (repeatsCount <= 0)
	            {
	                break;
	            }
	        }
        }
        else
        {
            for (command in commands)
            {
                command.send (serial);
                if (command.hasResponse ())
                {
                    waitForAnswer (serial, 1000);
                }
            }
        }
        
        closeConnection (serial);
    }   

    private function consumeArgColor (args : Array<String>, defaultRGB : String) : L8RGB
    {
        if (args.length <= 0)
        {
            return new L8RGB (defaultRGB);
        }
        return new L8RGB (args.shift ());
    }
    
    private function consumeArgColorArray (args : Array<String>, defaultRGB : String) : Array<L8RGB>
    {
        var result : Array<L8RGB> = new Array<L8RGB> ();
        var rgb : L8RGB; 
        if (args.length >= 0)
        {
            var values : String = args.shift ();
	        if (values.length == 192)
	        {
	            for (index in 0...64)
	            {
	                rgb = new L8RGB (values.substr (index * 3, 3));
                    result.push (rgb);
	            }
	            return result;
	        }
	        if (values.length == 384)
	        {
                for (index in 0...64)
                {
                    rgb = new L8RGB (values.substr (index * 6, 6));
                    result.push (rgb);
                }
                return result;
	        }
	        if (values.length < 192)
	        {
	            var count : Int =  Std.int (values.length / 3);
                for (index in 0...64)
                {
                    rgb = new L8RGB (values.substr ((index % count) * 3, 3));
                    result.push (rgb);
                }
                return result;
            }
        }
        for (index in 0...64)
        {
            result.push (new L8RGB (defaultRGB));
        }
        return result;
    }
    private function consumeArgInt (args : Array<String>, defaultValue : Int) : Int
    {
        if (args.length <= 0)
        {
            return defaultValue;
        }
        return Std.parseInt (args.shift ());
    }
    private function consumeArgBool (args : Array<String>, defaultValue : Bool) : Bool
    {
        if (args.length <= 0)
        {
            return defaultValue;
        }
        var value : String = args.shift ().toLowerCase ();
        return ((value == "true") || (value == "1"));
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
        Sys.println ("Repeat #|forever delay - repeats all commands forever or number of times with delay (100th of a second) between commands");
        Sys.println ("RepeatSilent #|forever delay - repeats all commands forever or number of times with delay (100th of a second) between commands without printing responses from L8");
        Sys.println ("SetOrientation top|bottom|left|right - sets orientation");
        Sys.println ("SetAmbThreshold min max - sets min max values of ambient threshold");
        Sys.println ("SetNoiseThreshold min max - sets min max values of noise threshold");
        Sys.println ("SetProxThreshold min max - sets min max values of proximity threshold");
        Sys.println ("SuperLED RGB|RRGGBB - set superled to color, default: 000 = off");
        Sys.println ("StatusLED true|false - turn status LEDs on or off, default: false = off");
        Sys.println ("StopAnim - stops current animation");        
        Sys.println ("StoreAnim frame#,duration,frame#,duration,... - stores a new animation in userspace (returns new index of anim)");        
        Sys.println ("StoreFrame 64*(RGB|RRGGBB) - stores a new frame in userspace (returns new index of frame)");        
        Sys.println ("StoreNotification appbundle 64*(RGB|RRGGBB) RGB true|false - creates a new ntofication for app-bundlename with color-matrix and SuperLED color and initial enabled status");        
        Sys.println ("StoreL8y 64*(RGB|RRGGBB) - stores a L8y (returns new index of L8y)");        
        Sys.println ("Text RGB|RRGGBB text 0|1|2 true|false - scrolling text with speed 0 = fast, 1 = medium, 2 = slow and true|false for loop, Default: loop = true");
        Sys.println ("UID - query device UID - decoder misssing");
        Sys.println ("Versions - query device versions - decoder misssing");
        Sys.println ("");
        Sys.println ("RGB|RRGGBB - values in hex, either 3 or 6 digits, LEDs only support 4-bits per channel");
        Sys.println ("64*(RGB|RRGGBB) - values in hex should be: RGBRGBRGB... (= 192 chars) or RRGGBBRRGGBBRRGGBB... (= 384 chars)");
        Sys.println ("");
        Sys.println ("Notifications");
        Sys.println ("\"Phone Call\"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom - name of notifcation to display, Custom =  use your own notification");
        Sys.println ("on|mod|off - allows to activate / show, modify and deactivate / remove a notification (only Incoming Call can be turned off)");
        Sys.println ("category# - notification category number (0 = Other|1 = Incoming Call|2 = MIssed Call|3 = Voice Mail|4 = Social|5 = Schedule|6 = E-Mail|7 = News|8 = Health/Fitness|9 = Business/Finance|10 = Location|11 = Entertainment|255 = Unknown)");
        Sys.println ("");
        Sys.println ("Repeat is not a real command of L8, it is implemented in L8Ctl and requires a constant connection.");
        Sys.println ("");
        Sys.println ("Interface allows you to change the default interface to match your system");
        Sys.println ("default interface: /dev/ttyACM0");
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
