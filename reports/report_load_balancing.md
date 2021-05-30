# Load balancing

### Explications

Le load balancing permet de partager les requêtes entre plusieurs serveurs.

Pour le mettre en place nous avons utilisé nginx. 

Le dockerfile utilise l'image nginx et copie le fichier de configuration "nginx.conf" dans le répertoire /etc/nginx/ du container.

Ce fichier de configuration contient l'adresse des containers statiques et dynamiques. Ceux-ci doivent être lancés avant de lancer le container nginx.

Pour cette configuration, nous utilisons 2 containers statique ainsi que 2 dynamique. Leur adresse ip doit correspondre à celle indiquée dans le fichier de configuration.

### Demo

Pour commencer, il faut s'assurer que les images des étapes 1 et 2 soient bien construites. On peut alors construire l'image dans le dossier "load-balancing" à l'aide de la commande `docker build -t res/load-balancing .` 

On lance alors deux containers statiques et ensuite 2 containers dynamiques. Attention ! Les containers doivent être lancé dans cet ordre là sinon les adresses IP données ne seront pas correctes. On peut alors lancer le container de load balancing avec la commande suivante : `docker run -p 8080:80 res/load-balancing` . On peut alors retrouver les containers aux adresses habituelles : "demo.res.ch:8080" et "demo.res.ch:8080/api/students".

### Sticky sessions vs round-robin

La différence principale entre "round-robin" et "sticky session", c'est que un utilisateur s'étant connecté à un serveur à l'aide de load balancing sera toujours redirigé sur le même serveur. Lors de sa connection, un hash de son adresse ip sera effectué et à chaque connection il est assuré de se retrouver sur le même serveur sauf si celui-ci n'est pas disponible.

Par défaut avec nginx, le load balancing est effectué en mode "round-robin". pour activer le mode "Sticky sessions", il suffit de rajouter la ligne `hash $remote_addr` qui va hasher l'adresse du client et ainsi assurer sa reconnection au même serveur.

