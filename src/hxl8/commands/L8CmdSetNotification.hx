package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdSetNotification extends L8CmdBase
{
    public function new ()
    {
        super (153);
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (2);
        return buffer;   
    }
}