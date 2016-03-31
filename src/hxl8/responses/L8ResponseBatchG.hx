package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseBatchG extends L8ResponseBase
{
    private var m_charge : Int;
    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (m_len == 2)
        {
            m_charge = data.get (1);
        }
    }
    override public function toString () : String
    {
        var msg : String = "";
        switch (m_charge)
        {
            case 6, 7, 15:
                msg = "Stand-by (not charging)";
            case 8, 9, 11, 13:
                msg = "";
            case 10:
                msg = "Charging";
            case 12:
                msg = "Charge Complete";
            case 14:
                msg = "Charge Fault";
        }
        return 'Battery Charge: $msg';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;charging status');
        }
        result.push ('$m_cmd;$m_charge');
        return result;
    }
}