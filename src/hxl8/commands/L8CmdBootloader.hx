package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdBootloader extends L8CmdBase
{
    public function new ()
    {
        super (0x4A);
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}