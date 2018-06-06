package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdSetOrientation extends L8CmdBase
{
    private var m_orient : Int;

    public function new (orient : String)
    {
        super (0x80);

        switch (orient.toLowerCase ())
        {
            case "up":
                m_orient = 1;
            case "down":
                m_orient = 2;
            case "right":
                m_orient = 5;
            case "left":
                m_orient = 6;
            default:
                m_orient = 1;
        }
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();

        buffer.addByte (m_orient);
        return buffer;
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}
