//function that converts hexa (base-16) -> decimal (base-10)
function h2d(s) {
  function add(x, y) {
    var c = 0,
      r = [];
    var x = x.split("").map(Number);
    var y = y.split("").map(Number);
    while (x.length || y.length) {
      var s = (x.pop() || 0) + (y.pop() || 0) + c;
      r.unshift(s < 10 ? s : s - 10);
      c = s < 10 ? 0 : 1;
    }
    if (c) r.unshift(c);
    return r.join("");
  }

  var dec = "0";
  s.split("").forEach(function (chr) {
    var n = parseInt(chr, 16);
    for (var t = 8; t; t >>= 1) {
      dec = add(dec, dec);
      if (n & t) dec = add(dec, "1");
    }
  });
  return dec;
}

// declare variables here
let decimal;
let modOutput;
let pokeName;

let txid = document.querySelector("#txid");
let pokImg = document.querySelector("#pokeImg");
let description = document.querySelector("#description");
const blockchairURL = "https://blockchair.com/bitcoin-cash/transaction";

txid.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitInput(txid.value);
    txid.value = "";
    // console.log(txid.value)
  }
});

const submitInput = (input) => {
  if (input.length != 64) {
    alert("64 chars needed");
    return;
  }
  decimal = h2d(input);
  modOutput = decimal % 898;
  // console.log(modOutput)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${modOutput}`).then((res) => {
    console.log(res.data);
    pokeName = res.data.name;
    // console.log(res.data.sprites.other['official-artwork'].front_default)
    pokeImg.src = res.data.sprites.other["official-artwork"].front_default;
    description.innerHTML = `The Pokemon for the <a style='color:blue' href='${blockchairURL}/${input}'>${input}</a> txid is: ${pokeName}`;
  });
};

//alternate image source
//pokeImg.src = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokeName}.gif`; has some bugs
