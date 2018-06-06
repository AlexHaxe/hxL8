package hxl8;

class L8RGB
{
    private var m_r : Int;
    private var m_g : Int;
    private var m_b : Int;

    public function new (rgb : String, ?r : Null<Int>, ?g : Null<Int>, ?b : Null<Int>)
    {
        m_r = 0;
        m_g = 0;
        m_b = 0;
        if (rgb == null)
        {
            m_r = r;
            m_g = g;
            m_b = b;
            return;
        }
        if (rgb.length == 3)
        {
            m_r = parseDigit (rgb.charAt (0));
            m_g = parseDigit (rgb.charAt (1));
            m_b = parseDigit (rgb.charAt (2));
        }
        if (rgb.length == 6)
        {
            m_r = parseDigit (rgb.charAt (0));
            m_g = parseDigit (rgb.charAt (2));
            m_b = parseDigit (rgb.charAt (4));
        }
    }
    public function getR () : Int
    {
        return m_r;
    }
    public function getG () : Int
    {
        return m_g;
    }
    public function getB () : Int
    {
        return m_b;
    }

    @SuppressWarnings("checkstyle:CyclomaticComplexity")
    private function parseDigit (digit : String) : Int
    {
        switch (digit)
        {
            case "0":
                return 0;
            case "1":
                return 1;
            case "2":
                return 2;
            case "3":
                return 3;
            case "4":
                return 4;
            case "5":
                return 5;
            case "6":
                return 6;
            case "7":
                return 7;
            case "8":
                return 8;
            case "9":
                return 9;
            case "a", "A":
                return 10;
            case "b", "B":
                return 11;
            case "c", "C":
                return 12;
            case "d", "D":
                return 13;
            case "e", "E":
                return 14;
            case "f", "F":
                return 15;
            default:
                return 0;
        }
    }
    public function toString () : String
    {
        return StringTools.hex (m_r, 1) + StringTools.hex (m_g, 1) + StringTools.hex (m_b, 1);
    }
}
