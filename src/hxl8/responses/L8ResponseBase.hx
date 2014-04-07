package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxSerial.Serial;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

class L8ResponseBase
{
    private var m_cmd : Int;
    private var m_len : Int;
    private var m_data : Bytes;

    public function new ()
    {
    }
    public function parseData (data : Bytes) : Void
    {
        if (data == null)
        {
            return;
        }
        m_cmd = data.get (0);
        m_len = data.length;
        m_data = data;
    }
    public function toString () : String
    {
        return 'base $m_cmd [$m_len]';
    }
}