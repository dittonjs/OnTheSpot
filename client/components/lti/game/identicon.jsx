import { useEffect } from "react";

const hashFunction = (value) => {
  let key = 0;
  let tempChar;
  for (var i = 0; i < value.length; i++) {
    tempChar = value.charCodeAt(i);
    key = tempChar + (key << 6) + (key << 16) - key;
  }
  return key;
};

// O     I   M
// C E   C E M CR    CG    CB
// 1 111 1 1 1 11111 11111 11111

export const Identicon = ({ playerLoginId }) => {
  const result = hashFunction(playerLoginId).toString(2);
  console.log(result);
  const bits = result.split('');
  console.log(bits);
  bits.shift(); // remove negative sign
  const oCorner = bits.shift();
  const oEdges = [bits.shift(), bits.shift(), bits.shift()];
  const iCorner = bits.shift();
  const iEdge = bits.shift();
  const middle = bits.shift();
  const red = parseInt([bits.shift(), bits.shift(), bits.shift(), bits.shift(), bits.shift()].join(''), 2) << 3;
  const green = parseInt([bits.shift(), bits.shift(), bits.shift(), bits.shift(), bits.shift()].join(''), 2) << 3;
  const blue = parseInt([bits.shift(), bits.shift(), bits.shift(), bits.shift(), bits.shift()].join(''), 2) << 3;

  const icon = [
    [oCorner, ...oEdges, oCorner],
    [oEdges[2], iCorner, iEdge, iCorner, oEdges[0]],
    [oEdges[1], iEdge, middle, iEdge, oEdges[1]],
    [oEdges[0], iCorner, iEdge, iCorner, oEdges[2]],
    [oCorner, ...[...oEdges].reverse(), oCorner],
  ];


  return (
    <div className="w-96 h-96 flex flex-col">
      {icon.map((row, i) => (
        <div key={`row_${i}`} className="flex-1 flex-row flex">
          {row.map((val, j) => (
            <div
              key={`col_${i}_${j}`}
              className="flex-1"
              style={{ background: val === '1' ? `rgb(${red}, ${green}, ${blue})` : 'white' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
