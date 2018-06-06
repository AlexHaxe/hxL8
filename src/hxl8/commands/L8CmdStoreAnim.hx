package hxl8.commands;

import haxe.io.BytesBuffer;

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
