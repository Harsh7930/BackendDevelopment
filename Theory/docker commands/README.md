# Docker Commands & Flags — Hands-On Lab

## Aim

Practice the essential Docker commands for working with images, containers, networks, volumes, logs, and image builds.

## Prerequisite

Install and start Docker Desktop (or the Docker daemon on Linux). Confirm that it is available:

```bash
docker version
docker info
```

`docker version` displays the Docker client and server versions. `docker info` displays system-wide configuration such as the storage driver, cgroups, images, and containers.

## 1. Image management

List local images:

```bash
docker images
docker images -a    # include intermediate layers
docker images -q    # print image IDs only
```

Pull images from Docker Hub. A tag selects a particular version; omit it to use the default `latest` tag.

```bash
docker pull ubuntu
docker pull ubuntu:22.04
```

Remove an image:

```bash
docker rmi ubuntu
docker rmi -f ubuntu       # force removal
docker image prune -a      # remove unused images
```

## 2. Container lifecycle

An image is the blueprint; a container is an instance created from that blueprint.

```bash
docker run ubuntu
docker run -it --name test ubuntu bash
```

Useful `docker run` flags:

| Flag | Meaning |
| --- | --- |
| `-it` | Interactive session with a terminal |
| `--name mycontainer` | Set a readable container name |
| `-d` | Run in the background (detached) |
| `--rm` | Remove the container automatically when it exits |

List containers and manage their state:

```bash
docker ps
docker ps -a              # running and stopped containers
docker ps -q              # container IDs only

docker start container_name
docker stop container_name
docker restart container_name

docker rm container_name
docker rm -f container_name    # force stop and remove
```

## 3. Commands inside a running container

`attach` connects to the container's main process. `exec` starts a new command in an already-running container.

```bash
docker attach container_name
docker exec -it container_name bash
```

`-i` keeps standard input open and `-t` allocates a terminal.

## 4. Networking and ports

Publish host port 8080 to Nginx port 80:

```bash
docker run -d --name web -p 8080:80 nginx
```

Open `http://localhost:8080` in a browser. With `-p`, the format is `host_port:container_port`; `-P` assigns random available host ports.

Create and use an isolated network:

```bash
docker network ls
docker network create mynet
docker run -d --name web-on-mynet --network=mynet nginx
```

Containers on the same user-defined network can communicate using their container names.

## 5. Volumes and persistent data

Containers are disposable. Volumes persist data beyond a container's lifecycle.

```bash
docker volume create mydata
docker run -it --rm -v mydata:/data ubuntu bash
docker run -it --rm -v /host/path:/container/path ubuntu bash
docker run -it --rm -v mydata:/data:ro ubuntu bash
```

The second command is a named-volume mount, the third is a bind mount, and `:ro` makes a mount read-only.

## 6. Logs and monitoring

```bash
docker logs web
docker logs -f web          # stream logs
docker logs --tail 50 web   # most recent 50 lines
docker logs --since 10m web
docker stats
```

`docker stats` reports CPU, memory, network I/O, and disk I/O for containers.

## 7. Inspect and metadata

```bash
docker inspect web
```

The JSON output includes the container IP address, mounts, environment variables, and network configuration.

## 8. Building an image

This folder includes an example [Dockerfile](Dockerfile). Build it from this directory:

```bash
docker build -t myapp .
docker build -f Dockerfile -t myapp .
docker build --no-cache -t myapp .
```

Run the result:

```bash
docker run -d --name myapp-web -p 8081:80 myapp
```

Then visit `http://localhost:8081`.

## 9. Docker Compose overview

The included [docker-compose.yml](docker-compose.yml) defines the same Nginx service declaratively.

```bash
docker compose up
docker compose up -d --build
docker compose down
```

## 10. Cleanup commands

Use these carefully: they remove resources that Docker no longer considers in use.

```bash
docker container prune
docker image prune
docker system prune
docker system prune -a --volumes
```

`-a` removes all unused images, and `--volumes` also removes unused volumes.

## Minimal lab: Ubuntu + Nginx

Run these in order:

```bash
docker pull nginx
docker run -d --name web -p 8080:80 nginx
docker ps
docker logs web
docker stop web
docker rm web
```

## Key concept summary

| Concept | Meaning |
| --- | --- |
| Image | Immutable blueprint used to create containers |
| Container | Running (or stopped) instance of an image |
| Volume | Persistent container data storage |
| Network | Communication layer between containers |
| Dockerfile | Instructions used to build an image |
