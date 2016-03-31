package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseButton extends L8ResponseBase
{
    private var m_pressed : Bool;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length == 2)
        {
            m_pressed = (data.get (1) == 1);
        }
    }
    override public function toString () : String
    {
        if (m_pressed)
        {
            return 'Button pressed';
        }
        else
        {
            return 'Button not pressed';
        }
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;button status');
        }
        result.push ('$m_cmd;$m_pressed');
        return result;
    }
}