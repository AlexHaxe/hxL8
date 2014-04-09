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

class L8Ctl 
{
    private var m_thread : Thread;
    
    public function new ()
    {
    }

    public function setup (comPort : String, startThread : Bool = false) : Serial
    {
	    if (!FileSystem.exists (comPort))
	    {
	        trace ("COM-Port does not exist " + comPort);
	        Sys.exit (-1);
	        return null;
	    }
        var serialFile : Serial = new Serial (comPort, 9600, true);
        while (!serialFile.isSetup)
        {
            trace ("COM-Port unavailable - reconnect in 1s");
            Sys.sleep (1);
            serialFile.setup ();
        }        
        
        if (startThread)
        {
	        m_thread = Thread.create (L8Receiver.receiverThread);
	        m_thread.sendMessage (Thread.current ());
	        m_thread.sendMessage (serialFile);
        }
        return serialFile;
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
        
        var comPort : String = "/dev/ttyACM0"; 
        var param : String;
        while (args.length > 0)
        {
            var command : String = args.shift ();            
	        switch (command.toLowerCase ())
	        {
				case "appstop", "stop":
				    commands.push (new L8CmdAppStop ());
				case "autorotate":
                    var enable : Bool = consumeArgBool (args, true);
                    commands.push (new L8CmdEnableAutoRotate (enable));
				case "batchg", "bat":
				    commands.push (new L8CmdQueryBatChg ());
				case "brightness", "bright":
				    var brightness : Bool = consumeArgBool (args, false);
				    commands.push (new L8CmdSetBrightness (brightness));
				case "colorchange":
				    commands.push (new L8CmdAppStop ());
				    var color : Int = consumeArgInt (args, 0);
				    var speed : Int = consumeArgInt (args, 64);
				    commands.push (new L8CmdAppRunColorChanger (color, speed, false));
			    case "deletel8y":
                    var l8y : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdDeleteL8y (l8y));
				case "dice":
				    commands.push (new L8CmdAppStop ());	                
				    var rgb : L8RGB = consumeArgColor (args, "F00");
				    commands.push (new L8CmdAppRunDice (rgb));
				case "enableallnotifcations":
				    var enable : Bool = consumeArgBool (args, true);
				    commands.push (new L8CmdEnableAllNotifications (enable));
				case "getmatrix":
				    commands.push (new L8CmdGetCurrentMatrix ());
				case "getnotifyapp":
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
				case "init", "initstatus", "status":
				    commands.push (new L8CmdQueryInitStatus ());
				case "interface":
				    comPort = args.shift ();
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
				case "ping":
				    commands.push (new L8CmdSendPing ());
                case "readframe":
                    var frame : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdReadFrame (frame));
                case "readl8y":
                    var l8y : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdReadL8y (l8y));
				case "reset":
				    commands.push (new L8CmdReset ());
				case "setmatrixledfile", "matrixledfile", "matrixfile":
				    var fileName : String = args.shift ();
				    var offsetX : Int = consumeArgInt (args, 0);
				    var offsetY : Int = consumeArgInt (args, 0);
				    commands.push (new L8CmdSetMatrixLEDFile (fileName, offsetX, offsetY));
                case "setl8y", "l8y":
                    var index : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdSetStoredL8y (index));
				case "setmatrixleduni", "matrixleduni", "matrixuni":
				    var rgb : L8RGB = consumeArgColor (args, "000");
				    commands.push (new L8CmdSetMatrixLEDUni (rgb));
				case "setmatrixledstring", "matrixledstring", "matrixstring":
                    var rgb : Array<L8RGB> = consumeArgColorArray (args, "000");
                    commands.push (new L8CmdSetMatrixLEDArray (rgb));
				case "setnotificationsilence", "silence", "silent":
				    var silence : Bool = consumeArgBool (args, false);
				    commands.push (new L8CmdSetNotificationsSilence (silence));            
				case "setsuperled", "superled", "super":
				    var rgb : L8RGB = consumeArgColor (args, "000");
				    commands.push (new L8CmdSetSuperLED (rgb));
				case "statusleds", "statusled":
				    var enable : Bool = consumeArgBool (args, false);
				    commands.push (new L8CmdEnableStatusLEDs (enable));
                case "storel8y":
                    var rgb : Array<L8RGB> = consumeArgColorArray (args, "000");
                    commands.push (new L8CmdStoreL8y (rgb));
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
        for (command in commands)
        {
            command.send (serial);
            if (command.hasResponse ())
            {
                waitForAnswer (serial, 1000);
            }
        }
        closeConnection (serial);
    }   

    private function closeConnection (serial : Serial) : Void
    {
        if (m_thread != null)
        {
	        while (true)
	        {
		        var bye : String = Thread.readMessage (false);
	            m_thread.sendMessage ("close");
		        
		        if (bye == null)
		        {
		            continue;
	            }
	            if (bye == "bye")
	            {
	                break;
	            }
	        }   
        }

        serial.close ();
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
    private function waitForAnswer (serial : Serial, tries : Int) : Void
    {
        while (true)
        {
            tries -= 1;
            if (tries <= 0)
            {
                trace ("timeout waiting for response");
                return;
            }
            var msg : String = Thread.readMessage (false);
            if (msg != null)
            {
                return;
            }
            Sys.sleep (0.005);
        }
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
        Sys.println ("AutoRotate true|false - enable / disable autorotate");
        Sys.println ("BatChg - battery charge status");
        Sys.println ("Brightness true|false - set low brightness of LEDs (matrix and super) true = high, false = low, default: false");
        Sys.println ("ColorChange 1|2|3|4 speed - Start color changer app");
        Sys.println ("DeleteL8y l8y# - Delete L8y by number (between 0 and GetNumL8ies)");        
        Sys.println ("Dice RGB|RRGGBB - Start dice app with optional color, default: F00");
        Sys.println ("EnableAllNotifcations true|false - enable/disable all notifications, default: true");
        Sys.println ("GetMatrix - get current Matrix LED (experimental)");
        Sys.println ("GetNotifyApp app# - get Name, Matrix colors, Super LED color and Enabled flag of app number (0-255)");
        Sys.println ("GetNumNotifyApps - get the number of notification apps");
        Sys.println ("GetNumAnims - get the number of anims in User space");
        Sys.println ("GetNumFrames - get the number of Frames in User space");
        Sys.println ("GetNumL8ies - get the number of L8ies in User space");
        Sys.println ("Init - get trace info");
        Sys.println ("Interface devicename - sets COM-port to use, default: /dev/ttyACM0");
        Sys.println ("L8y l8y# - Show L8y (between 0 and GetNumL8ies)");        
#if cpp
        Sys.println ("MatrixLEDFile Filename.png offsetX offsetY - set matrix to 8x8 pixel area of Filename.png at offsetX/offsetY, default offset: 0/0 - only PNG supported!");
#end
        Sys.println ("MatrixLEDUni RGB|RRGGBB - set matrix to one color, default: 000 = off");
        Sys.println ("MatrixLEDString 64*(RGB|RRGGBB) - set matrix to colorlist");
        Sys.println ("Notify \"Phone Call\"|WhatsApp|Facebook|GMail|MobileMail|Tweet|SMS|Line|Instagram|Hangout|GooglePlus|Custom on|mod|off category# - display notification, parameters see below");
        Sys.println ("Party - run party app");
        Sys.println ("Poweroff - poweroff");
        Sys.println ("ReadFrame frame# - gets frame from User Space (number should be between 0 and GetNumFrames)");
        Sys.println ("ReadL8y l8y# - get matrix colors for L8y (between 0 and GetNumL8ies)");        
        Sys.println ("Reset - reset");
        Sys.println ("SuperLED RGB|RRGGBB - set superled to color, default: 000 = off");
        Sys.println ("StatusLED true|false - turn status LEDs on or off, default: false = off");
        Sys.println ("StoreL8y 64*(RGB|RRGGBB) - set matrix to colorlist (returns new index of L8y)");        
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