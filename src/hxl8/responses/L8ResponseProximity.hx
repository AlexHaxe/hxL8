package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseProximity extends L8ResponseBase
{
    private var m_proxValue : Int;
    private var m_percent : Int;
    private var m_requestFlag : Bool;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length != 5)
        {
            m_proxValue = 0;
            m_percent = 0;
            m_requestFlag = false;
            return;
        }

        m_proxValue = data.get (1) << 8 | data.get (2);
        m_percent = data.get (3);
        m_requestFlag = (data.get (4) == 0);
    }
    override public function toString () : String
    {
        var msg : String = "";
        if (m_requestFlag)
        {
            msg = "Requested";
        }
        else
        {
            msg = "Notification";
        }
        return 'Proximity: ${m_proxValue} - $m_percent% $msg';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;proximity value;proximity percentage;notification flag');
        }
        result.push ('$m_cmd;$m_proxValue;$m_percent;$m_requestFlag');
        return result;
    }
}