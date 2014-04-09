package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseNumL8ies extends L8ResponseBase
{
    private var m_l8iesCount : Int;
    
    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (m_len == 2)
        {
            m_l8iesCount = data.get (1);
        }
    }
    override public function toString () : String
    {
        return 'Number of L8ies (in User Space): $m_l8iesCount';
    }
}