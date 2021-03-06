package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseStoreFrame extends L8ResponseBase
{
    private var m_frame : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length == 2)
        {
            m_frame = data.get (1);
        }
    }
    override public function toString () : String
    {
        return 'Frame stored as: $m_frame';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ("response;new frame number");
        }
        result.push ('$m_cmd;$m_frame');
        return result;
    }
}
