# Etape 5

### Explications

Cette partie avait pour but de pouvoir changer les adresses IP des containers sans devoir changer la configuration du proxy. Pour cela, nous avons passé des variables d'environnement correspondant aux adresses IP des deux containers lors de la création du container reverse proxy. Un fichier de template a également été créé. Il récupère les deux variables d'environnement et les injecte dans l'url. 

Lors de l'éxecution de l'image php:7.2-apache utilisée  dans notre Dockerfile, le service apache est lancé à l'aide du script "apache2-foreground". Des modifications on été apportées à ce script pour que, au lancement du container, il affiche l'url de l'app static, celui de l'app dynamic et il remplace le fichier de configuration du proxy "001-reverse-proxy.conf" par notre template en php.

Le fichier "apache2-foreground" a du être modifié pour avoir un encodage "LF" pour les fins de ligne et non "CRLF".

### Demo

Si l'on veut s'assurer que ça fonctionne bien, on peut lancer les containers dans le désordre pour qu'ils n'aient plus la même adresse que celle configurée au point 3. 

On commence par build l'image et lancer le container de l'étape 2

Commandes à effectuer dans le répertoire express-image :

`docker build -t res/express .`

`docker run -d --name express_dynamic res/express`

Ensuite on effectue les commandes suivante dans le répertoire apache :

`docker build -t res/apache_php .` 

`docker run -d --name apache_static res/apache_php`

Et finalement dans le répertoire apache-revere-proxy : 

`docker build -t res/apache_rp .`

`docker run -d -e STATIC_APP=172.17.0.3:80 -e DYNAMIC_APP=172.17.0.2:3000 --name apache_rp -p 8080:80 res/apache_rp` 

les paramètre STATIC_APP et DYNAMIC_APP correspondent respectivement à l'adresse du container contenant l'application statique et à l'adresse du container contenant l'application dynamique. Si ces containers ont des adresses différentes, il faut également les changer dans la commande ci-dessus.

Vous pouvez vérifier ces adresses grâce à la commande `docker inspect <containerName> | grep -i ipaddr ` où \<containerName\> correspond au nom du container. 

Une fois ces différentes commandes lancées, le site de l'étape 1 se trouve à l'adresse demo.res.ch:8080 et celui de l'étape 2 se trouve à l'adresse demo.res.ch:8080/api/students/ 