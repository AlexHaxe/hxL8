package hxl8.responses;

import haxe.io.Bytes;

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
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ("response;number of l8ties");
        }
        result.push ('$m_cmd;$m_l8iesCount');
        return result;
    }
}
