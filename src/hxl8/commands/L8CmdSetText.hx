package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.L8RGB;

class L8CmdSetText extends L8CmdBase
{
    private var m_speed : Int;
    private var m_loop : Bool;
    private var m_rgb : L8RGB;
    private var m_text : String;

    public static inline var MAX_LENGTH : Int = 18;

    public function new (speed : Int, loop : Bool, rgb : L8RGB, text : String)
    {
        super (131);
        switch (speed)
        {
            case 0, 1, 2:
                m_speed = speed;
            default:
                m_speed = 1;
        }
        m_loop = loop;
        m_rgb = rgb;
        m_text = text.substr (0, MAX_LENGTH);
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        if (m_loop)
        {
            buffer.addByte (1);
        }
        else
        {
            buffer.addByte (0);
        }
        buffer.addByte (m_speed);
        buffer.addByte (m_rgb.getR ());
        buffer.addByte (m_rgb.getG ());
        buffer.addByte (m_rgb.getB ());

        for (index in 0...m_text.length)
        {
            buffer.addByte (m_text.charCodeAt (index));
        }
        //buffer.addByte (0);
        return buffer;
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}