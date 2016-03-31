package hxl8.responses;

import haxe.io.Bytes;

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
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;uid');
        }
        result.push ('$m_cmd;$m_UID');
        return result;
    }
}