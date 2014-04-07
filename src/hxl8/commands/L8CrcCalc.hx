package hxl8.commands;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

class L8CrcCalc
{
    private static var m_table : Bytes;

    public static function calcCRC (bytes : Bytes) : Int
    {
        if (bytes == null)
        {
            return -1;
        }
        if (m_table == null)
        {
            makeTable ();
        }
        var crc : Int = 0;
        for (index in 0...bytes.length)
        {
            var value : Int = bytes.get (index);  
            var tableIndex : Int = crc ^ value;
            if (tableIndex > m_table.length)
            {
                return -1;
            }
            crc = m_table.get (tableIndex);
        }
        return crc;
    }
    private static function makeTable () : Void
    {
        var buffer : BytesBuffer = new BytesBuffer ();
        
        for (index in 0...256)
        {
            var value : Int = index;
            for (index2 in 0...8)
            {
                if ((value & 128) != 0)
                {
                    value = (value << 1) ^ 7;
                }
                else
                {
                    value <<= 1;
                }
            }
//            trace (value & 255);
            buffer.addByte (value & 255);
        }
        m_table = buffer.getBytes ();        
//        trace (m_table.length); 
    } 
}