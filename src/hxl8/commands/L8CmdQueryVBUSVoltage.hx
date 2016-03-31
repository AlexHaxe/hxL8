package hxl8.commands;

class L8CmdQueryVBUSVoltage extends L8CmdBase
{
    public function new ()
    {
        super (0x66);
    }
}