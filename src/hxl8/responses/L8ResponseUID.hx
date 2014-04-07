package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseUID extends L8ResponseBase
{
    private var m_UID : String;
      
    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        
        if (data.length != 13)
        {
            m_UID = "???";
            return;
        }
        var rawUID : String = data.toHex ();
        m_UID = rawUID.substr (2, 14) + "-" + rawUID.substr (16);
    }
    override public function toString () : String
    {
        return 'UID: $m_UID';
    }
}