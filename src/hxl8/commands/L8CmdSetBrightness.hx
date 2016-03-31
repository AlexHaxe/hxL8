package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdSetBrightness extends L8CmdBase
{
    private var m_brightness : Bool;

    public function new (brightness : Bool)
    {
        super (154);
        m_brightness = brightness;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        if (m_brightness)
        {
            // high brightness
            buffer.addByte (0);
        }
        else
        {
            // low brightness
            buffer.addByte (1);
        }
        return buffer;
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}