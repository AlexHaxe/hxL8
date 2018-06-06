package hxl8.commands;

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
