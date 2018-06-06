package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdEnableAllNotifications extends L8CmdBase
{
    private var m_all : Bool;

    public function new (all : Bool)
    {
        super (164);
        m_all = all;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        if (m_all)
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
