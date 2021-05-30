# Etape 4

## Changement dans la configuration

 - Les dockerfiles des trois images ont été modifiés afin que vim s’installe
   directement au lancement des conteneurs.
 - Nous avons ajouté un script dans l’image apache afin que toutes les
   deux secondes, le nom de la première entreprise reçue par
   /api/students/ (nous recevons des entreprises) soit écrite dans un
   nouveau paragraphe au niveau du footer-info (en dessous de l’email et
   réseaux sociaux).
AJOUTER IMAGE

En effet, chaque deux secondes, un paragraphe s’ajoute sous la forme :

\<p> <nom de l’entreprise> "\</p>

Ces paragraphes s’insèrent l’un après l’autre. Ils sont réinitialisés au rafraîchissement de la page.

Le script ajouté se trouve dans apache/site_content/assets/js et est nommé students.js.

Dans index.html, en plus de l’appelle au script students.js, le script suivant est appelé :

\<script src="http://code.jquery.com/jquery-1.11.0.min.js">\</script>

S’il n’est pas appelé, la fonction commençant par un $ dans students.js ne peut pas être appelée et produit une erreur.
## Lancer la configuration
Pour lancer la configuration, il faut faire les commandes suivantes (dans l’ordre pour avoir les bonne adresses ip) :

### Construction des conteneurs
Dans le dossier apache :

>docker build -t res/apache_php .

Dans le dossier express-image

>docker build -t res/express_students .

Dans le dossier apache reverse_proxy

> docker build -t res/apache_rp .

### Pour run

> docker run -d --name apache_static res/apache_php
> docker run -d --name express_dynamic res/express_students
> docker run -d -p 8080:80 --name apache_rp res/apache_rp

Il se peut que le node module d’express_students doit être mis à jour pour pouvoir le lancer. Pour ce faire, il faut taper la commande *npm install* dans son dossier src.
### Demo
Envoie des données :

En faisant inspect element et en regardant dans réseau, nous pouvons constater que des données sont reçue par /api/students/.

Dans la console, nous pouvons voir les objets reçus.

