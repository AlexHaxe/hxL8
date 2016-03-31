package hxl8.responses;

class L8ResponsePong extends L8ResponseBase
{
    public function new ()
    {
        super ();
    }
    override public function toString () : String
    {
        return 'Pong';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response');
        }
        result.push ('$m_cmd');
        return result;
    }
}