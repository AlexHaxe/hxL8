package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.L8RGB;

class L8CmdStoreFrame extends L8CmdBase
{
    private var m_rgbs : Array<L8RGB>;

    public function new (rgbs : Array<L8RGB>)
    {
        super (112);
        m_rgbs = rgbs;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        for (rgb in m_rgbs)
        {
            buffer.addByte (rgb.getB () & 15);
            buffer.addByte (((rgb.getG () << 4) & 240) | (rgb.getR () & 15));
        }
        return buffer;
    }
}
