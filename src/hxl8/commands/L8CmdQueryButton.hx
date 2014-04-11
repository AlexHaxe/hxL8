package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdQueryButton extends L8CmdBase
{
    public function new ()
    {
        super (0x62);
    }
}