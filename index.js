const hex = 'dc9104c4935c255d81b8e865c5a224cc2ad41eb1a3a66cc49fae0b52ff162fbf'
const hex2 = '01ab03825462443abd217b73ea0b1e157eb7cb16015d55d2dad48722adca5699'
const hex3 = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

console.log(hex.length)
// const hex3 = parseInt(hex,16)
// console.log(hex3.toLocaleString('fullwide', {useGrouping:false}))

function h2d(s) {

  function add(x, y) {
      var c = 0, r = [];
      var x = x.split('').map(Number);
      var y = y.split('').map(Number);
      while(x.length || y.length) {
          var s = (x.pop() || 0) + (y.pop() || 0) + c;
          r.unshift(s < 10 ? s : s - 10);
          c = s < 10 ? 0 : 1;
      }
      if(c) r.unshift(c);
      return r.join('');
  }

  var dec = '0';
  s.split('').forEach(function(chr) {
      var n = parseInt(chr, 16);
      for(var t = 8; t; t >>= 1) {
          dec = add(dec, dec);
          if(n & t) dec = add(dec, '1');
      }
  });
  return dec;
}

console.log(h2d(hex)%898)
console.log(h2d(hex2)%898)
console.log(h2d(hex3)%898)



//https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif