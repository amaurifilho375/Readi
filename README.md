node src/server.js -> roda o projeto

sudo docker build -t readi_request . -> outra opção para rodar o projeto

docker run --name my-app -p 3000:3000 --network=host -d readi_request -> isso se faz necessário para rodar o projeto visível ao postgress
