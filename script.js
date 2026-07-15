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

    function converter(valor, unidadeOrigem, unidadeDestino) {
        const fatorOrigem = FATORES_SEGUNDOS[unidadeOrigem];
        const fatorDestino = FATORES_SEGUNDOS[unidadeDestino];
        if (!fatorOrigem || !fatorDestino) return null;
        return (valor * fatorOrigem) / fatorDestino;
    }

    console.log("Conversor de Tempo inicializado");
});
