# Etape 2

### Explications

L'étape 2 consistait à utiliser node.js dans un container pour retourner une liste aléatoire en format JSON. 

Pour la liste, nous avons décidés de retourner des entreprises aléatoires ainsi que leur adresse et numéro de téléphone. 

Nous avons tout d'abord installés node.js et le module "chance" qui permet de créer des variables aléatoires. 

Un Dockerfile contenant l'image de node en version 14.17 a également été créé. Il copie le contenu du dossier "src" dans le dossier /opt/app du container. Dans src, un fichier index.js contient la création des entreprises aléatoire.

Il est ensuite possible de construire l'image et lancer le container, et on retrouve alors les entreprises créées à l'adresse 127.0.0.1:<portmappé>

### Demo

On commence par construire l'image avec la commande `docker build -t res/express`.

Il faut ensuite le lancer avec la commande `docker run -p 9090:3000 res/express`.

Les entreprises créées peuvent alors être trouvées à l'adresse 127.0.0.1:9090.