package hxl8;

import hxl8.commands.L8CmdBase;

interface ICommandList
{
    public function getDelay () : Int;

    public function hasCommands () : Bool;
    public function getCommands () : Array<L8CmdBase>;
}
