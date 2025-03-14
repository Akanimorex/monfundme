import { gql } from '@apollo/client';

export const GET_CAMPAIGNS = gql`
 query Campaigns {
  Campaign(where: {isActive: {_eq: true}}, order_by: {createdAt: desc}) {
    id
    closedAt
    completedAt
    createdAt
    currentAmount
    deadline
    description
    donations {
      amount
      timestamp
      donator_id
      id
    }
    image
    isClosed
    isCompleted
    owner_id
    status
    targetAmount
    targetReachedAt
    title
  }
}
`;

export const GET_CAMPAIGN_BY_ID = gql`
 query CampaignById($id: String!) {
  Campaign(where: {id: {_eq: $id}}) {
    id
    closedAt
    completedAt
    createdAt
    currentAmount
    deadline
    description
    donations {
      amount
      timestamp
      donator_id
      id
    }
    image
    isClosed
    isCompleted
    owner_id
    status
    targetAmount
    targetReachedAt
    title
  }
}
`;

export const GET_ACCOUNT = gql`
  query GetAccount($id: String!) {
   Account(where: {id: {_eq: $id}}) {
    id
    campaignsOwned {
      id
      image
      isActive
      isClosed
      isCompleted
      title
      targetAmount
      targetReachedAt
      currentAmount
      deadline
    }
    donations {
      amount
      timestamp
      id
      campaign {
        title
      }
    }
   }
}
`;
