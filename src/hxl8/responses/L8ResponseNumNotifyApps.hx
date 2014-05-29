package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseNumNotifyApps extends L8ResponseBase
{
    private var m_appCount : Int;
    
    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (m_len == 2)
        {
            m_appCount = data.get (1);
        }
    }
    override public function toString () : String
    {
        return 'Number of Notify-Apps: $m_appCount';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;number of notify apps');
        }
        result.push ('$m_cmd;$m_appCount');
        return result;
    }
}
