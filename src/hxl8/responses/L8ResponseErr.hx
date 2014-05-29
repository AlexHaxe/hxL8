package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseErr extends L8ResponseBase
{
    private var m_code : Int = -1;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length == 2)
        {
            m_code = data.get (1);
        }
    }
    override public function toString () : String
    {
        switch (m_code)
        {
            case 130:
                return "Error: no app running";
        }
        return 'Error $m_code';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;error code');
        }
        result.push ('$m_cmd;$m_code');
        return result;
    }
}
