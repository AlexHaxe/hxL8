package hxl8;

import sys.FileSystem;

import sys.io.File;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import haxe.Json;

class L8tiesParser
{
    public function new ()
    {
    }

    public function run (fileName : String) : Void
    {
        var data : String = File.getContent (fileName);
        var jsonData : Array<Dynamic> = Json.parse (data);

        for (entry in jsonData)
        {
            Sys.println (entry.title);

            var commandLine : StringBuf = new StringBuf ();

            var frames : Array<Dynamic> = entry.frames;

            if (frames.length == 1)
            {
                commandLine.add ("L8Ctl ");
            }
            else
            {
                commandLine.add ("L8Ctl repeatsilent forever 5 ");
            }
            for (frame in frames)
            {
                commandLine.add (parseImage (frame.image));
                commandLine.add (" ");
            }
            Sys.println (commandLine.toString ());
            Sys.println ("");
        }
    }

    private function parseImage (imageData : String) : String
    {
        var colors : Array<String> = imageData.split ("-");
        while (colors.length > 65)
        {
            colors.pop ();
        }
        var matrix : String = "";
        var superled : String = "";

        var singleColor : String = colors.pop ().substr (-6);
        superled = singleColor.charAt (0) + singleColor.charAt (2) + singleColor.charAt (4);

        for (color in colors)
        {
            singleColor = color.substr (-6);
            matrix += singleColor.charAt (0) + singleColor.charAt (2) + singleColor.charAt (4);
        }
        return 'matrixstring $matrix super $superled';
    }

    public static function main () : Void
    {
        var args : Array<String> = Sys.args();
        var fileName : String;
        if (args.length <= 0)
        {
            Sys.exit (0);
            return;
        }
        fileName = args.shift ();

        var reader : L8tiesParser = new L8tiesParser ();

        reader.run (fileName);
    }
}
