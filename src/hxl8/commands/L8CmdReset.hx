package hxl8.commands;

class L8CmdReset extends L8CmdBase
{
    public function new ()
    {
        super (0x06);
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}
