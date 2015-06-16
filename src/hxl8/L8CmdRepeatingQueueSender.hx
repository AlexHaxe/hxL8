package hxl8;

#if nodejs
import js.Node;
import hxl8.nodejs.Serial;
#elseif java
import hxl8.java.Serial;
#elseif cpp
import hxSerial.Serial;
#else
#end

import hxl8.commands.L8CmdBase;

class L8CmdRepeatingQueueSender extends L8CmdQueueSender
{
    private var repeatForever : Bool;
    private var repeatsCount : Int;
    private var currentIndex : Int;

    public function new (serial : Serial, commandList : ICommandListRepeating, responseHandler : L8ResponseHandler)
    {
        super (serial, commandList, responseHandler);
        delay = commandList.getRepeatDelay ();
        repeatForever = commandList.isRepeatForever ();
        repeatsCount = commandList.getRepeatCount ();
    }
    override public function start () : Void
    {
        currentIndex = 0;
        super.start ();
    }
#if nodejs
    override private function sendNext () : Void
    {
        if (commands.length <= 0)
        {
            finish ();
            return;
        }
        var command : L8CmdBase = commands [currentIndex];
        command.send (serial);
        if (command.hasResponse ())
        {
            responseHandler.expected++;
        }

        currentIndex++;
        if (currentIndex >= commands.length)
        {
            currentIndex = 0;
            repeatsCount--;
        }
        if (!repeatForever)
        {
            if (repeatsCount <= 0)
            {
                finish ();
                return;
            }
        }
        Node.setTimeout (sendNext, delay);
    }
#elseif (cpp || java)
    override private function sendNext () : Void
    {
        if (delay < 10)
        {
            delay = 10;
        }
        while (true)
        {
            for (command in commands)
            {
                command.send (serial);
                if (command.hasResponse ())
                {
                    responseHandler.expected++;
                }
                Sys.sleep (delay / 1000);
            }
            repeatsCount--;
            if (!repeatForever)
            {
                if (repeatsCount <= 0)
                {
                    return;
                }
            }
        }
    }
#else
#end
}
