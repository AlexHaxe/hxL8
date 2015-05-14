package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdClearRGBMatrix extends L8CmdBase
{
    private var m_fadeOut : Bool;

    public function new (fadeOut : Bool = false)
    {
        super (69);
        m_fadeOut = fadeOut;
    }
    override public function getLength () : Int
    {
        return 2;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        if (m_fadeOut)
        {
            buffer.add (1);
        }
        else
        {
            buffer.add (0);
        }
        return buffer;
    }
}
