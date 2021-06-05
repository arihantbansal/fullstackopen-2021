const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

// eslint-disable-next-line no-unused-vars
morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (request, response) => {
	const date = new Date();

	Person.find({}).then(persons => {
		response.send(
			`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
		);
	});
});

app.get("/api/persons", (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons);
	});
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		// eslint-disable-next-line no-unused-vars
		.then(result => {
			response.status(204).end();
		})
		.catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
	const body = request.body;

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "missing name or number",
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then(savedPerson => {
			response.json(savedPerson.toJSON());
		})
		.catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson.toJSON());
		})
		.catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
