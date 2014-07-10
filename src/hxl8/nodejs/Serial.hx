package hxl8.nodejs;

import js.Node;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;
import haxe.io.BytesData;

typedef SerialCallback = Void -> Void;
typedef SerialDataCallback = Dynamic -> Void;

class Serial
{
    private var m_serialPort : Dynamic;

    public var portName (default,null) : String;
    public var baud (default,null) : Int;
    public var isSetup (get,null) : Bool;

    private var openHandler : SerialCallback = null;
    private var dataHandler : SerialDataCallback = null;

    public function new (portName : String, ?baud : Int = 9600, ?setupImmediately : Bool = false)
    {
        this.isSetup = false;

        this.portName = portName;
        this.baud = baud;

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

    static public function getDeviceList () : Array<String>
    {
        var nodeSerial = Node.require ("serialport");
        nodeSerial.list (function (err, ports) {
            trace (ports);
        });
        return [];
    }

    public function get_isSetup () : Bool
    {
        if (m_serialPort == null)
        {
            return false;
        }
        return m_serialPort.isOpened ();
    }
    public function setup () : Bool
    {
        var serialPort = portName;
        var serialBaud = baud;
        var nodeSerial = Node.require ("serialport").SerialPort;
        try
        {
            m_serialPort = untyped __js__('new nodeSerial (serialPort, {baudrate: serialBaud})');
        }
        catch (e : Dynamic)
        {
            trace (e);
            return false;
        }
        m_serialPort.on ('open', function () {
            if (openHandler != null)
            {
                openHandler ();
            }
        });
        m_serialPort.on ('data', function (data) {
            if (dataHandler != null)
            {
                dataHandler (data);
            }
        });
        m_serialPort.on ('error', function (data) {
            trace (data);
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
        return m_serialPort.read (length);
    }

    public function writeByte (byte : Int) : Bool
    {
        return false;
    }

    public function readByte () : Int
    {
        var data : BytesData = m_serialPort.readBytes (1, 10000);
        return cast (data [0], Int);
    }

    public function flush (?flushIn : Bool = false, ?flushOut = false) : Void
    {
        var flags : Int = 0;
        if (flushIn)
        {
            flags |= 0x0008;
        }
        if (flushOut)
        {
            flags |= 0x0004;
        }
        m_serialPort.purgePort (flags);
    }

    public function available () : Int
    {
        return m_serialPort.getInputBufferBytesCount ();
    }

    public function close () : Int
    {
//        if (m_serialPort.close ())
        {
            return 1;
        }
        return 0;
    }
}
