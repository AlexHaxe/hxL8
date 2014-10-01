package hxl8;

import js.Node;

import haxe.io.Bytes;
import haxe.Resource;
import haxe.Template;

import hxl8.nodejs.Serial;

import hxl8.commands.L8CmdBase;
import hxl8.responses.L8ResponseBase;

class L8NodeSrv
{
    private var server : NodeHttpServer = null;
    private var tcpPort : Int;
    private var serialPort : String;

    public function new (tcpPort : Int, serialPort : String)
    {
        this.tcpPort = tcpPort;
        this.serialPort = serialPort;

        server = Node.http.createServer (handleRequest);
        server.listen (this.tcpPort, "0.0.0.0");
    }

    public function handleRequest (req : NodeHttpServerReq, res : NodeHttpServerResp) : Void
    {
        var urlParts = Node.url.parse (req.url, true);
        var rawArgs : Array<String> = urlParts.pathname.split ("/");
        var args : Array<String> = new Array<String> ();
        for (arg in rawArgs)
        {
            args.push (Node.querystring.unescape (arg));
        }

        if (args.length > 0)
        {
            if (args [0] == '')
            {
                args.shift ();
            }
        }

        var responseHandler : L8ResponseHandler = new L8ResponseHandler ();
        var parser : L8CmdParser = new L8CmdParser (args, serialPort, responseHandler);
        if (!parser.hasCommands ())
        {
            showCommandPage (res, parser.getComPort ());
            return;
        }
        res.setHeader ("Content-Type", "text/plain");
        res.writeHead (200);

        Serial.getDeviceList (function (comPorts : Map<String, String>) {
            checkComPortsAndRun (res, parser, responseHandler, comPorts);
        });
    }
    private function checkComPortsAndRun (res : NodeHttpServerResp, parser : L8CmdParser, responseHandler : L8ResponseHandler, comPorts : Map<String, String>)
    {
        var found : Bool = false;
        var requestedComPort : String = parser.getComPort ();
        for (comPort in comPorts.keys ())
        {
            if (comPort == requestedComPort)
            {
                found = true;
                break;
            }
        }
        found = true;

        if (!found)
        {
            showComPorts (res, requestedComPort, comPorts);
            return;
        }

        var serial : Serial = null;
        try
        {
            serial = new Serial (requestedComPort, 9600, true, function (err)  {
                if (err != null)
                {
                    showComPorts (res, requestedComPort, comPorts, err);
                }
            });
        }
        catch (e : Dynamic)
        {
            res.end (Std.string (e));
            return;
        }
        serial.setOpenHandler (function () {
            try
            {
                handleCommands (serial, parser, res, responseHandler);
            }
            catch (e : Dynamic)
            {
                res.end (Std.string (e));
            }
        });
        var output : Array<String> = new Array<String> ();
        var lines : Array<String>;
        serial.setDataHandler (function (data) {
            lines = handleResponse (Bytes.ofData (data), responseHandler);
            for (line in lines)
            {
                output.push (line);
            }
            if (responseHandler.isFinished ())
            {
                res.end (output.join ("\n"));
                // we need to close port outside of callback,
                // since data callback tries to read after callback function
                Node.setTimeout (function () {
                    serial.close ();
                }, 10);
            }
        });
    }
    private function handleResponse (data, responseHandler) : Array<String>
    {
        var response : L8ResponseBase = L8ReceiverBase.processCommand (data.sub (3, data.length - 4));
        return responseHandler.handleResponse (response);
    }
    private function handleCommands (serial : Serial, parser : L8CmdParser, res : NodeHttpServerResp, responseHandler : L8ResponseHandler) : Void
    {
        if (serial == null)
        {
            return;
        }
        var sender : L8CmdQueueSender;
        if (parser.isRepeat ())
        {
            sender = new L8CmdRepeatingQueueSender (serial, parser, responseHandler);
        }
        else
        {
            sender = new L8CmdQueueSender (serial, parser, responseHandler);
        }
        sender.setFinishCallback (function () {
            responseHandler.sendFinished = true;
        });
        sender.start ();
    }

    private function showCommandPage (res : NodeHttpServerResp, comPort : String) : Void
    {
        res.setHeader ("Content-Type", "text/html");
        res.writeHead (200);

        var index : String = Resource.getString ("indexCommands.html");
        var template : Template = new Template (index);

        var context = {
            port: tcpPort,
            serialPort: comPort
        };
        res.end (template.execute (context));
    }

    private function showComPorts (res : NodeHttpServerResp, requestedPort : String, comPorts : Map<String, String>, ?err : String) : Void
    {
        var buf : StringBuf = new StringBuf ();

        if (err != null)
        {
            buf.add (err);
            buf.add ("\n\n");
        }

        buf.add (requestedPort);
        buf.add (" not available\n\n");
        buf.add ("Available serial ports:\n");

        for (comPort in comPorts.keys ())
        {
            var name : String = comPorts.get (comPort);
            buf.add (comPort);
            buf.add (" - ");
            buf.add (name);
            buf.add ("\n");
        }
        res.end (buf.toString ());
    }

    public static function main ()
    {
        var tcpPort : Int = 1818;
        var serialPort : String = null;
        var args : Array<String> = Sys.args ();
        if (args.length > 2)
        {
            tcpPort = Std.parseInt (args[2]);
        }
        if (args.length > 3)
        {
            serialPort = args[3];
        }
        var srv : L8NodeSrv = new L8NodeSrv (tcpPort, serialPort);
    }
}
