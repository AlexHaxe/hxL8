package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdGetNotifyApp extends L8CmdBase
{
    private var m_index : Int;
    private var m_extended : Bool;
    
    public function new (index : Int, extended : Bool)
    {
        super (147);
        m_index = index;
        m_extended = extended;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (m_index);
        if (m_extended)
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