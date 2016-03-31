package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdDeleteFrame extends L8CmdBase
{
    private var m_frame : Int;

    public function new (frame : Int)
    {
        super (116);
        m_frame = frame;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (m_frame);
        return buffer;
    }
}