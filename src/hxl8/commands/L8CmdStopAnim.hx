package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdStopAnim extends L8CmdBase
{
    public function new ()
    {
        super (125);
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}