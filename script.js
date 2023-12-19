window.onload = () => {
    //criando H1 com id 'title'
    const novoH1 = document.createElement('h1')
    novoH1.innerText = 'Paleta de Cores'
    novoH1.id = 'title'
    document.body.appendChild(novoH1)

    //criando funcao para gerar cores aleatorias na paleta ao clicar no botao 'Cores aleatorias'
    const geraCores = () => {
        const cores = []
        for (let index = 0; index < 4; index += 1) {
            const r = Math.floor(Math.random() * 256)
            const g = Math.floor(Math.random() * 256)
            const b = Math.floor(Math.random() * 256)
            const cor = `rgb(${r}, ${g}, ${b})`
            cores.push(cor)
        }
        return cores
    }


    //criando botao de cores aleatorias
    const btnRandom = document.createElement('button')
    btnRandom.innerText = 'Cores aleatórias'
    btnRandom.id = 'button-random-color'
    document.body.appendChild(btnRandom)

    //criando a UL para por a lista com as cores com a id color-palette
    const novaUL = document.createElement('ul')
    novaUL.id = 'color-palette';
    novaUL.style.paddingLeft = '0px';
    document.body.appendChild(novaUL)

    //criando 4 LI's com as cores com a class color e estilização
    for (let index = 0; index < geraCores().length; index += 1) {
        const novaLI = document.createElement('li')
        novaLI.className = 'color'
        novaLI.style.width = '40px'
        novaLI.style.height = '40px'
        novaLI.style.padding = '5px'
        novaLI.style.backgroundColor = geraCores()[index]
        novaLI.style.border = '1px solid black'
        novaLI.style.display = 'inline-block'
        novaUL.appendChild(novaLI)
    }
    const opcaoCores = document.querySelectorAll('#color-palette li')

    //funcao para o botao gerar novas cores aleatoriamente
    btnRandom.addEventListener('click', () => {
        for (let index = 0; index < opcaoCores.length; index += 1) {
            opcaoCores[index].style.backgroundColor = geraCores()[index]
        }
    })

    //criando botao Limpar
    const btnLimpar = document.createElement('button')
    btnLimpar.innerText = 'Limpar'
    btnLimpar.id = 'clear-board'
    document.body.appendChild(btnLimpar)

    //criando função que torna botao Limpar clicável e pinta todos os pixels de branco
    btnLimpar.addEventListener('click', () => {
        const pixels = document.querySelectorAll('.pixel')
        for (let index = 0; index < pixels.length; index += 1) {
            pixels[index].style.backgroundColor = 'rgb(255,255,255)'
        }
    })


    //criando quadro de pixels
    const quadroPixel = document.createElement('section')
    quadroPixel.id = 'pixel-board'
    quadroPixel.style.display = 'grid'
    quadroPixel.style.gridTemplateColumns = 'repeat(5, 40px)'
    quadroPixel.style.gridTemplateRows = 'repeat(5, 40px)'
    document.body.appendChild(quadroPixel)

    //criando cada pixel que será posto dentro do quadrado
    for (let index = 0; index < 25; index += 1) {
        const quadrado = document.createElement('div')
        quadrado.className = 'pixel'
        quadrado.style.width = '40px'
        quadrado.style.height = '40px'
        quadrado.style.border = '1px solid black'
        quadrado.style.backgroundColor = 'rgb(255,255,255)'
        quadroPixel.appendChild(quadrado)
    }

    //criado funcao que adiona a class selected ao elemento clicado
    const aplicaSelecao = (element) => {
        const selected = document.querySelector('.selected')
        const cor = element.target
        if (selected) {
            selected.classList.remove('selected')
        }
        cor.classList.add('selected')
    }

    //crinado funcao para selecionar uma cor na paleta
    const selecionaCor = () => {
        const cores = document.querySelectorAll('.color')
        for (let index = 0; index < cores.length; index += 1) {
            const cor = cores[index]
            cor.addEventListener('click', aplicaSelecao)
        }
    }
    selecionaCor()

    //criando funcao para salvar cores de cada pixel no localStorage
    const salvaMudancas = () => {
        const arrayCoresAtuais = []
        const pixels = document.querySelectorAll('.pixel')
        for (let index = 0; index < pixels.length; index += 1) {
            const pixelAtualBG = pixels[index].style.backgroundColor
            arrayCoresAtuais.push(pixelAtualBG)
        } localStorage.setItem('pixelBoard', JSON.stringify(arrayCoresAtuais))
    }

    //criando funcao que pinta o pixel clicado
    const pintaPixel = (element) => {
        const selected = document.querySelector('.selected')
        const selectedBackgroundColor = selected.style.backgroundColor
        const pixelClicado = element.target
        pixelClicado.style.backgroundColor = selectedBackgroundColor
        salvaMudancas()
    }

    //criando funcao que torna todos os pixels clicaveis
    const clicaPixel = () => {
        const pixels = document.querySelectorAll('.pixel')
        for (let index = 0; index < pixels.length; index += 1) {
            const pixelClicado = pixels[index]
            pixelClicado.addEventListener('click', pintaPixel)
        }
    }
    clicaPixel()

    //criando funcao que recupera os dados salvos em localStorage e adiciona novamente nos elementos correspondentes
    const recuperaMudancas = () => {
        const pixels = document.querySelectorAll('.pixel')
        const mantemAlteracao = JSON.parse(localStorage.getItem('pixelBoard'))
        if (mantemAlteracao !== null) {
            for (let index = 0; index < pixels.length; index += 1) {
                pixels[index].style.backgroundColor = mantemAlteracao[index]
            }
        }
    }
    recuperaMudancas()

}


