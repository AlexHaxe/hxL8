package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseAccelerator extends L8ResponseBase
{
    private var m_accX : Float;
    private var m_accY : Float;
    private var m_accZ : Float;
    private var m_facing : Bool;
    private var m_orient : Int;
    private var m_tap : Bool;
    private var m_shake : Bool;

    public function new ()
    {
        super ();
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);
        if (data.length != 8)
        {
            m_accX = 0;
            m_accY = 0;
            m_accZ = 0;
            m_facing = false;
            m_orient = 0;
            m_tap = false;
            m_shake = false;
            return;
        }

        m_accX = data.get (1);
        m_accY = data.get (2);
        m_accZ = data.get (3);
        m_facing = (data.get (4) == 2);
        m_orient = data.get (5);
        m_tap = (data.get (6) == 1);
        m_shake = (data.get (7) == 1);
    }
    override public function toString () : String
    {
        var accX : String = Std.string (m_accX / 32 * 1.5);
        var accY : String = Std.string (m_accY / 32 * 1.5);
        var accZ : String = Std.string (m_accZ / 32 * 1.5);

        var facing : String = if (m_facing)
            {
                "Up";
            }
            else
            {
                "Upside-down";
            }
        var tap : String = if (m_tap)
            {
                "tap";
            }
            else
            {
                "---";
            }
        var shake : String = if (m_shake)
            {
                "shaking";
            }
            else
            {
                "not shaking";
            }
        var orient : String = "";
        switch (m_orient)
        {
            case 1:
                orient = "Up";
            case 2:
                orient = "Down";
            case 5:
                orient = "Right";
            case 6:
                orient = "Left";
            default:
        }

        return 'ACC: X=${accX}g Y=${accY}g Z=${accZ}g facing=$facing orient=$orient tap=$tap shaking=$shake';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ("response;x-axis;y-axis;z-axis;lying info;orientation;tap;shake");
        }
        result.push ('$m_cmd;$m_accX;$m_accY;$m_accZ;$m_facing;$m_orient;$m_tap;$m_shake');
        return result;
    }
}
