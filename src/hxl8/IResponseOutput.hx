package hxl8;

interface IResponseOutput
{
    public function setSilent (silent : Bool) : Void;
    public function setHex (hex : Bool) : Void;
    public function setCSV (csv : Bool) : Void;
    public function setCSVHeader (csvHeader : Bool) : Void;
}
