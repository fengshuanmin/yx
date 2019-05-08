var VFT={
    vin:function(v){
        var Arr = new Array();
        var Brr = new Array();
        Arr['A'] = 1;
        Arr['B'] = 2;
        Arr['C'] = 3;
        Arr['D'] = 4;
        Arr['E'] = 5;
        Arr['F'] = 6;
        Arr['G'] = 7;
        Arr['H'] = 8;
        Arr['J'] = 1;
        Arr['K'] = 2;
        Arr['L'] = 3;
        Arr['M'] = 4;
        Arr['N'] = 5;
        Arr['P'] = 7;
        Arr['R'] = 9;
        Arr['S'] = 2;
        Arr['T'] = 3;
        Arr['U'] = 4;
        Arr['V'] = 5;
        Arr['W'] = 6;
        Arr['X'] = 7;
        Arr['Y'] = 8;
        Arr['Z'] = 9;
        Arr['1'] = 1;
        Arr['2'] = 2;
        Arr['3'] = 3;
        Arr['4'] = 4;
        Arr['5'] = 5;
        Arr['6'] = 6;
        Arr['7'] = 7;
        Arr['8'] = 8;
        Arr['9'] = 9;
        Arr['0'] = 0;
        Brr[1]=8;
        Brr[2]=7;
        Brr[3]=6;
        Brr[4]=5;
        Brr[5]=4;
        Brr[6]=3;
        Brr[7]=2;
        Brr[8]=10;
        Brr[9]=0;
        Brr[10]=9;
        Brr[11]=8;
        Brr[12]=7;
        Brr[13]=6;
        Brr[14]=5;
        Brr[15]=4;
        Brr[16]=3;
        Brr[17]=2;
        function getCheckCode(sVIN)
        {
            var sKYZF="ABCDEFGHJKLMNPRSTUVWXYZ1234567890";
            var sJYW ='';
            var bl = false;
            var blKYZF = false;
            if (sVIN.length == 17)
            {
                var iJQS=0,intTemp=0,ht = Arr,htZM = Brr;
                try
                {
                    for (var i = 0; i <sVIN.length; i++)
                    {
                        if (sKYZF.indexOf(sVIN.substr(i, 1)) != -1)
                        {
                            blKYZF = true;
                            iJQS = iJQS + parseInt(ht[sVIN.substr(i, 1)]) * parseInt(htZM[(i + 1)]);
                        }
                        else
                        {
                            blKYZF = false;
                            break;
                        }
                    }
                    if (blKYZF)
                    {
                        intTemp = iJQS%11;
                        if (intTemp == 10)
                        {
                            sJYW = "X";
                        }
                        else
                        {
                            sJYW = intTemp.toString();
                        }
                        if (sJYW == sVIN.substr(8, 1)) bl = true;
                    }
                    else
                    {
                        bl = false;
                    }
                }
                catch(err)
                {
                    bl = false;
                }
            }
            return bl;
        }
        return getCheckCode(v)
    }
}
export default VFT