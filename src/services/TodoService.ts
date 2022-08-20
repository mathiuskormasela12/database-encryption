// ========== TodoService
// import all modules
import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { TodoModel } from "../models";
import { DatabaseEncryptionService } from "./DatabaseEncryptionService";

@Injectable()
export class TodoService {
	constructor(
		@Inject(TodoModel)
		private readonly todoModel: MongooseModel<TodoModel>,

		@Inject(DatabaseEncryptionService) 
		private readonly databaseEncryptionService: DatabaseEncryptionService
	) {}

	public async addTodo(@BodyParams() body: TodoModel) {
		const encryptedField = this.databaseEncryptionService.encrypt(this.todoModel, { title: body.title.toLowerCase() })

		try {
			const todo = await this.todoModel.findOne({
				title: encryptedField.title
			})

			if(todo) {
				return {
					message: 'Todo is available'
				}
			}

			try {
				await this.todoModel.create({
					title: body.title.toLowerCase(),
					description: body.description
				})

				return {
					message: 'Todo has been inserted sucessfully'
				}
			} catch (err) {
				return {
					message: err.message
				}
			}
		} catch (err) {
			return {
				message: err.message
			}
		}
	}

	public async getAllTodos() {
		try {
			const todos = await this.todoModel.find()

			return {
				message: 'Success to get all todos',
				results: todos
			}
		} catch (err) {
			return {
				message: err.message,
				results: []
			}
		}
	}

	public async getTodo(@PathParams('id') id: string) {
		try {
			const todo = await this.todoModel.findById(id);

			if(!todo) {
				return {
					message: 'The todo does not exist',
					result: null
				}
			}

			return {
				message: 'The todo does not exist',
				result: todo
			}
		} catch (err) {
			return {
				message: err.message,
				result: null
			}
		}
	}

	public async updateTodo(
		@PathParams('id') id: string,

		@BodyParams() body: TodoModel
	) {
		try {
			const todo = await this.todoModel.findByIdAndUpdate(id, {
				$set: {
					title: body.title.toLowerCase(),
					description: body.description
				}
			})

			if(!todo) {
				return {
					message: 'Todo is not found'
				}
			}

			return {
				message: 'Todo has been edited successfully'
			}
		} catch (err) {
			return {
				message: err.message
			}
		}
	}

	public async deleteTodo(@PathParams('id') id: string) {
		try {
			const todo = await this.todoModel.findByIdAndRemove(id);

			if(!todo) {
				return {
					message: 'The todo does not exist',
				}
			}

			return {
				message: 'The todo has been removed',
			}
		} catch (err) {
			return {
				message: err.message,
			}
		}
	}

	public async encryptAllTitleFields() {
		try {
			const todos = await this.todoModel.find();

			for (const todo of todos) {
				try {
					await this.todoModel.findByIdAndUpdate(todo._id, {
						$set: {
							title: todo.title
						}
					})
					console.log('Encrypted');
				} catch (err) {
					console.log(err);
				}	
			}

			return {
				message: 'Encrypted'
			}
		} catch (err) {
			return {
				message: err.message
			}
		}
	}
}