package hxl8.java;

import jssc.SerialPort;
import jssc.SerialPortException;

import haxe.io.BytesData;

class Serial
{
    private var m_serialPort : SerialPort;

    public var portName (default, null) : String;
    public var baud (default, null) : Int;
    public var isSetup (get, null) : Bool;

    public function new (portName : String, ?baud : Int = 9600, ?setupImmediately : Bool = false)
    {
        m_serialPort = new SerialPort (portName);

        this.isSetup = false;

        this.portName = portName;
        this.baud = baud;

        if (setupImmediately)
        {
            setup();
        }
    }

    public static function getDeviceList () : Array<String>
    {
        return [];
    }

    public function get_isSetup () : Bool
    {
        try
        {
            if (m_serialPort == null)
            {
                return false;
            }
            return m_serialPort.isOpened ();
        }
        catch (e : SerialPortException)
        {
            return false;
        }
    }
    public function setup () : Bool
    {
        try
        {
            if (!m_serialPort.openPort ())
            {
                return false;
            }
            if (!m_serialPort.setParams (baud, 8, 1, 0))
            {
                return false;
            }
            isSetup = m_serialPort.isOpened ();
            return isSetup;
        }
        catch (e : SerialPortException)
        {
            return false;
        }
    }
    public function writeBytes (buffer : BytesData) : Int
    {
        try
        {
            if (!m_serialPort.writeBytes (buffer))
            {
                return 0;
            }
            return buffer.length;
        }

        catch (e : SerialPortException)
        {
            return 0;
        }
    }

    public function readBytes (length : Int) : BytesData
    {
        try
        {
            return m_serialPort.readBytes (length);
        }
        catch (e : SerialPortException)
        {
            return null;
        }
    }

    public function writeByte (byte : Int) : Bool
    {
        return false;
    }

    public function readByte () : Int
    {
        try
        {
            var data : BytesData = m_serialPort.readBytes (1, 10000);
            return cast (data [0], Int);
        }
        catch (e : SerialPortException)
        {
            // do nothing
        }
        return 0;
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
        try
        {
            m_serialPort.purgePort (flags);
        }
        catch (e : SerialPortException)
        {
            // do nothing
        }
    }

    public function available () : Int
    {
        try
        {
            return m_serialPort.getInputBufferBytesCount ();
        }
        catch (e : SerialPortException)
        {
            return 0;
        }
    }

    public function close () : Int
    {
        try
        {
            if (m_serialPort.closePort ())
            {
                return 1;
            }
        }
        catch (e : SerialPortException)
        {
            // do nothing
        }
        return 0;
    }
}
