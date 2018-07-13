## Services

Different pieces of the app are called "services."

A service only runs one image, but it codifies the way that iamge runs -- what ports it should use, how many replicas of the container should run.

A service can run many containers, a single container running in a service is called a task, up to the number of replicas you defiened in docker-compose.yml.

```
# print service
docker service ls
docker service ps appname
# print container of service
docker container ls
# take down the app and the swarm
docker stack rm appname
docker swarm leave --force
```
## Swarm

Multi-container, multi-machine applicaitons are made possible by joining multiple machines into a "Dockerized" cluster called a **swarm**.

A swarm is a group of machines that are running Docker and joined into a cluster.

The machines are referred to as nodes aftering joining a swarm.

Swarm managers are the only machines in a swarm that can execute your commands, or authorize other machines to join the swarm as workers.

### Set up swarm

```
# enable swarm mode and makke your current machine a swarm manager
docker swarm init
# make other machiens to have them join the swarm as workers

```

#### Create a cluster

```
# create VMs
docker-machine create --drive virtualbox vm1
docker-machine create --drive virtualbox vm2

# list machines
docker-machine ls
```

#### Intialize the swarm and add nodes

```
# intialize the swarm
docker-machine ssh vm1 "docker swarm init --advertise-addr <vm1 ip>"

# add nodes
docker-machine ssh vm2 "docker swarm join --token <token> <ip>:2377"

# list nodes

docker-machine ssh vm1 "docker node ls"
```

#### Configure shell to talk to specific machine

```
docker-machine env vm1
eval $(docker env vm1)

# directly list the machine according to you are in vm1 which is as a swarm
docker-machine ls
```

### Deploy the app on the swarm manager

```
# deploy the app
docker stack deploy -c docker-compose.yml <appname>

# display the stack
docker stack ps <appname>

# clean up app and swarm
docker stack rm <appname>
docker-machine ssh vm2  "docker swarm leave"
docker-machine ssh vm1 "docker swarm leave --force"

# unset docker-machine env
eval $(docker-machine env -u)

# restart the machine
docker-machine start vm1
```