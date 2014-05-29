package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponsePong extends L8ResponseBase
{
    public function new ()
    {
        super ();
    }
    override public function toString () : String
    {
        return 'Pong';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response');
        }
        result.push ('$m_cmd');
        return result;
    }
}
