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

        var entries : Array<String> = anim.split (",");

        m_animSequence = [];
        if (entries.length <= 0)
        {
            return;
        }
        if (entries.length % 2 != 0)
        {
            entries.pop ();
        }
        for (entry in entries)
        {
            m_animSequence.push (Std.parseInt (entry));
        }
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
