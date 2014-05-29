package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseNumAnims extends L8ResponseBase
{
    private var m_animCount : Int;
    
    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (m_len == 2)
        {
            m_animCount = data.get (1);
        }
    }
    override public function toString () : String
    {
        return 'Number of Anims (in User Space): $m_animCount';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ('response;number of animations');
        }
        result.push ('$m_cmd;$m_animCount');
        return result;
    }
}
