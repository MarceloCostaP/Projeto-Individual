create database DBZ;
use DBZ;

create table usuario (
idUsuario int primary key,
nome varchar(45),
fkRanking int, foreign key (fkRanking) references Ranking(idRanking)
);

create table Ranking (
idRanking int primary key
);