package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.L8RGB;

class L8CmdStoreNotification extends L8CmdBase
{
    private var m_app : String;
    private var m_rgbs : Array<L8RGB>;
    private var m_super : L8RGB;
    private var m_enabled : Bool;

    public function new (app : String, rgbs : Array<L8RGB>, superLED : L8RGB, enable : Bool)
    {
        super (0x92);

        m_rgbs = rgbs;
        m_app = app.substr (0, 32);
        m_super = superLED;
        m_enabled = enable;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();

        buffer.addByte (m_app.length);
        for (index in 0...m_app.length)
        {
            buffer.addByte (m_app.charCodeAt (index));
        }
        for (rgb in m_rgbs)
        {
            buffer.addByte (rgb.getB () & 15);
            buffer.addByte (((rgb.getG () << 4) & 240) | (rgb.getR () & 15));
        }
        buffer.addByte (m_super.getB ());
        buffer.addByte (m_super.getG ());
        buffer.addByte (m_super.getR ());
        if (m_enabled)
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