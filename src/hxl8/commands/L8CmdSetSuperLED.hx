package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.L8RGB;

class L8CmdSetSuperLED extends L8CmdBase
{
    private var m_rgb : L8RGB;

    public function new (rgb : L8RGB)
    {
        super (0x4B);
        m_rgb = rgb;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (m_rgb.getB ());
        buffer.addByte (m_rgb.getG ());
        buffer.addByte (m_rgb.getR ());
        return buffer;
    }
}
