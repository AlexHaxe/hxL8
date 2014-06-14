package hxl8.commands;

import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

import hxl8.L8RGB;

class L8CmdAppRunAmbient extends L8CmdAppRun
{
    private var m_matrixRGB : L8RGB;
    private var m_superRGB : L8RGB;
    private var m_threshold : Int;

    public function new (matrixRGB : L8RGB, superRGB : L8RGB, threshold : Int)
    {
        super ();
        m_matrixRGB = matrixRGB;
        m_superRGB = superRGB;
        m_threshold = threshold;
        if (m_threshold < 0)
        {
            m_threshold = 0;
        }
        if (m_threshold > 100)
        {
            m_threshold = 100;
        }
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (3);
        buffer.addByte (m_matrixRGB.getB ());
        buffer.addByte (m_matrixRGB.getG ());
        buffer.addByte (m_matrixRGB.getR ());
        buffer.addByte (m_superRGB.getB ());
        buffer.addByte (m_superRGB.getG ());
        buffer.addByte (m_superRGB.getR ());
        buffer.addByte (m_threshold);
        buffer.addByte (1);
        return buffer;
    }
}
