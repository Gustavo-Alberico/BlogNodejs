-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.23 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela blogbanco.articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `body` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `userId` (`userId`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela blogbanco.articles: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` (`id`, `title`, `slug`, `body`, `createdAt`, `updatedAt`, `categoryId`, `userId`) VALUES
	(1, 'O que é Javascript?', 'o-que-e-javascript', '<h1 style="text-align: justify;">JavaScript</h1>\r\n<p style="text-align: justify;"><strong>JavaScript</strong> (frequentemente abreviado como JS) &eacute; uma linguagem de programa&ccedil;&atilde;o interpretada estruturada, de script em alto n&iacute;vel com tipagem din&acirc;mica fraca e multiparadigma (prot&oacute;tipos, orientado a objeto, imperativo e, funcional). Juntamente com HTML e CSS, o JavaScript &eacute; uma das tr&ecirc;s principais tecnologias da World Wide Web. JavaScript permite p&aacute;ginas da Web interativas e, portanto, &eacute; uma parte essencial dos aplicativos da web. A grande maioria dos sites usa, e todos os principais navegadores t&ecirc;m um mecanismo JavaScript dedicado para execut&aacute;-lo.<sup id="cite_ref-4" class="reference"></sup></p>\r\n<p style="text-align: justify;">&Eacute; atualmente a principal linguagem para programa&ccedil;&atilde;o client-side em navegadores web. &Eacute; tamb&eacute;m bastante utilizada do lado do servidor atrav&eacute;s de ambientes como o node.js.</p>\r\n<p style="text-align: justify;">Como uma linguagem multiparadigma, o JavaScript suporta estilos de programa&ccedil;&atilde;o orientados a eventos, funcionais e imperativos (incluindo orientado a objetos e prototype-based), apresentando recursos como fechamentos (closures) e fun&ccedil;&otilde;es de alta ordem comumente indispon&iacute;veis em linguagens populares como Java e C++. Possui APIs para trabalhar com texto, matrizes, datas, express&otilde;es regulares e o DOM, mas a linguagem em si n&atilde;o inclui nenhuma E/S, como instala&ccedil;&otilde;es de rede, armazenamento ou gr&aacute;ficos, contando com isso no ambiente host em que est&aacute; embutido.</p>\r\n<p style="text-align: justify;">Foi originalmente implementada como parte dos navegadores web para que scripts pudessem ser executados do lado do cliente e interagissem com o usu&aacute;rio sem a necessidade deste script passar pelo servidor, controlando o navegador, realizando comunica&ccedil;&atilde;o ass&iacute;ncrona e alterando o conte&uacute;do do documento exibido, por&eacute;m os mecanismos JavaScript agora est&atilde;o incorporados em muitos outros tipos de software host, incluindo servidores em servidores e bancos de dados da Web e em programas que n&atilde;o s&atilde;o da Web, como processadores de texto e PDF, e em tempo de execu&ccedil;&atilde;o ambientes que disponibilizam JavaScript para escrever aplicativos m&oacute;veis e de desktop, incluindo widgets de &aacute;rea de trabalho.</p>\r\n<p style="text-align: justify;">Os termos Vanilla JavaScript e Vanilla JS se referem ao JavaScript n&atilde;o estendido por qualquer estrutura ou biblioteca adicional. Scripts escritos em Vanilla JS s&atilde;o c&oacute;digos JavaScript simples.<sup id="cite_ref-6" class="reference"></sup></p>\r\n<p style="text-align: justify;">Embora existam semelhan&ccedil;as entre JavaScript e Java, incluindo o nome da linguagem, a sintaxe e as respectivas bibliotecas padr&atilde;o, as duas linguagens s&atilde;o distintas e diferem muito no design; JavaScript foi influenciado por linguagens de programa&ccedil;&atilde;o como Self e Scheme.<sup id="cite_ref-7" class="reference"></sup></p>\r\n<p style="text-align: justify;">&Eacute; baseada em ECMAScript, padronizada pela Ecma international nas especifica&ccedil;&otilde;es ECMA-262 e ISO/IEC 16262.</p>', '2021-04-18 14:01:19', '2021-04-18 14:51:49', 1, 1);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;

-- Copiando estrutura para tabela blogbanco.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela blogbanco.categories: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `title`, `slug`, `createdAt`, `updatedAt`) VALUES
	(1, 'JavaScript', 'javascript', '2021-04-18 13:58:18', '2021-04-18 13:58:18'),
	(2, 'HTML', 'html', '2021-04-18 13:58:24', '2021-04-18 13:58:24'),
	(3, 'NodeJs', 'nodejs', '2021-04-18 13:58:29', '2021-04-18 13:58:29');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Copiando estrutura para tabela blogbanco.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `accesslevel` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela blogbanco.users: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `username`, `password`, `accesslevel`, `createdAt`, `updatedAt`) VALUES
	(1, 'emailteste@testeemail.com', 'testeusuario', '$2a$10$e23U8Pwe/PXBENVaxG2yxekTauTFaB1C74NrcgJ5t4NUbqqGNCemu', 1, '2021-04-18 13:55:50', '2021-04-18 13:55:50'),
	(2, 'emailexemplo2@exemplo.com', 'Usuário exemplo 2', '$2a$10$admfH5EurkQf8c9ElwPFuOLWHlZpSxrvmLPCaLLGDcOv8UeUQu2rq', 2, '2021-04-18 13:57:26', '2021-04-18 13:57:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
