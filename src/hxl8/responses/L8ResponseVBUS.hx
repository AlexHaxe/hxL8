package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseVBUS extends L8ResponseBase
{
    private var m_vbusValue : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length != 3)
        {
            m_vbusValue = 0;
            return;
        }

        m_vbusValue = data.get (1) << 8 | data.get (2);
    }
    override public function toString () : String
    {
        return 'USB voltage: ${m_vbusValue}mV';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;usb voltage');
        }
        result.push ('$m_cmd;$m_vbusValue');
        return result;
    }
}
