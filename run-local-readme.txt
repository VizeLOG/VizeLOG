# How to run this application in local environment

### First
1. Make Sure you have
	- Docker Desktop or Docker CLI
		https://www.docker.com/products/docker-desktop/
	-  Enable Kubernetes in Docker Desktop or Kubernetes CLI
		https://kubernetes.io/
	### There installation must be complete ###
2.Deploy the ingress controller
	- This must to have ingress to control on kubernetes cluster
	- Please read the installation guide
		https://kubernetes.github.io/ingress-nginx/deploy/
	### This installation must be complete ###
3.Maping host file
	- This must to mapping host to ingress control
	- How to edit
		https://www.hostinger.com/tutorials/how-to-edit-hosts-file
	- This config in hosts file
		- add in file
		127.0.0.1	vizelog.dev
4.Now apply to create kubernetes deployment and kubernetes service on kubernetes cluseter
	- Change Directory to
		cd infra/k8s-dev
	- Run kubectl to create deployment and service on yaml file
		kubectl create -f ingress-srv.yaml
		kubectl create -f client-depl-dev.yaml
		kubectl create -f google-depl-dev.yaml
		kubectl create -f youtube-depl-dev.yaml
5.Check pods, deployment, service
	- All kubernetes cluster should be running
		kubectl get pods
		kubectl get deployment
		kubectl get service
6.Open your browser 
	- This project base on Chrome
	- Unsucure your are browser
	- go to 
		vizelog.dev
	### Have Funs ###
	### Thank you ###