# Etape 3

### Explications

Cette partie consistait en la création d'un proxy pour accéder aux containers des étapes 1 et 2. Ceux-ci seront lancés sans port mapping pour qu'ils ne soient pas directement accessibles. Cela permet d'avoir un  seul point d'entrée et l'on ne peut accéder aux containers uniquement via celui-ci. 

Un utilisateur peut se connecter au container dans l'étape 1 en se rendant à l'adresse demo.res.ch:8080.

Pour le container de l'étape 2, l'adresse est demo.res.ch:8080/api/students/.

Le Dockerfile utilise une image php avec apache 7.2. Il va également  le contenu du dossier "conf" dans le dossier /etc/apache2 du container. Il active ensuite les modules proxy et proxy_http et les sites commençant par 000- et 001-.

dans la configuration du 001, on spécifie le nom du serveur en tant que demo.res.ch et on indique à quels urls correspondent les requêtes de l'utilisateur. 

Le problème avec cette configuration est que les adresses des containers sont écrites en dur. En effet, si les containers sont lancés avec différentes adresses ou si on décide de lancer d'autres containers, tout doit alors être réécris.

### Demo

Tout d'abord, il faut ajouter la ligne suivante dans le fichier "hosts" situé dans C:\Windows\System32\drivers\etc : 127.0.0.1 demo.res.ch 

Il est impératif de lancer les containers dans l'ordre des étapes, d'abord celui de l'étape 1, ensuite celui de l'étape 2 et finalement celui de l'étape 3. Si les images n'ont pas été build il faut également le faire.

les ports des 2 premiers containers ne doivent pas être mappés, il est aussi possible d'utiliser l'option -d lors du docker run pour qu'ils se lancent en arrière plan. Cela permets d'éviter d'ouvrir 3 terminaux.

Une fois cela fait, on peut se rendre à l'adresse demo.res.ch:<portMappéTroisièmeContainer> et retrouver le site fait à l'étape 1.

pour le site de l'étape 2, c'est l'adresse demo.res.ch:<portMappéTroisièmeContainer>/api/students/. Attention, le "/" après students est obligatoire.



