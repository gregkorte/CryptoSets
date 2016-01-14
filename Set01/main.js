var base64Key = [{0 : 'A'}, {1 : 'B'}, {2 : 'C'}, {3 : 'D'}, {4 : 'E'}, {5 : 'F'}, {6 : 'G'}, {7 : 'H'}, {8 : 'I'}, {9 : 'J'}, {10 : 'K'}, {11 : 'L'}, {12 : 'M'}, {13 : 'N'}, {14 : 'O'}, {15 : 'P'}, {16 : 'Q'}, {17 : 'R'}, {18 : 'S'}, {19 : 'T'}, {20 : 'U'}, {21 : 'V'}, {22 : 'W'}, {23 : 'X'}, {24 : 'Y'}, {25 : 'Z'}, {26 : 'a'}, {27 : 'b'}, {28 : 'c'}, {29 : 'd'}, {30 : 'e'}, {31 : 'f'}, {32 : 'g'}, {33 : 'h'}, {34 : 'i'}, {35 : 'j'}, {36 : 'k'}, {37 : 'l'}, {38 : 'm'}, {39 : 'n'}, {40 : 'o'}, {41 : 'p'}, {42 : 'q'}, {43 : 'r'}, {44 : 's'}, {45 : 't'}, {46 : 'u'}, {47 : 'v'}, {48 : 'w'}, {49 : 'x'}, {50 : 'y'}, {51 : 'z'}, {52 : '0'}, {53 : '1'}, {54 : '2'}, {55 : '3'}, {56 : '4'}, {57 : '5'}, {58 : '6'}, {59 : '7'}, {60 : '8'}, {61 : '9'}, {62 : '+'}, {63 : '/'}]

var hexPairs = [];
var hexDecimals = [];
var binaries = [];
var hexSixBitBin = [];
var modifiedHexSixBitBin = [];
var base64Indicies = [];
var base64Values = [];

var hexToBinary = function(inputString){
  for(var i = 0; i < inputString.length; i = i + 2){
    var pair = inputString[i] + inputString[i + 1];
    var parsedHex = parseInt(pair, 16);
    var hexToBin = ((Number(parsedHex))).toString(2)
    hexPairs.push(pair);
    hexDecimals.push(parsedHex);
    binaries.push(String('00000000' + hexToBin).slice(-8));
  }
  var output = document.getElementById("entryOutput");
  output.innerHTML = '<div>Extract hexadecimal pairs: ' + hexPairs + '</div><br />'
                   + '<div>Convert hex to decimals: ' + hexDecimals + '</div><br />'
                   + '<div>Convert decimals to binary: ' + binaries + '</div><br />';
  binToSixBit(binaries);
}

var binToSixBit = function(hexBinaryInput){
  for(var i = 0; i < hexBinaryInput.length; i = i + 3){
    var hexBits = hexBinaryInput[i] + hexBinaryInput[i + 1] + hexBinaryInput[i + 2];
    hexSixBitBin.push(hexBits);
  }
  var output = document.getElementById("sixBitBin");
  output.innerHTML = '<div>Combine converted decimals to 3-byte binary strings: ' + hexSixBitBin + '</div><br />';
  for(var i = 0; i < hexSixBitBin.length; i++){
    var modifiedHexStr = hexSixBitBin[i];
    for(var j = 0; j < modifiedHexStr.length; j = j + 6){
      var modifiedHexBin = modifiedHexStr[j] + modifiedHexStr[j + 1] + modifiedHexStr[j + 2] + modifiedHexStr[j + 3] + modifiedHexStr[j + 4] + modifiedHexStr[j + 5];
      modifiedHexSixBitBin.push(modifiedHexBin);
    }
  }
  var output = document.getElementById("sixBitBin");
  output.innerHTML += '<div>Convert 3-byte binary strings To 6-bit binary strings: ' + modifiedHexSixBitBin + '</div><br />';
  convertTo64(modifiedHexSixBitBin);
}

var convertTo64 = function(modifiedHexSixBitBin){
  for(var i = 0; i < modifiedHexSixBitBin.length; i++){
    var base64Index = parseInt(modifiedHexSixBitBin[i], 2);
    base64Indicies.push(base64Index);
  }
  var output = document.getElementById("sixBitBin");
  output.innerHTML += '<div>Convert 6-bit binary strings to Base64 indicies: ' + base64Indicies + '</div><br />';

  for(var i = 0; i < base64Indicies.length; i++){
    var binCheck = base64Indicies[i];
    for(var key in base64Key){
      if(base64Key.hasOwnProperty(key)){
        if(binCheck == key){
          var convertedBase64Value = base64Key[key];
          base64Values.push(convertedBase64Value[key]);
        }
      }
    }
  }
    var output = document.getElementById("sixBitBin");
    output.innerHTML += '<div>Get Base64 index values: ' + base64Values + '</div><br />';
    var result = base64Values.join('');
    var output = document.getElementById("sixBitBin");
    output.innerHTML += '<div>Stringify Base64 conversion: ' + result + '</div><br />';
}

document.getElementById('button').onclick = function(){
  var input = document.getElementById('hexInput').value;
    hexToBinary(input);
}
// "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"