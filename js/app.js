let tipoVeiculo
let marcaVeiculo
let modeloVeiculo
let anoVeiculo

const baseUrl = 'https://parallelum.com.br/fipe/api/v1'

const marcasList = document.querySelector("#vehicles_brand")
marcasList.innerHTML = ''

const placHolderMarca = new Option("Selecione uma marca", '', false)
marcasList.appendChild(placHolderMarca)

const modeloList = document.querySelector("#vehicles_model")
modeloList.innerHTML = ''

const anosList = document.querySelector("#vehicles_year")
anosList.innerHTML = ''

anosList.addEventListener("change", stateHandle);

function stateHandle() {
    document.getElementById('searchButton').classList.add('search_button_show')
}

const setTipoVeiculo = type => {
    marcasList.innerHTML = ''
    modeloList.innerHTML = ''
    anosList.innerHTML = ''

    document.getElementById('vehicles_brand').disabled = false;
    document.getElementById('vehicles_model').disabled = true;
    document.getElementById('vehicles_year').disabled = true;

    if (document.getElementsByClassName('active').length && document.getElementsByClassName('search_button_show').length) {
        document.getElementById(tipoVeiculo).classList.remove('active')
        document.getElementById('searchButton').classList.remove('search_button_show')
    }

    tipoVeiculo = type

    document.getElementById(type).classList.add('active')

    let endPointMarcas = `${baseUrl}/${tipoVeiculo}/marcas`

    fetch(endPointMarcas)
    .then((response) => response.json())
    .then((data) => {
        data.map((marca) => {
            let listMarca = new Option(marca.nome, marca.codigo, true)
            marcasList.appendChild(listMarca)
        })
    })
}

const setMarca = value => {
    modeloList.innerHTML = ''

    marcaVeiculo = value

    document.getElementById('vehicles_model').disabled = false;


    const placHolderModelo = new Option("Selecione um modelo", '', false)
    modeloList.appendChild(placHolderModelo)

    let endPointModelos = `${baseUrl}/${tipoVeiculo}/marcas/${marcaVeiculo}/modelos`

    fetch(endPointModelos)
    .then((response) => response.json())
    .then((data) => {
        data.modelos.map((marca) => {
            let listMarcaModelosList = new Option(marca.nome, marca.codigo, true)
            modeloList.appendChild(listMarcaModelosList)
        })
    })
}

const setModelo = value => {
    modeloVeiculo = value
    anosList.innerHTML = ''
    document.getElementById('vehicles_year').disabled = false;

    const placHolderAno= new Option("Selecione um ano", '', false)
    anosList.appendChild(placHolderAno)

    let endPointAnos = `${baseUrl}/${tipoVeiculo}/marcas/${marcaVeiculo}/modelos/${modeloVeiculo}/anos`

    fetch(endPointAnos)
    .then((response) => response.json())
    .then((data) => {
        data.map((marca) => {
            let anosModeloList = new Option(marca.nome, marca.codigo, true)
            anosList.appendChild(anosModeloList)
        })
    })
}

const setAno = value => {
    anoVeiculo = value
}
const openModal = () => {
    if (marcaVeiculo && modeloVeiculo && anoVeiculo) {
        let endPointModelos = `${baseUrl}/${tipoVeiculo}/marcas/${marcaVeiculo}/modelos/${modeloVeiculo}/anos/${anoVeiculo}`
        fetch(endPointModelos)
        .then((response) => response.json())
        .then((data) => {
            var mesRef = document.getElementsByClassName("reference_month")[0].getElementsByTagName("span")[0]
            mesRef.innerHTML = data.MesReferencia
            
            var fipeCode = document.getElementsByClassName("fipe_code")[0].getElementsByTagName("span")[0]
            fipeCode.innerHTML = data.CodigoFipe
            
            var marca = document.getElementsByClassName("brand")[0].getElementsByTagName("span")[0]
            marca.innerHTML = data.Marca
            
            var ano = document.getElementsByClassName("year")[0].getElementsByTagName("span")[0]
            ano.innerHTML = data.AnoModelo
            
            var preco = document.getElementsByClassName("price")[0]
            preco.innerHTML = data.Valor
            
            document.getElementById('modal').classList.remove('hide_modal')
        }).catch(e => console.log(e))
    } else {
        alert("Por favor preencha todos os campos")
    }
}
const closeModal = () => {
    document.getElementById('modal').classList.add('hide_modal')
}


