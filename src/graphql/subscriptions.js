/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject($filter: ModelSubscriptionProjectFilterInput) {
    onCreateProject(filter: $filter) {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject($filter: ModelSubscriptionProjectFilterInput) {
    onUpdateProject(filter: $filter) {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject($filter: ModelSubscriptionProjectFilterInput) {
    onDeleteProject(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateCompanion = /* GraphQL */ `
  subscription OnCreateCompanion(
    $filter: ModelSubscriptionCompanionFilterInput
  ) {
    onCreateCompanion(filter: $filter) {
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
export const onUpdateCompanion = /* GraphQL */ `
  subscription OnUpdateCompanion(
    $filter: ModelSubscriptionCompanionFilterInput
  ) {
    onUpdateCompanion(filter: $filter) {
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
export const onDeleteCompanion = /* GraphQL */ `
  subscription OnDeleteCompanion(
    $filter: ModelSubscriptionCompanionFilterInput
  ) {
    onDeleteCompanion(filter: $filter) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
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
export const onCreateCollaborator = /* GraphQL */ `
  subscription OnCreateCollaborator(
    $filter: ModelSubscriptionCollaboratorFilterInput
  ) {
    onCreateCollaborator(filter: $filter) {
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
export const onUpdateCollaborator = /* GraphQL */ `
  subscription OnUpdateCollaborator(
    $filter: ModelSubscriptionCollaboratorFilterInput
  ) {
    onUpdateCollaborator(filter: $filter) {
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
export const onDeleteCollaborator = /* GraphQL */ `
  subscription OnDeleteCollaborator(
    $filter: ModelSubscriptionCollaboratorFilterInput
  ) {
    onDeleteCollaborator(filter: $filter) {
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
