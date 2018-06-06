package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdSetThresholdBase extends L8CmdBase
{
    private var m_min : Int;
    private var m_max : Int;

    public function new (cmd : Int, min : Int, max : Int)
    {
        super (cmd);

        m_min = min;
        m_max = max;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte ((m_min >> 8) & 255);
        buffer.addByte (m_min & 255);

        buffer.addByte ((m_max >> 8) & 255);
        buffer.addByte (m_max & 255);
        return buffer;
    }
}
