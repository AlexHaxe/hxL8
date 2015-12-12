package hxl8;

import sys.FileSystem;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.Types;

import hxl8.commands.L8CrcCalc;

import hxl8.responses.L8ResponseBase;

import hxl8.L8ReceiverBase;

class L8Receiver extends L8ReceiverBase
{
    public static var silent : Bool = false;
    public static var hex : Bool = false;
    public static var csv : Bool = false;
    public static var csvHeader : Bool = false;
    private var responseHandler : L8ResponseHandler;

    private var mainThread : Thread;

    public function new (serial : Serial, thread : Thread, handler : L8ResponseHandler)
    {
        super (serial);
        mainThread = thread;
        responseHandler = handler;
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
        var handler : L8ResponseHandler = Thread.readMessage (true);

        var receiver : L8Receiver = new L8Receiver (serial, thread, handler);
        receiver.receiveResponseLoop ();
    }

    override public function handleResponse (response : L8ResponseBase) : Void
    {
        responseHandler.handleResponse(response);
    }
}
