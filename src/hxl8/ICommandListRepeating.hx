package hxl8;

import hxl8.commands.L8CmdBase;

interface ICommandListRepeating extends ICommandList
{
    public function isRepeat () : Bool;
    public function isRepeatForever () : Bool;
    public function getRepeatCount () : Int;
    public function getRepeatDelay () : Int;

//    public function getCommands () : Array<L8CmdBase>;
}
