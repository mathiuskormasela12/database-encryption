// ========== Todo Model
// import all modules
import { Model, MongoosePlugin, ObjectID } from "@tsed/mongoose";
import { Property, Required } from "@tsed/schema";
import { fieldEncryption } from "mongoose-field-encryption";

const {SECRET_KEY} = process.env;
@Model()
@MongoosePlugin(fieldEncryption, {
	fields: ['title'],
	secret: SECRET_KEY,
	saltGenerator() {
		return SECRET_KEY;
	}
})
export class TodoModel {
	@ObjectID()
	_id: string;

	@Property()
	@Required()
	title: string;

	@Property()
	@Required()
	description: string;
}