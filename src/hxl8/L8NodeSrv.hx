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
    private var serial : Serial = null;

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

        var parser : L8CmdParser = new L8CmdParser (args, serialPort);
        serialPort = parser.comPort;
        if (parser.commands.length <= 0)
        {
            showCommandPage (res);
            return;
        }
        res.setHeader("Content-Type","text/plain");
        res.writeHead(200);

        var responseHandler : L8ResponseHandler = new L8ResponseHandler ();
        responseHandler.setCSV (parser.csv);
        responseHandler.setCSVHeader (parser.csvHeader);
        responseHandler.setHex (parser.hex);
        responseHandler.setSilent (parser.silent);

        var serial : Serial = null;
        try
        {
            serial = new Serial (parser.comPort, 9600, true);
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
                serial.close ();
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
        if (parser.repeat)
        {
            sender = new L8CmdRepeatingQueueSender (serial, parser.commands, parser.repeatsDelay, parser.repeatsCount, parser.repeatForever, responseHandler);
        }
        else
        {
            sender = new L8CmdQueueSender (serial, parser.commands, parser.delay, responseHandler);
        }
        sender.setFinishCallback (function () {
            responseHandler.sendFinished = true;
        });
        sender.start ();
    }

    private function showCommandPage (res : NodeHttpServerResp) : Void
    {
        res.setHeader("Content-Type","text/html");
        res.writeHead(200);

        var index : String = Resource.getString ("indexCommands.html");
        var template : Template = new Template (index);

        var context = {
            port: tcpPort,
            serialPort: serialPort
        };
        res.end (template.execute (context));
    }

    public static function main()
    {
        var tcpPort : Int = 1818;
        var serialPort : String = null;
        var args : Array<String> = Sys.args();
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
