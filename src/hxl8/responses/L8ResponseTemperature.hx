package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseTemperature extends L8ResponseBase
{
    private var m_temperature : Float;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length != 3)
        {
            m_temperature = 0;
            return;
        }

        m_temperature = (data.get (1) << 8 | data.get (2)) / 10;
    }
    override public function toString () : String
    {
        return 'Temperature: ${m_temperature}°C';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ("response;temperature");
        }
        result.push ('$m_cmd;$m_temperature');
        return result;
    }
}
