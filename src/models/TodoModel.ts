// ========== Todo Model
// import all modules
import { Model, ObjectID } from "@tsed/mongoose";
import { Property, Required } from "@tsed/schema";

@Model()
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