/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      status
      rating
      content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      status
      rating
      content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      status
      rating
      content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      projectName
      description
      creatorID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userProjectsId
      __typename
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      projectName
      description
      creatorID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userProjectsId
      __typename
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      projectName
      description
      creatorID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userProjectsId
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      phoneNumber
      createdAt
      projects {
        items {
          id
          projectName
          description
          creatorID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userProjectsId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      companions {
        items {
          id
          userID
          companionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userCompanionsId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      phoneNumber
      createdAt
      projects {
        items {
          id
          projectName
          description
          creatorID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userProjectsId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      companions {
        items {
          id
          userID
          companionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userCompanionsId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      phoneNumber
      createdAt
      projects {
        items {
          id
          projectName
          description
          creatorID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userProjectsId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      companions {
        items {
          id
          userID
          companionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userCompanionsId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createCompanion = /* GraphQL */ `
  mutation CreateCompanion(
    $input: CreateCompanionInput!
    $condition: ModelCompanionConditionInput
  ) {
    createCompanion(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        name
        email
        phoneNumber
        createdAt
        projects {
          nextToken
          startedAt
          __typename
        }
        companions {
          nextToken
          startedAt
          __typename
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      companionID
      companion {
        id
        name
        email
        phoneNumber
        createdAt
        projects {
          nextToken
          startedAt
          __typename
        }
        companions {
          nextToken
          startedAt
          __typename
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCompanionsId
      __typename
    }
  }
`;
export const updateCompanion = /* GraphQL */ `
  mutation UpdateCompanion(
    $input: UpdateCompanionInput!
    $condition: ModelCompanionConditionInput
  ) {
    updateCompanion(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        name
        email
        phoneNumber
        createdAt
        projects {
          nextToken
          startedAt
          __typename
        }
        companions {
          nextToken
          startedAt
          __typename
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      companionID
      companion {
        id
        name
        email
        phoneNumber
        createdAt
        projects {
          nextToken
          startedAt
          __typename
        }
        companions {
          nextToken
          startedAt
          __typename
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCompanionsId
      __typename
    }
  }
`;
export const deleteCompanion = /* GraphQL */ `
  mutation DeleteCompanion(
    $input: DeleteCompanionInput!
    $condition: ModelCompanionConditionInput
  ) {
    deleteCompanion(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        name
        email
        phoneNumber
        createdAt
        projects {
          nextToken
          startedAt
          __typename
        }
        companions {
          nextToken
          startedAt
          __typename
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      companionID
      companion {
        id
        name
        email
        phoneNumber
        createdAt
        projects {
          nextToken
          startedAt
          __typename
        }
        companions {
          nextToken
          startedAt
          __typename
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCompanionsId
      __typename
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      name
      description
      status
      projectID
      startDate
      endDate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      name
      description
      status
      projectID
      startDate
      endDate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      name
      description
      status
      projectID
      startDate
      endDate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createCollaborator = /* GraphQL */ `
  mutation CreateCollaborator(
    $input: CreateCollaboratorInput!
    $condition: ModelCollaboratorConditionInput
  ) {
    createCollaborator(input: $input, condition: $condition) {
      id
      userID
      projectID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateCollaborator = /* GraphQL */ `
  mutation UpdateCollaborator(
    $input: UpdateCollaboratorInput!
    $condition: ModelCollaboratorConditionInput
  ) {
    updateCollaborator(input: $input, condition: $condition) {
      id
      userID
      projectID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteCollaborator = /* GraphQL */ `
  mutation DeleteCollaborator(
    $input: DeleteCollaboratorInput!
    $condition: ModelCollaboratorConditionInput
  ) {
    deleteCollaborator(input: $input, condition: $condition) {
      id
      userID
      projectID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
