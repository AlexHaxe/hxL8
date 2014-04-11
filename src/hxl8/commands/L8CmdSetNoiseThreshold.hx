package hxl8.commands;

import sys.FileSystem;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

import hxl8.L8RGB;

import hxl8.exceptions.L8SendException;

class L8CmdSetNoiseThreshold extends L8CmdSetThresholdBase
{
    public function new (min : Int, max : Int)
    {
        super (0x9F, min, max);
    }
}