package hxl8;

#if cpp
import hxcpp.StaticStd;
#end

typedef Serial =
#if cpp
    hxSerial.Serial;
#elseif java
    hxl8.java.Serial;
#elseif nodejs
    hxl8.nodejs.Serial;
#else
{
    // empty implementation
};
#end

typedef Thread =
#if cpp
    cpp.vm.Thread;
#elseif java
    java.vm.Thread;
#elseif nodejs
    Void;
#else
    Void;
#end

#if rpi
typedef UInt = Int;
#end
