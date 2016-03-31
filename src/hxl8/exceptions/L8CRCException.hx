package hxl8.exceptions;

class L8CRCException extends L8Exception
{
    public function new (code : Int, message : String)
    {
        super (code, message);
    }
    override public function toString () : String
    {
        return 'CRC-Error [$m_code] $m_message';
    }
}