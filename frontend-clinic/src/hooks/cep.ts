interface EnderecoMock {
  cidade: string;
  uf: string;
  rua: string;
  bairro: string;
}

const baseCeps: Record<string, EnderecoMock> = {
  "60055040": { cidade: "Fortaleza", uf: "CE", rua: "Avenida do Forte", bairro: "Centro"}, 
  "01001000": { cidade: "São Paulo", uf: "SP", rua: "Praça da Sé", bairro: "Sé" },
  "20040020": { cidade: "Rio de Janeiro", uf: "RJ", rua: "Av. Rio Branco", bairro: "Centro" },
  "30130000": { cidade: "Belo Horizonte", uf: "MG", rua: "Av. Afonso Pena", bairro: "Centro" },
  "80010000": { cidade: "Curitiba", uf: "PR", rua: "Rua XV de Novembro", bairro: "Centro" },
};

export function buscarEnderecoPorCep(cep: string): Promise<EnderecoMock | undefined> {
  const cepLimpo = cep.replace(/\D/g, "");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(baseCeps[cepLimpo]);
    }, 500);
  });
}