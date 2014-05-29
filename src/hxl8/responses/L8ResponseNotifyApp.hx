package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseNotifyApp extends L8ResponseBase
{
    private var m_app : String;
    private var m_length : Int;
    private var m_rgbs : Array<L8RGB>;
    private var m_super : L8RGB;
    private var m_enabled : Bool;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);

        m_rgbs = new Array<L8RGB> ();
        m_app = "invalid";
        m_super = new L8RGB ("000");
        m_enabled = false;

        if (m_len > 129)
        {
            var len : Int = data.get (1);
            m_length = len;

            if (m_len < (len + 1 + 128 + 2 + 1))
            {
                return;
            }

            m_app = "";
            if (len > 0)
            {
                m_app = data.readString (2, len);
            }
            var offset : Int = 2 + len;
            var r : Int;
            var g : Int;
            var b : Int;
            for (index in 0...64)
            {
                b = data.get (index * 2 + offset);
                g = data.get (index * 2 + offset + 1);
                r = g & 15;
                g = (g & 240) >> 4;

                m_rgbs.push (new L8RGB (null, r, g, b));
            }
            offset += 128;
            b = data.get (offset) & 15;
            g = data.get (offset + 1) & 15;
            r = data.get (offset + 2) & 15;
            m_super = new L8RGB (null, r, g, b);

            offset += 3;
            if (data.get (offset) == 1)
            {
                m_enabled = true;
            }
        }
    }
    override public function toString () : String
    {
        var buffer : StringBuf = new StringBuf ();
        var buffer2 : StringBuf = new StringBuf ();

        buffer.add ('Name: $m_app\n');
        buffer.add ('Matrix:\n');
        var index : Int = 0;
        for (rgb in m_rgbs)
        {
            buffer.add (rgb.toString ());
            buffer2.add (rgb.toString ());
            buffer.add (" ");
            index++;
            if (index % 8 == 0)
            {
                buffer.add ("\n");
            }
        }
        buffer.add ("\n");
        buffer.add (buffer2.toString ());
        buffer.add ("\n");
        buffer.add ('Super: ${m_super.toString ()}\n');
        buffer.add ('Enabled: $m_enabled');
        return buffer.toString ();
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            var headerText : StringBuf = new StringBuf ();
            headerText.add ('response;length of app string;app string');
            var index : Int = 0;
            for (rgb in m_rgbs)
            {
                headerText.add (';RGB $index');
                index++;
            }
            headerText.add (";super led RGB;enable flag");
            result.push (headerText.toString ());
        }
        var dataText : StringBuf = new StringBuf ();
        dataText.add (m_cmd);
        dataText.add (";");
        dataText.add (m_length);
        dataText.add (";");
        dataText.add (m_app);
        for (rgb in m_rgbs)
        {
           dataText.add (";");
           dataText.add (rgb.toString ());
        }
        dataText.add (";");
        dataText.add (m_super.toString ());
        dataText.add (";");
        dataText.add (m_enabled);
        result.push (dataText.toString ());
        return result;
    }
}
