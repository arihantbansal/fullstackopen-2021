const mongoose = require("mongoose");

const len = process.argv.length;

if (len < 3) {
	console.log(
		"Please provide the password as an argument: node mongo.js <password>"
	);
	process.exit(1);
}

const password = process.argv[2];

// if (len == 5) {
//     const name = process.argv[3];
//     const number = process.argv[4];
// }

const url = `mongodb+srv://fullstack:${password}@cluster0.l7chy.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (len === 3) {
	console.log("phonebook: ");
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`);
		});
		mongoose.connection.close();
	});
} else if (len === 5) {
	const name = process.argv[3];
	const number = process.argv[4];
	const person = new Person({ name, number });
	person.save().then(result => {
		console.log(`added ${name} number ${number} to phonebook`);
		mongoose.connection.close();
	});
}
