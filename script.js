document.addEventListener('DOMContentLoaded', () => {
    const UNIDADES = ['segundo', 'minuto', 'hora', 'dia', 'semana', 'mês', 'ano', 'década', 'século'];

    const FATORES_SEGUNDOS = {
        segundo: 1,
        minuto: 60,
        hora: 3600,
        dia: 86400,
        semana: 604800,
        'mês': 2592000,
        ano: 31536000,
        'década': 315360000,
        'século': 3153600000
    };

    function validarEntrada(valor) {
        if (valor === "" || valor === null || isNaN(valor) || Number(valor) <= 0) {
            console.error("Valor inválido: deve ser um número positivo.");
            return false;
        }
        return true;
    }

    function formatarResultado(valor) {
        if (valor === 0) return "0";
        if (valor > 1000000 || (valor < 0.0001 && valor > 0)) {
            return Number(valor).toExponential(4);
        }
        return Number(valor.toFixed(6)).toString();
    }

    function converter(valor, unidadeOrigem, unidadeDestino) {
        if (!validarEntrada(valor)) return null;
        const numValor = Number(valor);
        const fatorOrigem = FATORES_SEGUNDOS[unidadeOrigem];
        const fatorDestino = FATORES_SEGUNDOS[unidadeDestino];
        if (!fatorOrigem || !fatorDestino) return null;
        const calc = (numValor * fatorOrigem) / fatorDestino;
        return formatarResultado(calc);
    }

    function atualizarResultado() {
        const inputValor = document.getElementById('valor-input');
        const selectOrigem = document.getElementById('unidade-origem');
        const selectDestino = document.getElementById('unidade-destino');
        const divResultado = document.getElementById('resultado');

        if (!inputValor || !selectOrigem || !selectDestino || !divResultado) return;

        const valor = inputValor.value;
        if (valor === "" || valor === null) {
            divResultado.textContent = "";
            return;
        }

        const res = converter(valor, selectOrigem.value, selectDestino.value);
        if (res !== null) {
            divResultado.textContent = `${res} ${selectDestino.value}(s)`;
        } else {
            divResultado.textContent = "";
        }
    }

    const inputElement = document.getElementById('valor-input');
    if (inputElement) {
        inputElement.addEventListener('input', atualizarResultado);
    }
    const origemElement = document.getElementById('unidade-origem');
    if (origemElement) {
        origemElement.addEventListener('change', atualizarResultado);
    }
    const destinoElement = document.getElementById('unidade-destino');
    if (destinoElement) {
        destinoElement.addEventListener('change', atualizarResultado);
    }

    const btnSwap = document.getElementById('btn-swap');
    if (btnSwap) {
        btnSwap.addEventListener('click', () => {
            const selectOrigem = document.getElementById('unidade-origem');
            const selectDestino = document.getElementById('unidade-destino');
            if (selectOrigem && selectDestino) {
                const temp = selectOrigem.value;
                selectOrigem.value = selectDestino.value;
                selectDestino.value = temp;
                atualizarResultado();
            }
        });
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    } else {
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('tema', isLight ? 'light' : 'dark');
            themeToggleBtn.textContent = isLight ? '☀️' : '🌙';
        });
    }

    console.log("Conversor de Tempo inicializado");
});
