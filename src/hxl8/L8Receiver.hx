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
                    if (crc == byte)
                    {
                        processCommand (data);
                    }
                    mainThread.sendMessage ("fertig");
                    data = null;
            }
        }
    }
    private static function processCommand (data : Bytes) : Void
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
            case 79: // UID
                response = new L8ResponseUID ();
            case 97: // Versions
                response = new L8ResponseVersions ();
//            case 116: // delete frame
//                return;
            case 118:
                response = new L8ResponseBatchG ();
            case 132: // trace msg
                response = new L8ResponseTraceMsg ();
            case 139: // orientation
                response = new L8ResponseOrientation ();
            case 150: // notifcationsilence
                response = new L8ResponseNumNotifyApps ();
            case 167: // notifcationsilence
                response = new L8ResponseNotificationSilence ();
            case 255: // Error
                response = new L8ResponseErr ();
            default:
                Sys.println ('Unknown response: ${data.get (0)} - len: ${data.length} - ${data.toHex ()}');
                return;
        }
        response.parseData (data);
        Sys.println (response);
    }
}