package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseTraceMsg extends L8ResponseBase
{
    private var m_type : Int;
    private var m_code : Int;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length == 3)
        {
            m_type = data.get (1);
            m_code = data.get (2);
        }
    }
    @SuppressWarnings("checkstyle:CyclomaticComplexity")
    override public function toString () : String
    {
        var msg : String = "";
        switch (m_type)
        {
            case 1:
                switch (m_code)
                {
                    case 1:
                        return "BT_INIT_OK";
                    case 2:
                        return "ACC_SENSOR_INIT_OK";
                    case 3:
                        return "AMB_SENSOR_INIT_OK";
                    case 16:
                        return "BATTERY_80PERCENT";
                    case 17:
                        return "BATTERY_50PERCENT";
                    case 18:
                        return "BATTERY_30PERCENT";
                    case 19:
                        return "BATTERY_20PERCENT";
                    case 20:
                        return "BATTERY_10PERCENT";
                    case 21:
                        return "BATTERY_05PERCENT";
                    case 22:
                        return "BATTERY_CHARGING";
                    case 23:
                        return "BATTERY_CHARGED";
                    default:
                }
            default:
                switch (m_code)
                {
                    case 1:
                        return "FLASH_WRITE_ERROR";
                    case 2:
                        return "FLASH_READ_ERROR";
                    case 3:
                        return "TEMP_SENSOR_ERROR";
                    case 4:
                        return "MCU_TEMP_SENSOR_ERROR";
                    case 5:
                        return "BATTERY_ERROR";
                    case 6:
                        return "CHARGING_ERROR";
                    case 7:
                        return "BT_INIT_ERROR";
                    case 8:
                        return "ACC_SENSOR_ERROR";
                    case 9:
                        return "AMB_SENSOR_ERROR";
                    case 10:
                        return "NOISE_SENSOR_ERROR";
                    case 11:
                        return "UUID_READ_ERROR";
                    case 255:
                        return "GLOBAL_ERROR";
                }
        }
        return 'TraceMsg: [$m_len/$m_type/$m_code] - $msg';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;type;code');
        }
        result.push ('$m_cmd;$m_type;$m_code');
        return result;
    }
}
