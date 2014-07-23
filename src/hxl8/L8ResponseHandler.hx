package hxl8;

import hxl8.responses.L8ResponseBase;

class L8ResponseHandler implements IResponseOutput
{
    public var silent : Bool = false;
    public var hex : Bool = false;
    public var csv : Bool = false;
    public var csvHeader : Bool = false;

    public var handled : Int = 0;
    public var expected : Int = 0;
    public var sendFinished : Bool = false;

    public function new ()
    {
    }

    public function setSilent (silent : Bool) : Void
    {
        this.silent = silent;
    }
    public function setHex (hex : Bool) : Void
    {
        this.hex = hex;
        if (hex)
        {
            csv = false;
            csvHeader = false;
        }
    }
    public function setCSV (csv : Bool) : Void
    {
        this.csv = csv;
        if (csv)
        {
            hex = false;
        }
    }
    public function setCSVHeader (csvHeader : Bool) : Void
    {
        this.csvHeader = csvHeader;
        if (csvHeader)
        {
            this.csv = true;
        }
        else
        {
            hex = false;
        }
    }
    public function isPending () : Bool
    {
        return (expected > 0);
    }
    public function isFinished () : Bool
    {
        return !isPending () && sendFinished;
    }

#if nodejs
    public function handleResponse (response : L8ResponseBase) : Array<String>
    {
        handled++;
        expected--;
        if (response == null)
        {
            return [];
        }
        if (!silent)
        {
            var format : PrintFormat = TEXT;

            if (hex)
            {
                format = HEX;
            }
            if (csv)
            {
                if (csvHeader)
                {
                    format = CSV_HEADER;
                }
                else
                {
                    format = CSV;
                }
            }
            return response.print (format);
        }
        return [];
    }
#else
    public function handleResponse (response : L8ResponseBase) : Void
    {
        handled++;
        expected--;
        if (response == null)
        {
            return;
        }
        if (!silent)
        {
            var format : PrintFormat = TEXT;

            if (hex)
            {
                format = HEX;
            }
            if (csv)
            {
                if (csvHeader)
                {
                    format = CSV_HEADER;
                }
                else
                {
                    format = CSV;
                }
            }
            Sys.println (response.print (format).join ("\n"));
        }
    }
#end
}
