package hxl8.commands;

class L8CmdSetProxThreshold extends L8CmdSetThresholdBase
{
    public function new (min : Int, max : Int)
    {
        super (0xA0, min, max);
    }
}