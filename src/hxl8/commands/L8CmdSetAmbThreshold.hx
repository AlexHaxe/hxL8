package hxl8.commands;

class L8CmdSetAmbThreshold extends L8CmdSetThresholdBase
{
    public function new (min : Int, max : Int)
    {
        super (0xA1, min, max);
    }
}