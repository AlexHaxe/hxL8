package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

import hxl8.L8RGB;

class L8CmdAppRunDice extends L8CmdAppRun
{
    private var m_rgb : L8RGB;

    public function new (rgb : L8RGB)
    {
        super ();
        m_rgb = rgb;
     }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (0);
        buffer.addByte (m_rgb.getB ());
        buffer.addByte (m_rgb.getG ());
        buffer.addByte (m_rgb.getR ());
        return buffer;
    }
}
