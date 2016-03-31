package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdEnableStatusLEDs extends L8CmdBase
{
    private var m_enable : Bool;

    public function new (enable : Bool)
    {
        super (158);
        m_enable = enable;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        if (m_enable)
        {
            buffer.addByte (1);
        }
        else
        {
            buffer.addByte (0);
        }
        return buffer;
    }
}