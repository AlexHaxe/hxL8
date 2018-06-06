package hxl8.nodejs;

import js.Node;

import haxe.io.BytesData;

typedef SerialCallback = Void -> Void;
@SuppressWarnings("checkstyle:Dynamic")
typedef SerialDataCallback = Dynamic -> Void;
typedef DeviceListCallback = Map<String, String> -> Void;

@SuppressWarnings("checkstyle:Dynamic", "checkstyle:Trace")
class Serial
{
    private var m_serialPort : Dynamic;

    public var portName (default, null) : String;
    public var baud (default, null) : Int;
    public var isSetup (get, null) : Bool;

    private var openHandler : SerialCallback;
    private var dataHandler : SerialDataCallback;
    private var errorHandler : SerialDataCallback;
    private var openErrorHandler : SerialDataCallback;

    public function new (portName : String, ?baud : Int = 9600, ?setupImmediately : Bool = false, openErrorCallback : SerialDataCallback)
    {
        this.isSetup = false;

        this.portName = portName;
        this.baud = baud;
        this.openErrorHandler = openErrorCallback;

        openHandler = null;
        dataHandler = null;
        errorHandler = null;
        openErrorHandler = null;

        if (setupImmediately)
        {
            setup();
        }
    }
    public function setOpenHandler (openHandler : SerialCallback) : Void
    {
        this.openHandler = openHandler;
    }
    public function setDataHandler (dataHandler : SerialDataCallback) : Void
    {
        this.dataHandler = dataHandler;
    }
    public function setErrorHandler (errorHandler : SerialDataCallback) : Void
    {
        this.errorHandler = errorHandler;
    }

    public static function getDeviceList (callback : DeviceListCallback) : Void
    {
        var nodeSerial = Node.require ("serialport");
        nodeSerial.list (function (err, ports : Array<Dynamic>)
            {
                var devices : Map<String, String> = new Map<String, String> ();
                for (port in ports)
                {
                    devices.set (port.comName, port.pnpId);
                }
                if (callback != null)
                {
                    callback (devices);
                }
            });
    }

    public function get_isSetup () : Bool
    {
        if (m_serialPort == null)
        {
            return false;
        }
        return m_serialPort.isOpened ();
    }
    @SuppressWarnings("checkstyle:UnusedLocalVar")
    public function setup () : Bool
    {
        var serialPort = portName;
        var serialBaud = baud;
        var nodeSerial = Node.require ("serialport").SerialPort;
        try
        {
            var err;
            if (openErrorHandler != null)
            {
                err = openErrorHandler;
            }
            else
            {
                err = errorCallback;
            }
            m_serialPort = untyped __js__("new nodeSerial (serialPort, {baudrate: serialBaud}, true, err)");
        }
        catch (e : Dynamic)
        {
            trace (e);
            return false;
        }
        m_serialPort.on ("open", function ()
            {
                if (openHandler != null)
                {
                    openHandler ();
                }
            });
        m_serialPort.on ("data", function (data)
            {
                if (dataHandler != null)
                {
                    dataHandler (data);
                }
            });
        m_serialPort.on ("error", function (error)
            {
                if (errorHandler != null)
                {
                    errorHandler (error);
                }
                else
                {
                    trace (error);
                }
            });

        isSetup = true;
        return true;
    }
    public function writeBytes (buffer : BytesData) : Int
    {
        m_serialPort.write (buffer);
        return buffer.length;
    }

    public function readBytes (length : Int) : BytesData
    {
        return null;
    }

    public function writeByte (byte : Int) : Bool
    {
        return false;
    }

    public function flush (?flushIn : Bool = false, ?flushOut = false) : Void
    {
        // do nothing
    }

    public function close () : Void
    {
        m_serialPort.close (errorCallback);
    }
    private function errorCallback (error) : Void
    {
        if (error != null)
        {
            trace (error);
        }
    }
}
