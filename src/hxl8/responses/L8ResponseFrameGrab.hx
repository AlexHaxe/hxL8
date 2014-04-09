package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseFrameGrab extends L8ResponseBase
{
    private var m_rgbs : Array<L8RGB>;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        m_rgbs = new Array<L8RGB> ();
        if (data.length == 129)
        {
            for (index in 0...64)
            {
                var r : Int;
                var g : Int;
                var b : Int;
                
                b = data.get (index * 2 + 1);
                g = data.get (index * 2 + 2);
                r = g & 15;
                g = (g & 240) >> 4;
                
                m_rgbs.push (new L8RGB (null, r, g, b));
            }
        }
    }
    override public function toString () : String
    {
        var buffer : StringBuf = new StringBuf ();
        var buffer2 : StringBuf = new StringBuf ();
        
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
        return buffer.toString ();
    }
}