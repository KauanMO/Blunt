drop database Blunt;

create database Blunt;

use Blunt;

create table Usuario (
	idUsuario int primary key auto_increment,
    username varchar(20),
    emailUsuario varchar(45),
    senhaUsuario varchar(255),
    statusUsuario tinyint default 1,
    fotoPerfilUsuario varchar(255),
    fotoCapaUsuario varchar(255),
    nomeExibicaoUsuario varchar(30),
    bioUsuario varchar(100),
    dataNasc date,
    dataCadastro datetime default current_timestamp
);

create table Seguidor (
	idSeguidor int primary key auto_increment,
    notificar tinyint,
    seguidor int,
    seguido int,
    constraint usuarioSeguidor foreign key (seguidor) references Usuario(idUsuario),
    constraint usuarioSeguido foreign key (seguido) references Usuario(idUsuario)
);

create table TipoPublicacao (
	idTipoPublicacao int primary key auto_increment,
    tipoPublicacao varchar(30)
);

create table Publicacao (
	idPublicacao int primary key auto_increment,
    textoPublicacao varchar(60),
    fixada tinyint,
    dataPublicacao datetime,
    fkTipoPublicacao int,
    fkUsuario int,
    constraint publicacaoTipoPublicacao foreign key (fkTipoPublicacao) references TipoPublicacao(idTipoPublicacao),
    constraint publicacaoUsuario foreign key (fkUsuario) references Usuario(idUsuario)
);

create table FotoPublicacao (
	idFotoPostagem int primary key auto_increment,
    fotoPostagem varchar(255),
    fkPublicacao int,
    constraint fotoPubPublicacao foreign key (fkPublicacao) references Publicacao(idPublicacao)
);

create table Comentario (
	idComentario int primary key auto_increment,
    textoComentario varchar(55),
    dataComentario datetime,
    fkPublicacao int,
    fkUsuario int,
    constraint ComentarioPublicacao foreign key (fkPublicacao) references Publicacao(idPublicacao),
    constraint ComentarioUsuario foreign key (fkUsuario) references Usuario(idUsuario)
);

create table FotoComentario (
	idFotoComentario int primary key auto_increment,
    fotoComentario varchar(255),
    fkComentario int,
    constraint fotoComComentario foreign key (fkComentario) references Comentario(idComentario)
);

create table Curtida (
	idCurtida int primary key auto_increment,
    fkUsuario int,
    fkPublicacao int,
    fkComentario int,
    constraint curtidaUsuario foreign key (fkUsuario) references Usuario(idUsuario),
    constraint curtidaPublicacao foreign key (fkPublicacao) references Publicacao(idPublicacao),
    constraint curtidaComentario foreign key (fkComentario) references Comentario(idComentario)
);

create table Notificacao (
	idNotificacao int primary key auto_increment,
    textoNotificacao varchar(45),
    dataNotificacao datetime,
    notificado int,
    constraint notificacaoUsuario foreign key (notificado) references Usuario(idUsuario)
);

create table TipoDenuncia (
	idTipoDenuncia int primary key auto_increment,
    tipoDenuncia varchar(30)
);

create table ClassificacaoDenuncia (
	idClassificacaoDenuncia int primary key auto_increment,
    ClassificacaoDenuncia varchar(35)
);

create table Denuncia (
	idDenuncia int primary key auto_increment,
    textoDenuncia varchar(60),
    statusDenuncia tinyint,
    fkTipoDenuncia int,
    fkClassificacaoDenuncia int,
    denunciador int,
    denunciado int,
    fkPublicacao int,
    fkComentario int,
    constraint denunciaTipoDenuncia foreign key (fkTipoDenuncia) references TipoDenuncia(idTipoDenuncia),
	constraint denunciaClassificacaoDenuncia foreign key (fkClassificacaoDenuncia) references ClassificacaoDenuncia(idClassificacaoDenuncia),
    constraint denunciador foreign key (denunciador) references Usuario(idUsuario),
    constraint denunciado foreign key (denunciado) references Usuario(idUsuario),
    constraint denunciaPublicacao foreign key (fkPublicacao) references Publicacao(idPublicacao),
    constraint denunciaComentario foreign key (fkComentario) references Comentario(idComentario)
);

select * from usuario;