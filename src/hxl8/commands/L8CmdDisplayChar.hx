package hxl8.commands;

import sys.FileSystem;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

import hxl8.L8RGB;

import hxl8.exceptions.L8SendException;

class L8CmdDisplayChar extends L8CmdBase
{
    private var m_char : String;
    private var m_shift : Int;
    
    public function new (char : String, orient : String, offset : Int)
    {
        super (0x7F);
        
        m_char = char.substr (0, 1);
        if (m_char.length <= 0)
        {
            m_char = "X";
        }
        
        var direction : Int; 
        switch (orient.toLowerCase ())
        {
            case "left":
                direction = 0;
            case "right":
                direction = 1;
            case "up":
                direction = 2;
            case "down":
                direction = 3;
            default:
                direction = 2;
        }
        m_shift = ((direction & 3) << 6) | (offset & 15);
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        
        buffer.addByte (m_char.charCodeAt (0));
        buffer.addByte (m_shift);
        return buffer;  
    }
    override public function hasResponse () : Bool
    {
        return false;
    }
}