package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseStoreAnim extends L8ResponseBase
{
    private var m_anim : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length == 2)
        {
            m_anim = data.get (1);
        }
    }
    override public function toString () : String
    {
        return 'Animation stored as: $m_anim';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ("response;new anim number");
        }
        result.push ('$m_cmd;$m_anim');
        return result;
    }
}
