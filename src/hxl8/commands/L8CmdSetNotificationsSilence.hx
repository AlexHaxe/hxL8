package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdSetNotificationsSilence extends L8CmdBase
{
    private var m_silence : Bool;

    public function new (silence : Bool)
    {
        super (165);
        m_silence = silence;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        if (m_silence)
        {
            buffer.addByte (1);
        }
        else
        {
            buffer.addByte (0);
        }
        return buffer;
    }
}
