package hxl8;

import hxl8.commands.L8CmdBase;
import hxl8.commands.L8CmdAppStop;
import hxl8.commands.L8CmdAppRunAmbient;
import hxl8.commands.L8CmdAppRunDice;
import hxl8.commands.L8CmdAppRunColorChanger;
import hxl8.commands.L8CmdAppRunProximity;
import hxl8.commands.L8CmdEnableAutoRotate;
import hxl8.commands.L8CmdBootloader;
import hxl8.commands.L8CmdQueryBatChg;
import hxl8.commands.L8CmdSetBrightness;
import hxl8.commands.L8CmdBox;
import hxl8.commands.L8CmdQueryButton;
import hxl8.commands.L8CmdDeleteL8y;
import hxl8.commands.L8CmdDeleteAnim;
import hxl8.commands.L8CmdDeleteFrame;
import hxl8.commands.L8CmdDeleteUserMemory;
import hxl8.commands.L8CmdDisplayChar;
import hxl8.commands.L8CmdEnableAllNotifications;
import hxl8.commands.L8CmdEnableNotification;
import hxl8.commands.L8CmdQueryAcc;
import hxl8.commands.L8CmdQueryAmbientLight;
import hxl8.commands.L8CmdGetCurrentMatrix;
import hxl8.commands.L8CmdQueryMCUTemp;
import hxl8.commands.L8CmdQueryNoise;
import hxl8.commands.L8CmdGetNotifyApp;
import hxl8.commands.L8CmdGetNumNotifyApps;
import hxl8.commands.L8CmdQueryNumAnims;
import hxl8.commands.L8CmdQueryNumFrames;
import hxl8.commands.L8CmdQueryNumL8ies;
import hxl8.commands.L8CmdQueryProximity;
import hxl8.commands.L8CmdQuerySensorThresholds;
import hxl8.commands.L8CmdQueryTemp;
import hxl8.commands.L8CmdQueryVoltage;
import hxl8.commands.L8CmdQueryVBUSVoltage;
import hxl8.commands.L8CmdQueryInitStatus;
import hxl8.commands.L8CmdMatrixOff;
import hxl8.commands.L8CmdPowerOff;
import hxl8.commands.L8CmdQueryNotificationsSilent;
import hxl8.commands.L8CmdSetNotification;
import hxl8.commands.L8CmdAppRunParty;
import hxl8.commands.L8CmdPlayAnim;
import hxl8.commands.L8CmdSendPing;
import hxl8.commands.L8CmdReadAnim;
import hxl8.commands.L8CmdReadFrame;
import hxl8.commands.L8CmdReadL8y;
import hxl8.commands.L8CmdReset;
import hxl8.commands.L8CmdSetLED;
import hxl8.commands.L8CmdSetStoredL8y;
import hxl8.commands.L8CmdSetMatrixLEDArray;
import hxl8.commands.L8CmdSetNotificationsSilence;
import hxl8.commands.L8CmdSetMatrixLEDUni;
import hxl8.commands.L8CmdSetSuperLED;
import hxl8.commands.L8CmdSetOrientation;
import hxl8.commands.L8CmdSetAmbThreshold;
import hxl8.commands.L8CmdSetNoiseThreshold;
import hxl8.commands.L8CmdSetProxThreshold;
import hxl8.commands.L8CmdEnableStatusLEDs;
import hxl8.commands.L8CmdStopAnim;
import hxl8.commands.L8CmdStoreAnim;
import hxl8.commands.L8CmdStoreL8y;
import hxl8.commands.L8CmdStoreFrame;
import hxl8.commands.L8CmdStoreNotification;
import hxl8.commands.L8CmdSetText;
import hxl8.commands.L8CmdQueryMCUID;
import hxl8.commands.L8CmdQueryVersions;

#if cpp
import hxl8.commands.L8CmdSetMatrixLEDFile;
import hxl8.commands.L8CmdStoreL8yFile;
import hxl8.commands.L8CmdStoreFrameFile;
#end

