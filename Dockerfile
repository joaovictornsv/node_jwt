# Usa uma imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json (caso exista)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Expõe a porta que o app usará (ajuste conforme necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/index.js"]
