const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();

app.use(express.json());

const projects = [];

app.get('/projects', (request, response) => {
    //const { title, owner } = request.query;

    return response.json(projects)
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuidv4(), title, owner}

    projects.push(project); // esse push vai jogar a criação do nosso projeto para o nosso array

    return response.json(project);  // sempre retornar o projeto recén criado e nunca exibir a lista completa
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params; // aqui pegamos nosso ID
    const { title, owner } = request.body; // retornando uma nova informação

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Projeto não foi encontrado' });
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;


    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Projeto não foi encontrado' });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333);