# Etape 1

### Explications

La première étape consistait en la création d'un serveur apache httpd dockeurisé servant du contenu static.

pour faire cela, nous avons tout d'abord créé un "Dockerfile" contenant une image php  avec apache 7.2.

Le Dockerfile copie également le contenu du fichier "site_contents" dans le répertoire "/var/www/html" du container. 

une fois l'image crée et le container lancé avec un port mappé sur le 80, on peut y accéder avec l'adresse localhost:<portmappé>.

Les fichiers de configuration d'apache se trouvent dans /etc/apache2 dans le container : 

![apacheConf](C:\Users\Don Peg\Documents\HEIG\RES\Teaching-HEIGVD-RES-2021-Labo-HTTPInfra\apache\images\apacheConf.png)

### Démo

Il faut tout d'abord placer les fichiers nécessaire au site dans le dossier "site_contents".

Ensuite, il faut construire l'image avec la commande suivante : `docker build -t res/apache_php . `

On peut alors démarrer le container avec la commande `docker run -p 8080:80 res/apache_php`

Le site web est ensuite accessible à l'adresse 127.0.0.1:8080