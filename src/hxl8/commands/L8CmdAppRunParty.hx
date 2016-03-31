package hxl8.commands;

import haxe.io.BytesBuffer;

class L8CmdAppRunParty extends L8CmdAppRun
{
    public function new ()
    {
        super ();
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (1);
        return buffer;
    }
}