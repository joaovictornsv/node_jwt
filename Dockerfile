# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o container
COPY . .

# Exponha a porta em que o servidor irá rodar
EXPOSE 3000

# Defina o comando para rodar a aplicação
CMD ["npm", "start"]
