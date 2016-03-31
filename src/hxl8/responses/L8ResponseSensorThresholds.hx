package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseSensorThresholds extends L8ResponseBase
{
    private var m_ambMinValue : Int;
    private var m_ambMaxValue : Int;
    private var m_noiseMinValue : Int;
    private var m_noiseMaxValue : Int;
    private var m_proxMinValue : Int;
    private var m_proxMaxValue : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length != 13)
        {
            m_ambMinValue = 0;
            m_ambMaxValue = 0;
            m_noiseMinValue = 0;
            m_noiseMaxValue = 0;
            m_proxMinValue = 0;
            m_proxMaxValue = 0;
            return;
        }

        m_noiseMinValue = data.get (1) << 8 | data.get (2);
        m_noiseMaxValue = data.get (3) << 8 | data.get (4);

        m_proxMinValue = data.get (5) << 8 | data.get (6);
        m_proxMaxValue = data.get (7) << 8 | data.get (8);

        m_ambMinValue = data.get (9) << 8 | data.get (10);
        m_ambMaxValue = data.get (11) << 8 | data.get (12);
    }
    override public function toString () : String
    {
        return 'Thresholds:\nAmbient Light: ${m_ambMinValue} - ${m_ambMaxValue}\n' +
            'Noise: ${m_noiseMinValue} - ${m_noiseMaxValue}\nProximity: ${m_proxMinValue} - ${m_proxMaxValue}';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;noise min;noise max;proximity min;proximity max;ambient min;ambient max');
        }
        result.push ('$m_cmd;$m_noiseMinValue;$m_noiseMaxValue;$m_proxMinValue;$m_proxMaxValue;$m_ambMinValue;$m_ambMaxValue');
        return result;
    }
}