package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseOrientation extends L8ResponseBase
{
    private var m_orient : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (m_len == 2)
        {
            m_orient = data.get (1);
        }
    }
    override public function toString () : String
    {
        var msg : String = "---";
        switch (m_orient)
        {
            case 1:
                msg = "Up";
            case 2:
                msg = "Down";
            case 5:
                msg = "Right";
            case 6:
                msg = "Left";
            default:
        }
        return 'Orientation change: $msg';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;orientation');
        }
        result.push ('$m_cmd;$m_orient');
        return result;
    }
}
