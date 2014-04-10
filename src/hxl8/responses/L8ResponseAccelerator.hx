package hxl8.responses;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CrcCalc;

import hxl8.exceptions.L8SendException;

import hxl8.responses.L8ResponseBase;

class L8ResponseAccelerator extends L8ResponseBase
{
    private var m_accX : Float;
    private var m_accY : Float;
    private var m_accZ : Float;
    private var m_lying : Bool;
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
		    m_lying = false;
		    m_orient = 0;
		    m_tap = false;
		    m_shake = false;
            return;
        }
        
        m_accX = data.get (1);
        m_accY = data.get (2);
        m_accZ = data.get (3);
        m_lying = (data.get (4) == 2);
        m_orient = data.get (5);
        m_tap = (data.get (6) == 1);
        m_shake = (data.get (7) == 1);
    }
    override public function toString () : String
    {
        var accX : String = Std.string (m_accX / 32 * 1.5);
        var accY : String = Std.string (m_accY / 32 * 1.5);
        var accZ : String = Std.string (m_accZ / 32 * 1.5);
        
        var lying : String = (m_lying) ? "Up" : "Upside-down";
        var tap : String = (m_tap) ? "tap" : "---";
        var shake : String = (m_shake) ? "shaking" : "not shaking";
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
        
        return 'ACC: X=${accX}g Y=${accY}g Z=${accZ}g lying=$lying orient=$orient tap=$tap shaking=$shake';
    }
}