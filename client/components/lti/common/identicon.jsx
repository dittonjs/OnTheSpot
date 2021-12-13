const hashFunction = (value) => {
  let key = 0;
  let tempChar;
  for (var i = 0; i < value.length; i++) {
    tempChar = value.charCodeAt(i);
    key = tempChar + (key << 6) + (key << 16) - key;
  }
  return key;
};

//OO       O     I   M
//E  E     C E   C E M CR    CG    CB
//1  11111 1 111 1 1 1 11111 11111 11111

export const Identicon = ({ playerLoginId, size = 320 }) => {
  const result = hashFunction(playerLoginId).toString(2);
  const bits = result.split('');
  bits.shift(); // remove negative sign
  const ooCorner = bits.shift();
  const ooEdges = [bits.shift(), bits.shift(), bits.shift(), bits.shift(), bits.shift()];
  const oCorner = bits.shift();
  const oEdges = [bits.shift(), bits.shift(), bits.shift()];
  const iCorner = bits.shift();
  const iEdge = bits.shift();
  const middle = bits.shift();
  const red = parseInt([bits.shift(), bits.shift(), bits.shift(), bits.shift(), bits.shift()].join(''), 2) << 3;
  const green = parseInt([bits.shift(), bits.shift(), bits.shift(), bits.shift(), bits.shift()].join(''), 2) << 3;
  const blue = parseInt([bits.shift(), bits.shift(), bits.shift(), bits.shift(), bits.shift()].join(''), 2) << 3;

  const icon = [
    [ooCorner, ...[...ooEdges].reverse(), ooCorner],
    [ooEdges[4], oCorner, ...[...oEdges].reverse(), oCorner, ooEdges[0]],
    [ooEdges[3], oEdges[2], iCorner, iEdge, iCorner, oEdges[0], ooEdges[1]],
    [ooEdges[2], oEdges[1], iEdge, middle, iEdge, oEdges[1], ooEdges[2]],
    [ooEdges[1], oEdges[0], iCorner, iEdge, iCorner, oEdges[2], ooEdges[3]],
    [ooEdges[0], oCorner, ...oEdges, oCorner, ooEdges[4]],
    [ooCorner, ...ooEdges, ooCorner],
  ];

  return (
    <div className="flex flex-col" style={{ width: size, height: size }}>
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
