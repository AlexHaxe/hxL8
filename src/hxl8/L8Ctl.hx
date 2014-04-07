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
	            case "init", "initstatus", "status":
	                commands.push (new L8CmdQueryInitStatus ());
                case "interface":
                    comPort = args.shift ();
	            case "poweroff", "off":
	                commands.push (new L8CmdPowerOff ());
	            case "notificationssilent":
	                commands.push (new L8CmdQueryNotificationsSilent ());
	            case "party":
                    commands.push (new L8CmdAppStop ());                    
                    commands.push (new L8CmdAppRunParty ());
                case "ping":
                    commands.push (new L8CmdSendPing ());
	            case "reset":
	                commands.push (new L8CmdReset ());
	            case "setmatrixledfile", "matrixledfile", "matrixfile":
	                var fileName : String = args.shift ();
	                var offsetX : Int = consumeArgInt (args, 0);
	                var offsetY : Int = consumeArgInt (args, 0);
	                commands.push (new L8CmdSetMatrixLEDFile (fileName, offsetX, offsetY));
	            case "setmatrixleduni", "matrixleduni", "matrixuni":
	                var rgb : L8RGB = consumeArgColor (args, "000");
	                commands.push (new L8CmdSetMatrixLEDUni (rgb));
                case "setnotificationsilence", "silence", "silent":
                    var silence : Bool = consumeArgBool (args, false);
                    commands.push (new L8CmdSetNotificationsSilence (silence));            
	            case "setsuperled", "superled", "super":
	                var rgb : L8RGB = consumeArgColor (args, "000");
	                commands.push (new L8CmdSetSuperLED (rgb));
	            case "statusleds", "statusled":
                    var enable : Bool = consumeArgBool (args, false);
                    commands.push (new L8CmdEnableStatusLEDs (enable));
	            case "text":
//                    commands.push (new L8CmdAppStop ());
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
            Sys.sleep (0.001);
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
        Sys.println ("BatChg - battery charge status");
        Sys.println ("Brightness true|false - set low brightness of LEDs (matrix and super) true = high, false = low, default: false");
        Sys.println ("ColorChange 1|2|3|4 speed - Start color changer app");
        Sys.println ("Dice RGB|RRGGBB - Start dice app with optional color, default: F00");
        Sys.println ("EnableAllNotifcations true|false - enable/disable all notifications, default: true");
        Sys.println ("GetMatrix - get current Matrix LED (experimental)");
        Sys.println ("Init - get trace info");
        Sys.println ("Interface devicename - sets COM-port to use, default: /dev/ttyACM0");
        Sys.println ("Party - run party app");
        Sys.println ("Poweroff - poweroff");
        Sys.println ("Reset - reset");
#if cpp
        Sys.println ("MatrixLEDFile Filename.png offsetX offsetY - set matrix to 8x8 pixel area of Filename.png at offsetX/offsetY, default offset: 0/0 - only PNG supported!");
#end
        Sys.println ("MatrixLEDUni RGB|RRGGBB - set matrix to one color, default: 000 = off");
        Sys.println ("SuperLED RGB|RRGGBB - set superled to color, default: 000 = off");
        Sys.println ("StatusLED true|false - turn status LEDs on or off, default: false = off");
        Sys.println ("Text RGB|RRGGBB text speed true|false - scrolling text with speed (not working) and true|false for loop, Default: color = F00, loop = true");
        Sys.println ("UID - query device UID - decoder misssing");
        Sys.println ("Versions - query device versions - decoder misssing");
        Sys.println ("");
        Sys.println ("RGB|RRGGBB - values in hex, either 3 or 6 digits, LEDs only support 4-bits per channel");
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