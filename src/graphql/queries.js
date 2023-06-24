/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncProjects = /* GraphQL */ `
  query SyncProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCompanion = /* GraphQL */ `
  query GetCompanion($id: ID!) {
    getCompanion(id: $id) {
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
export const listCompanions = /* GraphQL */ `
  query ListCompanions(
    $filter: ModelCompanionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        user {
          id
          name
          email
          phoneNumber
          createdAt
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCompanions = /* GraphQL */ `
  query SyncCompanions(
    $filter: ModelCompanionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCompanions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        user {
          id
          name
          email
          phoneNumber
          createdAt
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTasks = /* GraphQL */ `
  query SyncTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCollaborator = /* GraphQL */ `
  query GetCollaborator($id: ID!) {
    getCollaborator(id: $id) {
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
export const listCollaborators = /* GraphQL */ `
  query ListCollaborators(
    $filter: ModelCollaboratorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollaborators(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCollaborators = /* GraphQL */ `
  query SyncCollaborators(
    $filter: ModelCollaboratorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCollaborators(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