class L8CmdParser implements ICommandList implements ICommandListRepeating
{
    private static var m_commands : Array<String> = [
        "appstop", "stop", "appambient", "appdice", "dice", "applight",
        "appcolorchange", "colorchange", "appproximity", "appprox", "autorotate", "bootloader", "dfu",
        "batchg", "bat", "brightness", "bright", "box", "button", "deletel8y", "deleteanim", "deleteframe",
        "deleteusermemory", "deleteuserspace", "displaychar", "char", "enableallnotifications",
        "enableallnotify", "enablenotification", "enablenotify", "notifyenable", "getacc", "accelerator",
        "acc", "getamb", "ambient", "amb", "getmatrix", "getmcutemp", "mcutemperature", "mcutemp", "getmic",
        "microphone", "mic", "noise", "getnoise", "getnotifyapp", "readnotifyapp", "getnotify", "readnotify",
        "getnumnotifyapps", "numnotifyapps", "numnotify", "getnumanims", "numanims", "getnumframes",
        "numframes", "numframe", "getnuml8ies", "getnuml8y", "numl8ies", "numl8y", "getprox", "proximity",
        "prox", "getthreshold", "sensorthresholds", "thresholds", "threshold", "gettemp", "temperature",
        "temp", "getvoltage", "voltage", "getvbus", "vbus", "init", "initstatus", "status", "interface",
        "int", "if", "matrixoff", "matrixclear", "clear", "poweroff", "off", "notificationssilent",
        "notification", "notify", "party", "playanim", "play", "ping", "readanim", "readframe", "readl8y",
        "silentrepeat", "repeat", "repeatsilent", "reset", "setmatrixledfile", "matrixledfile", "matrixfile",
        "setled", "led", "setl8y", "l8y", "setmatrixledstring", "matrixledstring", "matrixstring",
        "setnotificationsilence", "silence", "silent", "setmatrixleduni", "matrixleduni", "matrixuni",
        "setsuperled", "superled", "super", "setorientation", "orientation", "orient", "setambthreshold",
        "ambthreshold", "setnoisethreshold", "noisethreshold", "setproxthreshold", "proxthreshold",
        "statusleds", "statusled", "stopanim", "storeanim", "storel8y", "storel8yfile", "storeframe",
        "storeframefile", "storenotification", "storenotify", "setnotify", "setnotification", "text",
        "uid", "version", "versions", "ver", "v", "hex", "csv", "csvheader", "csvhead", "numanim", "delay"
    ];

    private var commands : Array<L8CmdBase>;

    private var needResponse : Bool;

    private var repeat : Bool;
    private var repeatForever : Bool;
    private var repeatsCount : Int;
    private var repeatsDelay : Int;

    private var delay : Int;

    private var comPort : String;

    public function new (args : Array<String>, overwriteComPort : String = null, outputter : IResponseOutput)
    {
        commands = [];
        needResponse = false;
        repeat = false;
        repeatForever = false;
        repeatsCount = 0;
        repeatsDelay = 10;
        delay = 100;
        comPort = "/dev/ttyACM0";
#if mac
        comPort = "/dev/cu.usbmodem641";
#end
#if windows
        comPort = "COM3";
#end
        if (overwriteComPort != null)
        {
            comPort = overwriteComPort;
        }
        parse (args, outputter);
    }

    public function isRepeat () : Bool
    {
        return repeat;
    }
    public function isRepeatForever () : Bool
    {
        return repeatForever;
    }
    public function getRepeatCount () : Int
    {
        return repeatsCount;
    }
    public function getRepeatDelay () : Int
    {
        return repeatsDelay;
    }
    public function getDelay () : Int
    {
        return delay;
    }
    public function hasCommands () : Bool
    {
        if (commands == null)
        {
            return false;
        }
        return (commands.length > 0);
    }
    public function getCommands () : Array<L8CmdBase>
    {
        return commands;
    }
    public function getComPort () : String
    {
        return comPort;
    }

    @SuppressWarnings(["checkstyle:CyclomaticComplexity", "checkstyle:MethodLength"])
    private function parse (args : Array<String>, outputter : IResponseOutput) : Void
    {
        if (args.length <= 0)
        {
            return;
        }

        //var param : String;
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
#if (cpp || java)
                        Sys.println ('Please use: $command YES');
                        Sys.exit (-1);
#end
                        break;
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
                case "getnumanims", "numanims", "numanim":
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
                case "interface", "int", "if":
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
                    repeatsDelay = consumeArgInt (args, 50);
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
                        repeatsDelay = 50;
                    }
                    repeat = true;
                    if ((command == "repeatsilent") || (command == "silentrepeat"))
                    {
                        outputter.setSilent (true);
                    }
                case "reset":
                    commands.push (new L8CmdReset ());
#if cpp
                case "setmatrixledfile", "matrixledfile", "matrixfile":
                    var fileName : String = args.shift ();
                    var offsetX : Int = consumeArgInt (args, 0);
                    var offsetY : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdSetMatrixLEDFile (fileName, offsetX, offsetY));
