package hxl8.responses;

import haxe.io.Bytes;

typedef AnimFrame = {
    var frame : Int;
    var delay : Int;
}

class L8ResponseReadAnim extends L8ResponseBase
{
    private var m_frames : Array<AnimFrame>;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        m_frames = [];
        if (data.length < 4)
        {
            return;
        }
        var len : Int = data.get (1);
        for (index in 0...len)
        {
            var frame : Int = data.get (index * 2 + 2);
            var delay : Int = data.get (index * 2 + 2 + 1);
            m_frames.push ({frame : frame, delay : delay});
        }
    }
    override public function toString () : String
    {
        var buffer : StringBuf = new StringBuf ();
        var buffer2 : StringBuf = new StringBuf ();

        var first : Bool = true;
        for (animFrame in m_frames)
        {
            var seconds : Float = animFrame.delay / 10;
            buffer.add ('${animFrame.frame} - ${seconds}s\n');
            if (!first)
            {
                buffer2.add (",");
            }
            first = false;
            buffer2.add ('${animFrame.frame},${animFrame.delay}');
        }
        buffer.add ("\n");
        buffer.add (buffer2.toString ());
        return buffer.toString ();
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            var headerText : StringBuf = new StringBuf ();
            headerText.add ('response');
            var index : Int = 0;
            for (frame in m_frames)
            {
                headerText.add (';index $index;delay $index');
                index++;
            }
            result.push (headerText.toString ());
        }
        var dataText : StringBuf = new StringBuf ();
        dataText.add (m_cmd);
        for (frame in m_frames)
        {
           dataText.add (";");
           dataText.add (frame.frame);
           dataText.add (";");
           dataText.add (frame.delay);
        }
        result.push (dataText.toString ());
        return result;
    }
}