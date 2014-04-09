package hxl8.commands;

import sys.FileSystem;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

import hxl8.L8RGB;

import hxl8.exceptions.L8SendException;

class L8CmdStoreAnim extends L8CmdBase
{
    private var m_animSequence : Array<Int>;
    
    public function new (anim : String)
    {
        super (119);
        
        trace (anim);
        var entries : Array<String> = anim.split (",");

        m_animSequence = new Array<Int> ();
trace (entries);        
        if (entries.length <= 0)
        {
            trace ("xx");
            return;
        }
        if (entries.length % 2 != 0)
        {
            trace ("xx2");
            entries.pop ();
        }
        for (entry in entries)
        {
            m_animSequence.push (Std.parseInt (entry));
        }
            trace (m_animSequence);
        
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        
        buffer.addByte (Std.int (m_animSequence.length / 2));

        for (item in m_animSequence)
        {
            buffer.addByte (item);
        }       
        return buffer;  
    }
}