-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : mar. 04 juin 2024 à 12:44
-- Version du serveur : 11.3.2-MariaDB-1:11.3.2+maria~ubu2204
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `linksawordkening`
--

-- --------------------------------------------------------

--
-- Structure de la table `la_friend`
--

CREATE TABLE `la_friend` (
  `id` int(11) NOT NULL,
  `idUser` bigint(20) UNSIGNED NOT NULL,
  `idFriend` bigint(20) UNSIGNED NOT NULL,
  `state` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `la_game`
--

CREATE TABLE `la_game` (
  `id` varchar(36) NOT NULL,
  `idJoin` char(4) NOT NULL COMMENT 'Code d''invitation pour les parties',
  `idHost` bigint(20) UNSIGNED NOT NULL COMMENT 'Identifiant de l''hôte de la partie',
  `dateTime` datetime NOT NULL COMMENT 'Date de création de la partie',
  `name` varchar(255) NOT NULL COMMENT 'Nom de la partie',
  `type` enum('SinglePlayer','MultiPlayer') NOT NULL COMMENT 'Type de partie (Solo, Multijoueur)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `la_log`
--

CREATE TABLE `la_log` (
  `id` int(11) NOT NULL,
  `idUser` bigint(20) UNSIGNED NOT NULL COMMENT 'Identifiant de l''utilisateur lié au log',
  `dateTime` datetime NOT NULL COMMENT 'Date et heure du log',
  `log` varchar(255) NOT NULL COMMENT 'Contenu du log',
  `ip` varchar(50) DEFAULT NULL COMMENT 'Adresse IP de la machine de l''utilisateur'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `la_score`
--

CREATE TABLE `la_score` (
  `id` int(11) NOT NULL,
  `idUser` bigint(20) UNSIGNED NOT NULL COMMENT 'Identifiant de l''utilisateur lié au score',
  `idGame` varchar(36) NOT NULL,
  `score` bigint(20) NOT NULL COMMENT 'Valeur du score',
  `words` varchar(2048) DEFAULT NULL COMMENT 'Mots rentrés par un utilisateur dans une partie, séparés par une virgule'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `la_user`
--

CREATE TABLE `la_user` (
  `id` bigint(20) UNSIGNED NOT NULL COMMENT 'Identifiant unique de l''utilisateur',
  `username` varchar(25) NOT NULL COMMENT 'Nom d''utilisateur',
  `birthYear` year(4) NOT NULL COMMENT 'Année de naissance',
  `email` varchar(50) NOT NULL COMMENT 'Adresse e-mail',
  `password` varchar(255) NOT NULL COMMENT 'Mot de passe (haché)',
  `verified` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Statut de vérification',
  `tokenR` bigint(20) DEFAULT NULL COMMENT 'Jeton de réinitialisation (peut être nul)',
  `profilPicture` varchar(255) NOT NULL DEFAULT '/img/profilepictures/strawberry.jpg' COMMENT 'Nom de la photo de profil parmi les disponibles',
  `visibility` enum('PRIVATE','PUBLIC') NOT NULL DEFAULT 'PUBLIC' COMMENT 'Visibilité du compte',
  `admin` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Si la personne est admin ou non'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `la_friend`
--
ALTER TABLE `la_friend`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id-friend` (`idFriend`),
  ADD KEY `id-user` (`idUser`);

--
-- Index pour la table `la_game`
--
ALTER TABLE `la_game`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idJoin` (`idJoin`),
  ADD KEY `id-user-host` (`idHost`) USING BTREE COMMENT 'Index sur l''identifiant de l''hôte de la partie',
  ADD KEY `id` (`id`);

--
-- Index pour la table `la_log`
--
ALTER TABLE `la_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id-user-log` (`idUser`) USING BTREE COMMENT 'Index sur l''identifiant de l''utilisateur lié au log';

--
-- Index pour la table `la_score`
--
ALTER TABLE `la_score`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `la_user`
--
ALTER TABLE `la_user`
  ADD PRIMARY KEY (`id`) USING BTREE COMMENT 'Index primaire',
  ADD UNIQUE KEY `id` (`id`) USING BTREE COMMENT 'Index sur l''identifiant de l''utilisateur',
  ADD UNIQUE KEY `pseudo` (`username`) USING BTREE COMMENT 'Index sur le nom d''utilisateur',
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `la_friend`
--
ALTER TABLE `la_friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `la_log`
--
ALTER TABLE `la_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `la_score`
--
ALTER TABLE `la_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `la_user`
--
ALTER TABLE `la_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Identifiant unique de l''utilisateur';

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `la_friend`
--
ALTER TABLE `la_friend`
  ADD CONSTRAINT `id-friend` FOREIGN KEY (`idFriend`) REFERENCES `la_user` (`id`),
  ADD CONSTRAINT `id-user` FOREIGN KEY (`idUser`) REFERENCES `la_user` (`id`);

--
-- Contraintes pour la table `la_game`
--
ALTER TABLE `la_game`
  ADD CONSTRAINT `id-user-host` FOREIGN KEY (`idHost`) REFERENCES `la_user` (`id`);

--
-- Contraintes pour la table `la_log`
--
ALTER TABLE `la_log`
  ADD CONSTRAINT `id-user-log` FOREIGN KEY (`idUser`) REFERENCES `la_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
