package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdEnableNotification extends L8CmdBase
{
    private var m_index : Int;
    private var m_enable : Bool;

    public function new (index : Int, enable : Bool)
    {
        super (0x97);
        m_index = index;
        m_enable = enable;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (m_index);
//        if (m_enable)
//        {
//            buffer.addByte (1);
//        }
//        else
//        {
//            buffer.addByte (0);
//        }
        return buffer;
    }
}