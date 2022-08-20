// ========= TodoController
// import all modules
import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Post, Put } from "@tsed/schema";
import { TodoModel } from "../../../models";
import { TodoService } from "../../../services";

@Controller('/todo')
export class TodoController {
	constructor(
		@Inject(TodoService)
		private readonly todoService: TodoService,
	) {}

	@Post('/')
	public addTodo(@BodyParams() body: TodoModel) {
		return this.todoService.addTodo(body);
	}

	@Get('/')
	public getAllTodos() {
		return this.todoService.getAllTodos();
	}

	@Get('/:id')
	public getTodo(@PathParams('id') id: string) {
		return this.todoService.getTodo(id)
	}

	@Put('/:id')
	public updateTodo(
		@PathParams('id') id: string,

		@BodyParams() body: TodoModel
	) {
		return this.todoService.updateTodo(id, body);
	}

	@Delete('/:id')
	public deleteTodo(@PathParams('id') id: string) {
		return this.todoService.deleteTodo(id);
	}

	@Put('/encrypt/title')
	public encryptAllTitleFields() {
		return this.todoService.encryptAllTitleFields();
	}
}