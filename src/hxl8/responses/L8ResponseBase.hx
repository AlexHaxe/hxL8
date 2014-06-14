package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

#if cpp
import hxSerial.Serial;
#elseif java
import hxl8.java.Serial;
#else
fail unsupported
#end

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

enum PrintFormat {
    TEXT;
    CSV;
    CSV_HEADER;
    HEX;
}

class L8ResponseBase
{
    private var m_cmd : Int;
    private var m_len : Int;
    private var m_data : Bytes;

    public function new ()
    {
    }
    public function parseData (data : Bytes) : Void
    {
        if (data == null)
        {
            return;
        }
        m_cmd = data.get (0);
        m_len = data.length;
        m_data = data;
    }
    public function toString () : String
    {
        return 'base $m_cmd [$m_len]';
    }
    public function toCSV (header : Bool = false) : Array<String>
    {
        return new Array<String> ();
    }
    public function toHex () : String
    {
        return m_data.toHex ();
    }
    public function print (format : PrintFormat) : Void
    {
        switch (format)
        {
            case TEXT:
                Sys.println (toString ());
            case HEX:
                Sys.println (toHex ());
            case CSV:
                var lines : Array<String> = toCSV (false);
                for (line in lines)
                {
                    Sys.println (line);
                }
            case CSV_HEADER:
                var lines : Array<String> = toCSV (true);
                for (line in lines)
                {
                    Sys.println (line);
                }
        }
    }
}
