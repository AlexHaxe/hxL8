package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdSetStoredL8y extends L8CmdBase
{
    private var m_l8y : Int;

    public function new (l8y : String)
    {
        super (110);
        m_l8y = l8y;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (m_l8y);
        return buffer;
    }
}