#end
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
#if cpp
                case "storel8yfile":
                    var fileName : String = args.shift ();
                    var offsetX : Int = consumeArgInt (args, 0);
                    var offsetY : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdStoreL8yFile (fileName, offsetX, offsetY));
#end
                case "storeframe":
                    var rgb : Array<L8RGB> = consumeArgColorArray (args, "000");
                    commands.push (new L8CmdStoreFrame (rgb));
#if cpp
                case "storeframefile":
                    var fileName : String = args.shift ();
                    var offsetX : Int = consumeArgInt (args, 0);
                    var offsetY : Int = consumeArgInt (args, 0);
                    commands.push (new L8CmdStoreFrameFile (fileName, offsetX, offsetY));
#end
                case "storenotification", "storenotify", "setnotify", "setnotification":
                    var app : String = args.shift ();
                    var rgb : Array<L8RGB> = consumeArgColorArray (args, "000");
                    var superLED : L8RGB = consumeArgColor (args, "000");
                    var enable : Bool = consumeArgBool (args, false);
                    commands.push (new L8CmdStoreNotification (app, rgb, superLED, enable));
                case "text":
                    var rgb : L8RGB = consumeArgColor (args, "F00");
                    var text : String = args.shift ();
                    if (text == null)
                    {
                        // no text - no service
                        continue;
                    }
                    var speed : Int = consumeArgInt (args, 0);
                    var loop : Bool = consumeArgBool (args, true);
                    commands.push (new L8CmdSetText (speed, loop, rgb, text));
                case "uid":
                    commands.push (new L8CmdQueryMCUID ());
                case "version", "versions", "ver", "v":
                    commands.push (new L8CmdQueryVersions ());
                case "hex":
                    outputter.setHex (true);
                case "csv":
                    outputter.setCSV (true);
                case "csvheader", "csvhead":
                    outputter.setCSVHeader (true);
                case "delay":
                    delay = consumeArgInt (args, 100);
                default:
                    continue;
            }
        }
        if (commands.length <= 0)
        {
            return;
        }
        for (command in commands)
        {
            if (command.hasResponse ())
            {
                needResponse = true;
                break;
            }
        }
    }
    private function argIsCommand (arg : String) : Bool
    {
        var lowerCase : String = arg.toLowerCase();
        for (command in m_commands)
        {
            if (command == lowerCase)
            {
                return true;
            }
        }
        return false;
    }
    private function consumeArgColor (args : Array<String>, defaultRGB : String) : L8RGB
    {
        if (args.length <= 0)
        {
            return new L8RGB (defaultRGB);
        }
        var rawVal : String = args.shift ();
        if (argIsCommand (rawVal))
        {
            args.unshift (rawVal);
            return new L8RGB (defaultRGB);
        }
        var r : EReg = ~/^[0-9a-fA-F]+$/;
        if (!r.match (rawVal))
        {
            args.unshift (rawVal);
            return new L8RGB (defaultRGB);
        }
        if ((rawVal.length != 3) && (rawVal.length != 6))
        {
            args.unshift (rawVal);
            return new L8RGB (defaultRGB);
        }
        return new L8RGB (rawVal);
    }

    @SuppressWarnings("checkstyle:CyclomaticComplexity")
    private function consumeArgColorArray (args : Array<String>, defaultRGB : String) : Array<L8RGB>
    {
        var result : Array<L8RGB> = [];
        var rgb : L8RGB;
        if (args.length >= 0)
        {
            var values : String = args.shift ();
            if (argIsCommand (values))
            {
                args.unshift (values);
                values = defaultRGB;
            }
            var r : EReg = ~/^[0-9a-fA-F]+$/;
            if (!r.match (values))
            {
                args.unshift (values);
                values = defaultRGB;
            }
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
        var rawVal : String = args.shift ();
        if (argIsCommand (rawVal))
        {
            args.unshift (rawVal);
            return defaultValue;
        }
        var r : EReg = ~/^[0-9]+$/;
        if (!r.match (rawVal))
        {
            args.unshift (rawVal);
            return defaultValue;
        }
        return Std.parseInt (rawVal);
    }
    private function consumeArgBool (args : Array<String>, defaultValue : Bool) : Bool
    {
        if (args.length <= 0)
        {
            return defaultValue;
        }
        var rawVal : String = args.shift ();
        if (argIsCommand (rawVal))
        {
            args.unshift (rawVal);
            return defaultValue;
        }
        var value : String = rawVal.toLowerCase ();
        switch (value)
        {
            case "true", "1", "yes", "on":
                return true;
            case "false", "0", "no", "off":
                return false;
        }
        args.unshift (rawVal);
        return defaultValue;
    }
}
