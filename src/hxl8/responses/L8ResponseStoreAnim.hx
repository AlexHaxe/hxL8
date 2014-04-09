package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseStoreAnim extends L8ResponseBase
{
    private var m_anim : Int;
    
    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length == 2)
        {
            m_anim = data.get (1);
        }
    }
    override public function toString () : String
    {
        return 'Animation stored as: $m_anim';
    }
}