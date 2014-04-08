package hxl8.commands;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.commands.L8CmdBase;

class L8CmdSetNotification extends L8CmdBase
{
    private var m_app : String;
    private var m_eventType : Int;
    private var m_category : Int;
    
    public function new (app : String, eventType : String, category : Int)
    {
        super (153);

	    m_app = app.substr (0, 32);
	    
	    m_category = category;
	    switch (m_category)
	    {
	        case 0, 255:
	           m_app = "Phone Call";
            case 1:
               m_app = "Phone Call";
            case 2:
               m_app = "WhatsApp";
            case 3:
               m_app = "Facebook";
            case 4:
               m_app = "GMail";
            case 5:
               m_app = "MobileMail";
            case 6:
               m_app = "Tweet";
            case 7:
               m_app = "SMS";
            case 8:
               m_app = "Line";
            case 9:
               m_app = "Instagram";
            case 10:
               m_app = "Hangout";
            case 11:
               m_app = "GooglePlus";
        } 
        
        switch (eventType.toLowerCase ())
        {
            case "on":
                m_eventType = 0;
            case "mod":
                m_eventType = 1;
            case "off":
                m_app = "";
                m_eventType = 2;
            default:
               m_eventType = 0;
        }  
        
    }
    override public function getBytes () : BytesBuffer
    {
        var buffer : BytesBuffer = super.getBytes ();
        buffer.addByte (m_app.length);
        if (m_app.length > 0)
        {
            buffer.add (Bytes.ofString (m_app));
        }
        buffer.addByte (m_eventType);
        buffer.addByte (m_category);
        return buffer;   
    }
}