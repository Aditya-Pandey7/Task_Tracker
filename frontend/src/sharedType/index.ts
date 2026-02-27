export interface IUser {
  id: string;
  username: string;
  email: string;
  tasks: ITaskData[];
}

export interface IApiresponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
}

export interface ITaskData {
  title: string;
  description: string;
  status: "not started" | "on track" | "off track";
  dueDate: string;
  time: string;
  repeat: string;
  priority: "high" | "medium" | "low";
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isCompleted: boolean;
  assignedTo?: string;
  user: string;
}
