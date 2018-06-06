package jssc;

extern class SerialPortException
{
    public function new (portName : String, methodName : String, exceptionType : String);
    public function getPortName () : String;
    public function getMethodName () : String;
    public function getExceptionType () : String;
}
