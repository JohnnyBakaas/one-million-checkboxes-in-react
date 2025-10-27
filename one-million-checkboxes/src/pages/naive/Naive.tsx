// I left this in just for fun.
// Don’t run this code;
// it will probably crash your browser :)

function Naive() {
  const arr = new Array(1_000_000).fill(false);

  return (
    <div>
      {arr.map((_state, index) => (
        <input key={index} type="checkbox" />
      ))}
    </div>
  );
}

export default Naive;
