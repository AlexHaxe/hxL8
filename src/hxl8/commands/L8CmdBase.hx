package hxl8.commands;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.Types.Serial;

import hxl8.exceptions.L8SendException;

class L8CmdBase
{
    private var m_cmd : Int;

    public function new (cmd : Int)
    {
        m_cmd = cmd;
    }
    public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = new BytesBuffer ();
        buffer.addByte (m_cmd);
        return buffer;
    }
    public function send (serial : Serial) : Void
    {
        if (serial == null)
        {
            throw new L8SendException (1, "serial is null");
        }
        var bytesBuf : BytesBuffer = getBytes ();
        var data : Bytes = bytesBuf.getBytes ();

        var toSendBuf : BytesBuffer = new BytesBuffer ();
        toSendBuf.addByte (0xAA);
        toSendBuf.addByte (0x55);
        toSendBuf.addByte (data.length);
        toSendBuf.addBytes (data, 0, data.length);
        toSendBuf.addByte (L8CrcCalc.calcCRC (data));

        var sendBytes : Bytes = toSendBuf.getBytes ();

//        trace (sendBytes.toHex ());
#if cpp
        var written : Int = serial.writeBytes (sendBytes.toString ());
#elseif (java || nodejs)
        var written : Int = serial.writeBytes (sendBytes.getData ());
#else
#end
        if (written != sendBytes.length)
        {
            throw new L8SendException (1, "length mismatch: " + written + " != " + sendBytes.length);
        }
    }
    public function hasResponse () : Bool
    {
        return true;
    }
}
