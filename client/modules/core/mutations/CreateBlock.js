import {commitMutation, graphql} from 'react-relay';


const mutation = graphql`
mutation CreateBlockMutation(
  $user: ID!,
  $blockConfig: ID!,
  $session: ID!
) {
  createBlock(
    user: $user,
    blockConfig: $blockConfig,
    session: $session,
  ) {
    block {
      user{
        id
      }
      blockConfig{
        id
      }
    }
  }
}
`;

export default function createBlock(environment, variables, onCompleted = null, onError = null) {
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted,
      onError
    }
  );
}
