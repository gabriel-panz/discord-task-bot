import { TaskDataContext } from "../interfaces/dataContext";
import { task, user } from "../types/task";

class TasksRepository {
  private _context: TaskDataContext;

  constructor(dataContext?: TaskDataContext) {
    if (dataContext) this._context = dataContext;
    else this._context = { users: [] };
  }

  public byId(userId: string): user | undefined {
    return this._context.users.find((x) => x.userId === userId);
  }

  public insert(user: user) {
    let userIndex = this._context.users.findIndex(
      (x) => x.userId === user.userId
    );

    if (userIndex === -1) this._context.users.push(user);

    return;
  }

  public upsert(user: user) {
    let userIndex = this._context.users.findIndex(
      (x) => x.userId === user.userId
    );

    if (userIndex === -1)
      this._context.users.push(user);
    else
      this._context.users[userIndex].tasks = this._context.users[userIndex].tasks.concat(user.tasks);

    return;
  }

  public removeTask(userId: string, taskId: string): boolean {
    let index = this._context.users.findIndex((x) => x.userId === userId);
    if (index === -1) return false;

    this._context.users[index].tasks = this._context.users[index].tasks.filter(
      (x, i) => i + 1 !== Number.parseInt(taskId)
    );
    return true;
  }
}

export default TasksRepository;
