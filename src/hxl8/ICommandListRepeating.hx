package hxl8;

interface ICommandListRepeating extends ICommandList
{
    public function isRepeat () : Bool;
    public function isRepeatForever () : Bool;
    public function getRepeatCount () : Int;
    public function getRepeatDelay () : Int;

//    public function getCommands () : Array<L8CmdBase>;
}
