package hxl8.commands;

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