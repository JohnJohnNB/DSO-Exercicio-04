let contador = 0
let autoclicker_count = 0
let farm_count = 0

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

// Metodo para comprar a farm
function BuyFarm(){
    if (contador >= (farm_count+1)*20){
        contador = contador - ((farm_count+1)*20)
        farm_count += 5
    }
    Update()
}

//Metodo para a cada 1 segundo incrementar um cookie
function Timer(){
    contador = contador + autoclicker_count + (farm_count)
    Update()
}
setInterval(Timer, 1000)

//Metodo para atualizar as informações contidas a cada ação ou algum incremento
function Update(){
    document.getElementById("comprar_autoclick").textContent = "Preço:" + ((autoclicker_count+1)*12)
    document.getElementById("contador_autoclick").textContent = "Você tem "+ autoclicker_count + " AutoClickers" 
    document.getElementById("comprar_farm").textContent = "Preço:" + ((farm_count+1)*20)
    document.getElementById("contador_farm").textContent = "Você tem " + farm_count/5 + " Farms"
    document.getElementById("contador").textContent = contador + " johns"
    document.getElementById("john_por_segundo").textContent = autoclicker_count + farm_count + " por segundo"
}
