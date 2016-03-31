package hxl8.exceptions;

class L8SendException extends L8Exception
{
    public function new (code : Int, message : String)
    {
        super (code, message);
    }
    override public function toString () : String
    {
        return 'Send-Error [$m_code] $m_message';
    }
}