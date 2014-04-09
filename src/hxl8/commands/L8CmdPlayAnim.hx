package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdPlayAnim extends L8CmdBase
{
    private var m_anim : Int;
    private var m_loop : Bool;
     
    public function new (anim : Int, loop : Bool)
    {
        super (124);
        m_anim = anim;
        m_loop = loop;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (m_anim);
        if (m_loop)
        {
            buffer.addByte (1);
        }
        else
        {
            buffer.addByte (0);
        }
        return buffer;   
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}