package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdReadAnim extends L8CmdBase
{
    private var m_anim : Int;

    public function new (anim : Int)
    {
        super (121);
        m_anim = anim;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (m_anim);
        return buffer;
    }
}
