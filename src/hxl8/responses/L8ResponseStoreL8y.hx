package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseStoreL8y extends L8ResponseBase
{
    private var m_l8y : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length == 2)
        {
            m_l8y = data.get (1);
        }
    }
    override public function toString () : String
    {
        return 'L8y stored as: $m_l8y';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;new l8y number');
        }
        result.push ('$m_cmd;$m_l8y');
        return result;
    }
}
