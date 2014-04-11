package hxl8.commands;

import sys.FileSystem;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

import hxl8.L8RGB;

import hxl8.exceptions.L8SendException;

class L8CmdSetThresholdBase extends L8CmdBase
{
    private var m_min : Int;
    private var m_max : Int;
    
    public function new (cmd : Int, min : Int, max : Int)
    {
        super (cmd);
        
        m_min = min;
        m_max = max;
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte ((m_min >> 8) & 255);
        buffer.addByte (m_min & 255);

        buffer.addByte ((m_max >> 8) & 255);
        buffer.addByte (m_max & 255);
        return buffer;  
    }
}