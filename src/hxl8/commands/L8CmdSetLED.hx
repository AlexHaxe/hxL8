package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.L8RGB;

class L8CmdSetLED extends L8CmdBase
{
    private var m_rgb : L8RGB;
    private var m_x : Int;
    private var m_y : Int;

    public function new (x : Int, y : Int, rgb : L8RGB)
    {
        super (0x43);

        m_x = x;
        m_y = y;
        m_rgb = rgb;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();

        buffer.addByte (m_x);
        buffer.addByte (m_y);
        buffer.addByte (m_rgb.getB () & 15);
        buffer.addByte (m_rgb.getG () & 15);
        buffer.addByte (m_rgb.getR () & 15);
        return buffer;
    }
}