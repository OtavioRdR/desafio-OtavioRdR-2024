class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, ocupacaoAtual: 3, animais: ['macaco'] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, ocupacaoAtual: 0, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, ocupacaoAtual: 1, animais: ['gazela'] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, ocupacaoAtual: 0, animais: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, ocupacaoAtual: 1, animais: ['leao'] }
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animais[animal]) {
          return { erro: "Animal inválido" };
      }
  
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
          return { erro: "Quantidade inválida" };
      }
  
      const { tamanho, biomas, carnivoro } = this.animais[animal];
      const recintosViaveis = [];
  
      this.recintos.forEach((recinto) => {
          // Verifica se o bioma é compatível
          if (!biomas.includes(recinto.bioma)) return;
  
          // Verifica se há espaço suficiente
          const espacoNecessario = (quantidade * tamanho) + (recinto.animais.length > 0 ? 1 : 0);
          const espacoLivre = recinto.tamanhoTotal - (recinto.ocupacaoAtual + espacoNecessario);
          
          if (espacoLivre < 0) return;
  
          // Valida carnívoros
          if (carnivoro && recinto.animais.length > 0 && recinto.animais.some(a => a !== animal.toLowerCase())) {
              return;
          }
  
          // Adiciona o recinto à lista viável
          recintosViaveis.push({
              numeroRecinto: recinto.numero,
              espacoLivre: espacoLivre,
              totalEspaco: recinto.tamanhoTotal,
              ocupacaoAtual: recinto.ocupacaoAtual + espacoNecessario
          });
      });
  
      if (recintosViaveis.length === 0) {
          return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
  }  
  }
  
  export { RecintosZoo as RecintosZoo };
  