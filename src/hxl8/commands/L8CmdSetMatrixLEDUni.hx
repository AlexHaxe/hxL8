package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

import hxl8.L8RGB;

class L8CmdSetMatrixLEDUni extends L8CmdBase
{
    private var m_rgb : L8RGB;

    public function new (rgb : L8RGB)
    {
        super (0x44);
        m_rgb = rgb;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();

        for (index in 0...64)
        {
            buffer.addByte (m_rgb.getB () & 15);
            buffer.addByte (((m_rgb.getG () << 4) & 240) | (m_rgb.getR () & 15));
        }
        return buffer;
    }
}
