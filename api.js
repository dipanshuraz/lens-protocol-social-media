import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://api.lens.dev'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

/* define a GraphQL query  */
export const exploreProfiles = gql`
query ExploreProfiles {
  exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
    items {
      id
      name
      bio
      handle
      picture {
        ... on MediaSet {
          original {
            url
          }
        }
      }
      stats {
        totalFollowers
      }
    }
  }
}
`

export const getProfile = gql`
query Profile($handle: Handle!) {
  profile(request: { handle: $handle }) {
    id
    name
    bio
    picture {
      ... on MediaSet {
        original {
          url
        }
      }
    }
    handle
  }
}
`

export const getPublications = gql`
  query Publications($id: ProfileId!, $limit: LimitScalar) {
    publications(request: {
      profileId: $id,
      publicationTypes: [POST],
      limit: $limit
    }) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  fragment PostFields on Post {
    id
    createdAt
    profile {
      ...ProfileFields
    }
    metadata {
      ...MetadataOutputFields
    }
  }
  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
        original {
          ...MediaFields
        }
      }
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    metadata
    isDefault
    handle
    picture {
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
  }
    
  fragment MediaFields on Media {
    url
    mimeType
  }
`

export const getPublication = gql`

query Publication($internalPublicationId: InternalPublicationId!) {
  publication(request: { publicationId: $internalPublicationId }) {
   __typename 
    ... on Post {
      ...PostFields
      __typename
    }
  }
}

fragment MediaFields on Media {
  url
  mimeType
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment PostFields on Post {
  id
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  appId
  hidden
  hasCollectedByMe,
  profile {
    ...ProfileFields
  }
}

fragment ProfileFields on Profile {
  id
  name
  bio
  metadata
  isDefault
  handle
  picture {
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
}
  
fragment MediaFields on Media {
  url
  mimeType
}
`