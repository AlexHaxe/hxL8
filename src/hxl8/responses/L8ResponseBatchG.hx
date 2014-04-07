package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxSerial.Serial;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

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
                msg = " ";
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
}