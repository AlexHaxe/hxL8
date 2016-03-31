package hxl8.commands;

class L8CmdPowerOff extends L8CmdBase
{
    public function new ()
    {
        super (157);
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}