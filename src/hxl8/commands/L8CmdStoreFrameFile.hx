package hxl8.commands;

import sys.FileSystem;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

#if (cpp || neko)
import hxlode.PicoPNG;
#end

import hxl8.exceptions.L8SendException;

class L8CmdStoreFrameFile extends L8CmdBase
{
    private var m_fileName : String;
    private var m_offsetX : Int;
    private var m_offsetY : Int;

    public function new (fileName : String, offsetX : Int = 0, offsetY : Int = 0)
    {
        super (112);
        m_fileName = fileName;
        m_offsetX = offsetX;
        m_offsetY = offsetY;
    }
    override public function getBytes () : BytesBuffer
    {
#if java
        throw new L8SendException (3, "java currently not supported!");
#else
        if (!FileSystem.exists (m_fileName))
        {
            throw new L8SendException (3, "image file not found!");
        }
        var img : Image = PicoPNG.loadFile (m_fileName);

        if ((img.width < 8) || (img.height < 8))
        {
            throw new L8SendException (3, "image too small - needs at least 8x8 pixels!");
        }
        if (m_offsetX + 8 > img.width)
        {
            m_offsetX = img.width - 8;
        }
        if (m_offsetY + 8 > img.height)
        {
            m_offsetY = img.height - 8;
        }

        var buffer : BytesBuffer = super.getBytes ();
        var bytes : Bytes = Bytes.ofData (img.data);
        for (row in 0...8)
        {
            for (col in 0...8)
            {
                var index : Int = (m_offsetY + row) * img.width + m_offsetX + col;
                index *= 4;

                var r : Int = (bytes.get (index) & 240) >> 4;
                var g : Int = (bytes.get (index + 1) & 240) >> 4;
                var b : Int = (bytes.get (index + 2) & 240) >> 4;

                buffer.addByte (b & 15);
                buffer.addByte (((g << 4) & 240) | (r & 15));
            }
        }
        return buffer;
#end
    }
}
