// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PostStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const TaskStatus = {
  "NOT_STARTED": "NOT_STARTED",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETED": "COMPLETED"
};

const { Post, Project, User, Companion, Task, Collaborator } = initSchema(schema);

export {
  Post,
  Project,
  User,
  Companion,
  Task,
  Collaborator,
  PostStatus,
  TaskStatus
};