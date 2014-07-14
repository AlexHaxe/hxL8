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

typedef SendCallback = Void -> Void;

class L8CmdQueueSender
{
    private var serial : Serial;
    private var commands : Array<L8CmdBase>;
    private var finishCallback : SendCallback;
    private var delay : Int;
    private var responseHandler : L8ResponseHandler;

    public function new (serial : Serial, commandList : ICommandList, responseHandler : L8ResponseHandler)
    {
        this.serial = serial;
        this.commands = commandList.getCommands ();
        this.delay = commandList.getDelay ();
        this.responseHandler = responseHandler;
    }
    public function start () : Void
    {
        sendNext ();
    }
#if nodejs
    public function setFinishCallback (finishCallback : SendCallback) : Void
    {
        this.finishCallback = finishCallback;
    }
    private function sendNext () : Void
    {
        if (commands.length <= 0)
        {
            finish ();
            return;
        }
        var command : L8CmdBase = commands.shift ();
        command.send (serial);
        if (command.hasResponse ())
        {
            responseHandler.expected++;
        }
        if (commands.length <= 0)
        {
            finish ();
            return;
        }
        Node.setTimeout (sendNext, delay);
    }
    private function finish () : Void
    {
        if (finishCallback != null)
        {
            finishCallback ();
        }
    }
#elseif (cpp || java)
    private function sendNext () : Void
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
    }
#else
#end
}
