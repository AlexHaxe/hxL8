package hxl8.commands;

class L8CmdSetNoiseThreshold extends L8CmdSetThresholdBase
{
    public function new (min : Int, max : Int)
    {
        super (0x9F, min, max);
    }
}