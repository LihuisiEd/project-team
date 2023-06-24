import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum PostStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export enum TaskStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}



type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
  };
  readonly id: string;
  readonly title: string;
  readonly status: PostStatus | keyof typeof PostStatus;
  readonly rating?: number | null;
  readonly content?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
  };
  readonly id: string;
  readonly title: string;
  readonly status: PostStatus | keyof typeof PostStatus;
  readonly rating?: number | null;
  readonly content?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Project, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly projectName: string;
  readonly description: string;
  readonly creatorID: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
  readonly userProjectsId?: string | null;
}

type LazyProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Project, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly projectName: string;
  readonly description: string;
  readonly creatorID: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
  readonly userProjectsId?: string | null;
}

export declare type Project = LazyLoading extends LazyLoadingDisabled ? EagerProject : LazyProject

export declare const Project: (new (init: ModelInit<Project>) => Project) & {
  copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly createdAt: string;
  readonly projects?: (Project | null)[] | null;
  readonly companions?: (Companion | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly createdAt: string;
  readonly projects: AsyncCollection<Project>;
  readonly companions: AsyncCollection<Companion>;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerCompanion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Companion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly user?: User | null;
  readonly companionID: string;
  readonly companion?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userCompanionsId?: string | null;
}

type LazyCompanion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Companion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly user: AsyncItem<User | undefined>;
  readonly companionID: string;
  readonly companion: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userCompanionsId?: string | null;
}

export declare type Companion = LazyLoading extends LazyLoadingDisabled ? EagerCompanion : LazyCompanion

export declare const Companion: (new (init: ModelInit<Companion>) => Companion) & {
  copyOf(source: Companion, mutator: (draft: MutableModel<Companion>) => MutableModel<Companion> | void): Companion;
}

type EagerTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: string;
  readonly projectID: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: string;
  readonly projectID: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Task = LazyLoading extends LazyLoadingDisabled ? EagerTask : LazyTask

export declare const Task: (new (init: ModelInit<Task>) => Task) & {
  copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}

type EagerCollaborator = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Collaborator, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly projectID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCollaborator = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Collaborator, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly projectID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Collaborator = LazyLoading extends LazyLoadingDisabled ? EagerCollaborator : LazyCollaborator

export declare const Collaborator: (new (init: ModelInit<Collaborator>) => Collaborator) & {
  copyOf(source: Collaborator, mutator: (draft: MutableModel<Collaborator>) => MutableModel<Collaborator> | void): Collaborator;
}