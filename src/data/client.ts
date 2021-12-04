// To-Do Plus
// client.ts
// @author Miroslav Safar (xsafar23)

import { ToDoListClient } from "../../lib/todo-client";
import TodoListRestClient from "../../lib/rest-client";

// Rest client instance for UI 
const restClient : ToDoListClient = new TodoListRestClient("https://api.todoplus.safar.dev/public");

export default restClient;