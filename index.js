function esPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
  }
  return true;
}

function mcd(a, b) {
  let r;
  while (b > 0) {
      r = a % b;
      a = b;
      b = r;
  }
  return a;
}

function encontrarE(phi) {
  let e = 2;
  while (e < phi) {
      if (mcd(e, phi) === 1) {
          break;
      }
      e++;
  }
  return e;
}

function encontrarD(e, phi) {
  let t1 = 0;
  let t2 = 1;
  let r1 = phi;
  let r2 = e;
  let t;

  while (r2 !== 0) {
    const q = Math.floor(r1 / r2);
    t = t1 - q * t2;
    t1 = t2;
    t2 = t;
    const r = r1 - q * r2;
    r1 = r2;
    r2 = r;
  }

  if (r1 > 1) {
    return undefined; 
  }

  if (t1 < 0) {
    t1 += phi;
  }

  return t1;
}


function encriptarRSA(mensaje, p, q) {
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const e = encontrarE(phi);
  const d = encontrarD(e, phi);

  const mensajeEncriptado = [];

  for (let i = 0; i < mensaje.length; i++) {
      const m = mensaje.charCodeAt(i);
      let cEncriptado = 1;
      for (let j = 0; j < e; j++) {
          cEncriptado = (cEncriptado * m) % n;
      }
      mensajeEncriptado.push(cEncriptado);
  }

  console.log("n = " + n);
  console.log("phi = " + phi);
  console.log("d = " + d);
  console.log("e = " + e);

  return mensajeEncriptado;
}

function imprimirMensajeEncriptado(mensajeEncriptado) {
  console.log("Mensaje encriptado: " + mensajeEncriptado.join(" "));
}

function desencriptarRSA(mensajeEncriptado, n, d) {
  const mensajeDesencriptado = [];

  for (let i = 0; i < mensajeEncriptado.length; i++) {
      let valorEncriptado = mensajeEncriptado[i];
      let valorDesencriptado = 1;

      for (let j = 0; j < d; j++) {
          valorDesencriptado = (valorDesencriptado * valorEncriptado) % n;
      }

      mensajeDesencriptado.push(valorDesencriptado);
  }

  let mensajeDesencriptadoStr = "";
  for (let i = 0; i < mensajeDesencriptado.length; i++) {
      const valor = mensajeDesencriptado[i];
      if (valor >= 32 && valor <= 126) {
          mensajeDesencriptadoStr += String.fromCharCode(valor);
      }
  }

  return mensajeDesencriptadoStr;
}

function imprimirMensajeDesencriptado(mensajeDesencriptado) {
  console.log("Mensaje desencriptado: " + mensajeDesencriptado);
}

function strToVector(mensajeEncriptadoStr) {
  const mensajeEncriptado = [];
  const nums = mensajeEncriptadoStr.split(" ").filter(numStr => numStr !== "");
  for (let i = 0; i < nums.length; i++) {
      mensajeEncriptado.push(parseInt(nums[i], 10));
  }
  return mensajeEncriptado;
}
//DOM 
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("encriptar-btn").addEventListener("click", function() {
      const p = parseInt(document.getElementById("p-value").value);
      const q = parseInt(document.getElementById("q-value").value);
      const mensaje = document.getElementById("mensaje-input").value;
    
      if (!esPrimo(p) || !esPrimo(q)) {
        alert("p y q deben ser números primos.");
        return;
      }

      if (isNaN(p) || isNaN(q)) {
      alert("Los valores de p y q deben ser números.");
      return;
      }

      if (p + q <= 27) {
      alert("La suma de p y q debe ser mayor a 27.");
      return;
      }
      
      const mensajeEncriptado = encriptarRSA(mensaje, p, q);
      imprimirMensajeEncriptado(mensajeEncriptado);

      document.getElementById("resultado-encriptado").style.display = "block";
      document.getElementById("n-value").textContent = "n = " + (p * q);
      document.getElementById("phi-value").textContent = "phi = " + ((p - 1) * (q - 1));
      document.getElementById("d-value").textContent = "d = " + encontrarD(encontrarE((p - 1) * (q - 1)), (p - 1) * (q - 1));
      document.getElementById("e-value").textContent = "e = " + encontrarE((p - 1) * (q - 1));
      document.getElementById("mensaje-encriptado").textContent = "Mensaje encriptado: " + mensajeEncriptado.join(" ");
  });

  document.getElementById("desencriptar-btn").addEventListener("click", function() {
      const n = parseInt(document.getElementById("n-value").textContent.replace("n = ", ""));
      const d = parseInt(document.getElementById("d-value").textContent.replace("d = ", ""));
      const mensajeEncriptadoStr = document.getElementById("mensaje-encriptado-input").value;

      const mensajeEncriptado = strToVector(mensajeEncriptadoStr);
      const mensajeDesencriptado = desencriptarRSA(mensajeEncriptado, n, d);

      document.getElementById("resultado-desencriptado").style.display = "block";
      document.getElementById("mensaje-desencriptado").textContent = "Mensaje desencriptado: " + mensajeDesencriptado;
      imprimirMensajeDesencriptado(mensajeDesencriptado);
  });
});



