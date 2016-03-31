package hxl8;

import haxe.io.Bytes;
import haxe.io.BytesBuffer;

import hxl8.Types.Serial;

import hxl8.commands.L8CrcCalc;

import hxl8.responses.L8ResponseBase;
import hxl8.responses.L8ResponseOK;
import hxl8.responses.L8ResponsePong;
import hxl8.responses.L8ResponseVoltage;
import hxl8.responses.L8ResponseTemperature;
import hxl8.responses.L8ResponseAccelerator;
import hxl8.responses.L8ResponseUID;
import hxl8.responses.L8ResponseAmbientLight;
import hxl8.responses.L8ResponseProximity;
import hxl8.responses.L8ResponseVersions;
import hxl8.responses.L8ResponseButton;
import hxl8.responses.L8ResponseNoise;
import hxl8.responses.L8ResponseVBUS;
import hxl8.responses.L8ResponseMCUTemp;
import hxl8.responses.L8ResponseStoreL8y;
import hxl8.responses.L8ResponseFrameGrab;
import hxl8.responses.L8ResponseStoreFrame;
import hxl8.responses.L8ResponseBatchG;
import hxl8.responses.L8ResponseStoreAnim;
import hxl8.responses.L8ResponseReadAnim;
import hxl8.responses.L8ResponseTraceMsg;
import hxl8.responses.L8ResponseOrientation;
import hxl8.responses.L8ResponseNumL8ies;
import hxl8.responses.L8ResponseNumAnims;
import hxl8.responses.L8ResponseNumFrames;
import hxl8.responses.L8ResponseNotifyApp;
import hxl8.responses.L8ResponseNumNotifyApps;
import hxl8.responses.L8ResponseSensorThresholds;
import hxl8.responses.L8ResponseNotificationSilence;
import hxl8.responses.L8ResponseErr;

class L8ReceiverBase
{
    private var serial : Serial;

    public function new (serial : Serial)
    {
        this.serial = serial;
    }

    public function shallClose () : Bool
    {
        return false;
    }
    public function closing () : Void
    {
        // do nothing
    }

#if (cpp || java)
    public function receiveResponseLoop () : Void
    {
        while (true)
        {
            var response : L8ResponseBase = readOneResponse ();
            if(response == null)
            {
                return;
            }
            handleResponse (response);
        }
    }

    public function readOneResponse () : L8ResponseBase
    {
        var status : Int = 0;
        var len : UInt = 0;
        var readIndex : Int = 0;

        var dataBuffer : BytesBuffer = null;
        if (serial == null)
        {
            return null;
        }
        while (true)
        {
            if (serial.available () <= 0)
            {
                Sys.sleep (0.003);
                if (serial.available () <= 0)
                {
                    if (shallClose ())
                    {
                        closing ();
                        return null;
                    }
                }
                continue;
            }
            var rawbyte : UInt = serial.readByte ();
//            trace (rawbyte);
            var byte : Int = rawbyte % 256;
//            trace (byte);
            switch (status)
            {
                case 0:
                    // 0xAA
                    if (byte == 170)
                    {
                        status = 1;
                    }
                case 1:
                    // 0x55
                    if (byte == 85)
                    {
                        status = 2;
                    }
                case 2:
                    len = byte;
                    dataBuffer = new BytesBuffer ();
                    readIndex = 0;
                    status = 3;
                case 3:
                    readIndex++;
                    dataBuffer.addByte (byte);
                    if (readIndex >= len)
                    {
                        status = 4;
                    }
                case 4:
                    var data : Bytes = dataBuffer.getBytes ();

                    var crc : Int = L8CrcCalc.calcCRC (data);
                    status = 0;
                    var response : L8ResponseBase = null;
                    if (crc == byte)
                    {
                        response = processCommand (data);
                    }
                    return response;
                    //handleResponse (response);
                    //data = null;
                    //return true;
            }
        }
    }
#end

    @SuppressWarnings("checkstyle:CyclomaticComplexity")
    public static function processCommand (data : Bytes) : L8ResponseBase
    {
        var response : L8ResponseBase = null;
        switch (data.get (0))
        {
            case 0: // OK
                response = new L8ResponseOK ();
            case 2: // Pong
                response = new L8ResponsePong ();
            case 71: // Voltage
                response = new L8ResponseVoltage ();
            case 73: // Voltage
                response = new L8ResponseTemperature ();
            case 77:
                response = new L8ResponseAccelerator ();
            case 79: // UID
                response = new L8ResponseUID ();
            case 81:
                response = new L8ResponseAmbientLight ();
            case 83:
                response = new L8ResponseProximity ();
            case 97: // Versions
                response = new L8ResponseVersions ();
            case 0x63:
                response = new L8ResponseButton ();
            case 0x65: // 101
                response = new L8ResponseNoise ();
            case 0x67: // 103
                response = new L8ResponseVBUS ();
            case 0x69: // 105
                response = new L8ResponseMCUTemp ();
//            case 116: // delete frame
//                return;
            case 107:
                response = new L8ResponseStoreL8y ();
            case 109:
                response = new L8ResponseFrameGrab ();
            case 113:
                response = new L8ResponseStoreFrame ();
            case 115:
                response = new L8ResponseFrameGrab ();
            case 118: // 0x76
                response = new L8ResponseBatchG ();
            case 120: // 0x78
                response = new L8ResponseStoreAnim ();
            case 122:
                response = new L8ResponseReadAnim ();
            case 132: // trace msg
                response = new L8ResponseTraceMsg ();
            case 139: // orientation
                response = new L8ResponseOrientation ();
            case 141: // NumL8ies
                response = new L8ResponseNumL8ies ();
            case 143: // NumAnims
                response = new L8ResponseNumAnims ();
            case 145: // NumFrames
                response = new L8ResponseNumFrames ();
            case 148:
                response = new L8ResponseNotifyApp ();
            case 150:
                response = new L8ResponseNumNotifyApps ();
            case 156:
                response = new L8ResponseFrameGrab ();
            case 0xA3:
                response = new L8ResponseSensorThresholds ();
            case 167: // notificationsilence
                response = new L8ResponseNotificationSilence ();
            case 255: // Error
                response = new L8ResponseErr ();
            default:
#if (cpp || java)
                Sys.println ('Unknown response: ${data.get (0)} - len: ${data.length} - ${data.toHex ()}');
#end
                return null;
        }
        response.parseData (data);
        return response;
    }
    public function handleResponse (response : L8ResponseBase) : Void
    {
        if (response == null)
        {
            return;
        }
        response.print (TEXT);
    }
}