package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseButton extends L8ResponseBase
{
    private var m_pressed : Bool;
    
    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length == 2)
        {
            m_pressed = (data.get (1) == 1);
        }
    }
    override public function toString () : String
    {
        if (m_pressed)
        {
            return 'Button pressed';
        }
        else
        {
            return 'Button not pressed';
        }
    }
}