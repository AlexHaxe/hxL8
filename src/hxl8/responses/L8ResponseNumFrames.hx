package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseNumFrames extends L8ResponseBase
{
    private var m_frameCount : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (m_len == 2)
        {
            m_frameCount = data.get (1);
        }
    }
    override public function toString () : String
    {
        return 'Number of Frames (in User Space): $m_frameCount';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ("response;number of frames");
        }
        result.push ('$m_cmd;$m_frameCount');
        return result;
    }
}
