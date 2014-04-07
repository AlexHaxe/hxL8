package jssc;

import haxe.io.Bytes;
import haxe.io.BytesData;

extern class SerialPort
{
    public function new (portName : String); 

    public function getPortName () : String;
    public function isOpened () : Bool;
    public function openPort () : Bool;

    @:overload(function (baudRate : Int, dataBits : Int, stopBits : Int, parity : Int) : Bool {})
    public function setParams (baudRate : Int, dataBits : Int, stopBits : Int, parity : Int, setRTS : Bool, setDTR : Bool) : Bool;
    public function purgePort (flags : Int) : Bool;
    public function setEventsMask (mask : Int) : Bool;
    public function getEventsMask () : Int;
    private function getLinuxMask () : Int;
    public function setRTS (enabled : Bool) : Bool;
    public function setDTR (enabled : Bool) : Bool;
    public function writeBytes (buffer : BytesData) : Bool;
    public function writeByte (singleByte : Int) : Bool;
    public function writeString (string : String) : Bool;
    public function writeInt (singleInt : Int) : Bool;
    public function writeIntArray (buffer : Array<Int>) : Bool;

    @:overload(function () : BytesData {})
    @:overload(function (byteCount : Int) : BytesData {})
    public function readBytes (byteCount : Int, timeout : Int) : BytesData;

    @:overload(function () : String {})
    @:overload(function (byteCount : Int) : String {})
    public function readString (byteCount : Int, timeout : Int) : String;

    @:overload(function () : String {})
    @:overload(function (byteCount : Int) : String {})
    @:overload(function (separator : String) : String {})
    @:overload(function (byteCount : Int, timeout : Int) : String {})
    @:overload(function (byteCount : Int, separator : String) : String {})
    public function readHexString (byteCount : Int, separator : String, timeout : Int) : String;

//    private waitBytesWithTimeout (methodName : String, byteCount, timeout) : Void;

    @:overload(function () : Array<String> {})
    @:overload(function (byteCount : Int) : Array<String> {})
    public function readHexStringArray (byteCount : Int, timeout : Int) : Array<String>;

    @:overload(function () : Array<Int> {})
    @:overload(function (byteCount : Int) : Array<Int> {})
    public function readIntArray (byteCount : Int, timeout : Int) : Array<Int>;
    
    public function getInputBufferBytesCount () : Int;
    public function getOutputBufferBytesCount () : Int;
    public function setFlowControlMode (mask : Int) : Bool;
    public function getFlowControlMode () : Int;
    public function sendBreak (duration : Int) : Bool;
//    private int[][] waitEvents ();
    private function checkPortOpened (methodName : String) : Void;
    public function getLinesStatus () : Array<Int>;
    public function isCTS () : Bool;
    public function isDSR () : Bool;
    public function isRING () : Bool;
    public function isRLSD () : Bool;
//    public function addEventListener (SerialPortEventListener listener) : Void;
//    public function addEventListener (SerialPortEventListener listener, mask) : Void;
//    private addEventListener (SerialPortEventListener listener, mask, boolean overwriteMask) : Void;
//    private EventThread getNewEventThread ();
    public function removeEventListener () : Bool;
    public function closePort () : Bool;
}