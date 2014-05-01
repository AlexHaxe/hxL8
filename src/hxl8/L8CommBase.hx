package hxl8;

import sys.FileSystem;

#if cpp
import cpp.vm.Thread;

// force static compile
import hxcpp.StaticStd;
#elseif java
import java.vm.Thread;
#else
fail - unsupported
#end

#if cpp
import hxSerial.Serial;
#elseif java
import hxl8.java.Serial;
#else
fail - unsupported
#end

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.responses.L8ResponseBase;

class L8CommBase
{
    private var m_thread : Thread;
    
    public function new ()
    {
    }

    public function setup (comPort : String, startThread : Bool = false) : Serial
    {
//	    if (!FileSystem.exists (comPort))
//	    {
//	        trace ("COM-Port does not exist " + comPort);
//	        Sys.exit (-1);
//	        return null;
//	    }
        
        if (comPort == null)
        {
            Sys.println ("no COM-port specified");
			Sys.exit (-1);
			return null;
        }
        if (StringTools.startsWith (comPort.toUpperCase (), "COM"))
        {
            comPort = "\\\\.\\" + comPort;
        }
        
        var found : Bool = false;
        var devices : Array<String> = Serial.getDeviceList ();
        for (device in devices)
        {
            if (comPort == device)
            {
                found = true;
                break;
            }
        }
			
        var serialFile : Serial = new Serial (comPort, 19200, true);
        if (!serialFile.isSetup)
        {
            Sys.println ('cannot open COM-Port $comPort');
	        if (!found)
	        {
	            Sys.println ('\navailable COM-Ports:');    
		        for (device in devices)
		        {
                    Sys.println ('\t$device');
		        }                	            
	        }
            Sys.exit (-1);
            return null;
        }        
        
        if (startThread)
        {
	        m_thread = Thread.create (L8Receiver.receiverThread);
	        m_thread.sendMessage (Thread.current ());
	        m_thread.sendMessage (serialFile);
        }
        return serialFile;
    }
    private function closeConnection (serial : Serial) : Void
    {
        if (m_thread != null)
        {
	        while (true)
	        {
		        var bye : String = Thread.readMessage (false);
	            m_thread.sendMessage ("close");
		        
		        if (bye == null)
		        {
		            continue;
	            }
	            if (bye == "bye")
	            {
	                break;
	            }
	        }   
        }

        serial.close ();
    }
    private function waitForAnswer (serial : Serial, tries : Int) : L8ResponseBase
    {
        while (true)
        {
            tries -= 1;
            if (tries <= 0)
            {
                trace ("timeout waiting for response");
                return null;
            }
            var response : L8ResponseBase = Thread.readMessage (false);
            if (response != null)
            {
                return response;
            }
            Sys.sleep (0.005);
        }
        return null;
    }     
}