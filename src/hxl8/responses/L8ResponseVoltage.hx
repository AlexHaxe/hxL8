package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxSerial.Serial;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

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
        return 'Voltage: $m_voltage - $m_percent%';
    }
}