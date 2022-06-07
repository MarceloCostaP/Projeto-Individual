create database DBZ;
use DBZ;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45)
);

create table Ranking (
idRanking int primary key auto_increment,
pontuacao varchar(45),
fkUsuario int, foreign key (fkUsuario) references usuario(idUsuario)
);