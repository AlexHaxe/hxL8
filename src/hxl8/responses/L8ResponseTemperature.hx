package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

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
}
