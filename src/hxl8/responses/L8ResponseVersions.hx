package hxl8.responses;

import haxe.io.Bytes;

class L8ResponseVersions extends L8ResponseBase
{
    private var m_versionLightOS : String;
    private var m_versionHardware : String;
    private var m_versionBootloader : String;
    private var m_versionData : String;

    public function new ()
    {
        super ();
        m_versionLightOS = "???";
        m_versionHardware = "???";
        m_versionBootloader = "???";
        m_versionData = "???";
    }
    override public function parseData (data : Bytes) : Void
    {
        super.parseData (data);

        if (data.length != 10)
        {
            m_versionLightOS = "???";
            m_versionHardware = "???";
            m_versionBootloader = "???";
            m_versionData = "???";
            return;
        }
        m_versionLightOS = data.get (1) + "." + zeroFill (data.get (2)) + "." + zeroFill (data.get (3));
        m_versionHardware = data.get (4) + "." + zeroFill (data.get (5));
        m_versionBootloader = data.get (6) + "." + zeroFill (data.get (7));
        m_versionData = data.get (8) + "." + zeroFill (data.get (9));
    }
    private function zeroFill (value : Int) : String
    {
        return StringTools.lpad (Std.string (value), "0", 2);
    }
    override public function toString () : String
    {
        return 'Versions:\nLightOS: $m_versionLightOS\nHardware: $m_versionHardware\nBooloader: $m_versionBootloader\nData: $m_versionData';
    }
    override public function toCSV (header : Bool = false) : Array<String>
    {
        var result : Array<String> = super.toCSV (header);
        if (header)
        {
            result.push ("response;lightos version;hardware version;bootloader version;data version");
        }
        result.push ('$m_cmd;$m_versionLightOS;$m_versionHardware;$m_versionBootloader;$m_versionData');
        return result;
    }
}
