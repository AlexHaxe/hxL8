package hxl8.commands;

import sys.FileSystem;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

#if cpp
import hxlode.PicoPNG;
#elseif neko
import hxlode.PicoPNG;
#end

import hxl8.commands.L8CmdBase;

import hxl8.L8RGB;

import hxl8.exceptions.L8SendException;

import hxl8.commands.L8CmdSetMatrixLEDArray;

class L8CmdBox extends L8CmdSetMatrixLEDArray
{
    public function new (left : Int, top : Int, right : Int, bottom : Int, border : L8RGB, fill : L8RGB)
    {
        var rgbs : Array<L8RGB> = new Array<L8RGB> ();
        
        var temp : Int;
        if (left > right)
        {
            temp = left;
            left = right;
            right = temp;
        }
        if (top > bottom)
        {
            temp = bottom;
            bottom = top;
            top = temp;
        }
        for (index in 0...64)
        {
            var row : Int = Std.int (index / 8);
            var col : Int = index % 8;
            
            if ((row == top) || (row == bottom))
            {
                if ((col >= left) && (col <= right))
                {
                    rgbs.push (border);
                    continue;
                }  
            }
            if ((row > top) && (row < bottom))
            {
                if ((col == left) || (col == right))
                {
                    rgbs.push (border);
                    continue;                    
                }
                if ((col > left) && (col < right))
                {
                    rgbs.push (fill);
                    continue;                    
                }
            }
            rgbs.push (new L8RGB ("000"));  
        }
         
        super (rgbs);
    }
}