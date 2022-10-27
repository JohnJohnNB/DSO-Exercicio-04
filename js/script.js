let contador = 0
let autoclicker_count = 0

//Metodo para incrementar o contador geral
function incrementar_contador(){
    contador += 1
    document.getElementById("contador").textContent = contador + " johns"
}

// Metodo para Comprar o autoclick
function BuyAutoClick(){
    if (contador >= (autoclicker_count+1)*12){
        contador = contador - ((autoclicker_count+1)*12)
        autoclicker_count += 1
    }
    Update()
}

//Metodo para a cada 1 segundo incrementar um cookie
function Timer(){
    contador = contador + autoclicker_count
    Update()
}
setInterval(Timer, 1000)

//Metodo para atualizar o contador a cada incremento de cookies ou alguma ação
function Update(){
    document.getElementById("contador_autoclick").textContent = "Você tem "+ autoclicker_count + " AutoClickers" 
    document.getElementById("contador").textContent = contador + " johns"
}
