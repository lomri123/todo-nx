# todo-nx

Yet another todo project showcasing a monorepo built using NX.

containing a server, a main app and a package (being consumed by the main app)


## How to run

1. install project dependencies

```
npm i
```

2. build the project

```
npm run build
```

3. start the server (default port 3333)

```
nx serve todo-server
```


4. start the main app (default port 4200)

```
nx serve main
```
