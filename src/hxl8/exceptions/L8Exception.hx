package hxl8.exceptions;

class L8Exception
{
    private var m_code : Int;
    private var m_message : String;

    public function new (code : Int, message : String)
    {
        m_code = code;
        m_message = message;
    }
    public function getCode () : Int
    {
        return m_code;
    }
    public function getMessage () : String
    {
        return m_message;
    }
    public function toString () : String
    {
        return '[$m_code] $m_message';
    }
}