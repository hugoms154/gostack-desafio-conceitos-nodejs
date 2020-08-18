const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository)
  return response.status(201).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repoIndex = repositories.findIndex(repository => id == repository.id)
  if (!isUuid(id) || repoIndex < 0) { return response.status(400).send({ error: "Invalid repository ID." }) }
  repositories[repoIndex] = {
    ...repositories[repoIndex],
    title,
    url,
    techs
  };
  return response.status(200).send(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repoIndex = repositories.findIndex(repository => id == repository.id)
  if (!isUuid(id) || repoIndex < 0) { return response.status(400).send({ error: "Invalid repository ID." }) }
  repositories.splice(repoIndex, 1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repository => id == repository.id)
  if (!isUuid(id) || repoIndex < 0) { return response.status(400).send({ error: "Invalid repository ID." }) }
  repositories[repoIndex] = {
    ...repositories[repoIndex],
    likes: repositories[repoIndex].likes + 1
  };
  return response.status(200).json(repositories[repoIndex].likes);
});

module.exports = app;
