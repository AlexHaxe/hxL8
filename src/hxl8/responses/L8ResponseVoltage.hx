package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseVoltage extends L8ResponseBase
{
    private var m_voltage : Int;
    private var m_percent : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length != 4)
        {
            m_voltage = 0;
            m_percent = 0;
            return;
        }

        m_voltage = data.get (1) << 8 | data.get (2);
        m_percent = data.get (3);
    }
    override public function toString () : String
    {
        return 'Voltage: ${m_voltage}mV - $m_percent%';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ("response;ibattery voltage;percent");
        }
        result.push ('$m_cmd;$m_voltage;$m_percent');
        return result;
    }
}
