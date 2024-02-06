
document.addEventListener("DOMContentLoaded", function() {

let chave = "b462b1c67156f6a825b1feb3a543b53e"


function colocarNaTela(dados){
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Condições atuais em " + dados.name
    document.querySelector(".temp").innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
    document.querySelector(".valor-umidade").innerHTML = "Umidade atual: " + dados.main.humidity + "%";
    document.querySelector(".valor-vento").innerHTML ="Velocidade do vento " + dados.wind.speed + "m/s"// Exibindo a velocidade do vento

    document.querySelector(".icone").style.display = "inline-block";

    document.querySelector(".input-cidade").value = "";
    
}

async function buscarCidade(cidade) {
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
            cidade +
            "&appid=" +
            chave +
            "&lang=pt_br" +
            "&units=metric")

        .then(resposta => resposta.json())
        .catch(error => {
            console.error('Erro ao buscar cidade:', error);
            return null;
        });

    if (dados && dados.cod === 200) {
        colocarNaTela(dados);
        ocultarMensagemErro(); 
    } else {
        exibirMensagemErro();
    }
}

function exibirMensagemErro() {
    document.querySelector(".mensagem-erro").style.display = "block";
    document.querySelector(".input-cidade").style.display ="inline-block";
    document.getElementById("btnBuscarCidade").style.display = "inline-block";
}

function ocultarMensagemErro() {
    document.querySelector(".mensagem-erro").style.display = "none";
}

document.getElementById("btnBuscarCidade").addEventListener("click", function() {
    let cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
    ocultarElementos(); // Ocultar os elementos de entrada ao buscar uma cidade
});


// Sugestões
document.querySelectorAll("#suggestions button").forEach(function(button) {
    button.addEventListener("click", function() {
        let cityName = button.textContent;
        buscarCidade(cityName);
        ocultarElementos(); // Ocultar os elementos de entrada ao clicar em uma sugestão
    });
});

// Função para ocultar as sugestões
function ocultarElementos() {
    document.querySelector(".input-cidade").style.display = "none";
    document.getElementById("btnBuscarCidade").style.display = "none";
    document.getElementById("suggestions").style.display = "none";
    document.getElementById("confira").style.display = "none";
}
});