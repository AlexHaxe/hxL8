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
import hxl8.responses.L8ResponseBase;

import hxl8.L8ReceiverBase;

class L8Receiver extends L8ReceiverBase
{
    public static var silent : Bool = false;
    public static var hex : Bool = false;
    public static var csv : Bool = false;
    public static var csvHeader : Bool = false;

    private var mainThread : Thread = null;

    public function new (serial : Serial, thread : Thread)
    {
        super (serial);
        mainThread = thread;
    }

    override public function shallClose () : Bool
    {
        var close : String = Thread.readMessage (false);
        if (close == null)
        {
            return false;
        }
        return (close == "close");
    }

    override public function closing () : Void
    {
        if (mainThread == null)
        {
            return;
        }
        mainThread.sendMessage ("bye");
    }

    public static function receiverThread () : Void
    {
        var started : Bool = false;

        var thread : Thread = Thread.readMessage (true);
        var serial : Serial = Thread.readMessage (true);

        var receiver : L8Receiver = new L8Receiver (serial, thread);
        receiver.receiveResponseLoop ();
    }

    override public function handleResponse (response : L8ResponseBase) : Void
    {
        if (response == null)
        {
            return;
        }
        if (!silent)
        {
            var format : PrintFormat = TEXT;

            if (hex)
            {
                format = HEX;
            }
            if (csv)
            {
                if (csvHeader)
                {
                    format = CSV_HEADER;
                }
                else
                {
                    format = CSV;
                }
            }

            response.print (format);
            if (mainThread != null)
            {
                mainThread.sendMessage (response);
            }
        }
    }
}
