package hxl8;

#if cpp
import cpp.vm.Thread;
#elseif java
import java.vm.Thread;
#else
fail - unsupported
#end

import sys.FileSystem;

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

import hxl8.responses.*;

class L8Receiver
{
    public static var silent : Bool = false;
    public static var hex : Bool = false;
    public static var csv : Bool = false;
    public static var csvHeader : Bool = false;

    public static function receiverThread () : Void
    {
        var started : Bool = false;

        var status : Int = 0;
        var len : UInt = 0;
        var readIndex : Int = 0;

        var dataBuffer : BytesBuffer = null;

        var mainThread : Thread = Thread.readMessage (true);
        var serial : Serial = Thread.readMessage (true);
        while (true)
        {
            if (serial.available () <= 0)
            {
                Sys.sleep (0.3);
                if (serial.available () <= 0)
                {
                    var close : String = Thread.readMessage (false);

                    if (close != null)
                    {
                        if (close == "close")
                        {
                            mainThread.sendMessage ("bye");
                            return;
                        }
                    }
                }
                continue;
            }
            var rawbyte : UInt = serial.readByte ();
//            trace (rawbyte);
            var byte : Int = rawbyte % 256;
//            trace (byte);
            switch (status)
            {
                case 0:
                    if (byte == 170) // 0xAA
                    {
                        status = 1;
                    }
                case 1:
                    if (byte == 85) // 0x55
                    {
                        status = 2;
                    }
                case 2:
                    len = byte;
                    dataBuffer = new BytesBuffer ();
                    readIndex = 0;
                    status = 3;
                case 3:
                    readIndex++;
                    dataBuffer.addByte (byte);
                    if (readIndex >= len)
                    {
                        status = 4;
                    }
                case 4:
                    var data : Bytes = dataBuffer.getBytes ();

                    var crc : Int = L8CrcCalc.calcCRC (data);
                    status = 0;
                    var response : L8ResponseBase = null;
                    if (crc == byte)
                    {
                        response = processCommand (data);
                    }
                    if (response != null)
                    {
                        mainThread.sendMessage (response);
                    }
                    else
                    {
                        mainThread.sendMessage ("unknown");
                    }
                    data = null;
            }
        }
    }
    private static function processCommand (data : Bytes) : L8ResponseBase
    {
        var response : L8ResponseBase = null;
        switch (data.get (0))
        {
            case 0: // OK
                response = new L8ResponseOK ();
            case 2: // Pong
                response = new L8ResponsePong ();
            case 71: // Voltage
                response = new L8ResponseVoltage ();
            case 73: // Voltage
                response = new L8ResponseTemperature ();
            case 77:
                response = new L8ResponseAccelerator ();
            case 79: // UID
                response = new L8ResponseUID ();
            case 81:
                response = new L8ResponseAmbientLight ();
            case 83:
                response = new L8ResponseProximity ();
            case 97: // Versions
                response = new L8ResponseVersions ();
            case 0x63:
                response = new L8ResponseButton ();
            case 0x65: // 101
                response = new L8ResponseNoise ();
            case 0x67: // 103
                response = new L8ResponseVBUS ();
            case 0x69: // 105
                response = new L8ResponseMCUTemp ();
//            case 116: // delete frame
//                return;
            case 107:
                response = new L8ResponseStoreL8y ();
            case 109:
                response = new L8ResponseFrameGrab ();
            case 113:
                response = new L8ResponseStoreFrame ();
            case 115:
                response = new L8ResponseFrameGrab ();
            case 118: // 0x76
                response = new L8ResponseBatchG ();
            case 120: // 0x78
                response = new L8ResponseStoreAnim ();
            case 122:
                response = new L8ResponseReadAnim ();
            case 132: // trace msg
                response = new L8ResponseTraceMsg ();
            case 139: // orientation
                response = new L8ResponseOrientation ();
            case 141: // NumL8ies
                response = new L8ResponseNumL8ies ();
            case 143: // NumAnims
                response = new L8ResponseNumAnims ();
            case 145: // NumFrames
                response = new L8ResponseNumFrames ();
            case 148:
                response = new L8ResponseNotifyApp ();
            case 150:
                response = new L8ResponseNumNotifyApps ();
            case 156:
                response = new L8ResponseFrameGrab ();
            case 0xA3:
                response = new L8ResponseSensorThresholds ();
            case 167: // notificationsilence
                response = new L8ResponseNotificationSilence ();
            case 255: // Error
                response = new L8ResponseErr ();
            default:
                Sys.println ('Unknown response: ${data.get (0)} - len: ${data.length} - ${data.toHex ()}');
                return null;
        }
        response.parseData (data);
        if (!silent)
        {
            var output : Bool = true;
            if (hex)
            {
                Sys.println (response.toHex ());
                output = false;
            }
            if (csv)
            {
                var lines : Array<String> = response.toCSV (csvHeader);
                for (line in lines)
                {
                    Sys.println (line);
                }
                output = false;
            }
            if (output)
            {
                Sys.println (response);
            }
        }
        return response;
    }
}
