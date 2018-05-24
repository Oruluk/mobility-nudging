import React from 'react';
import { graphql, createRefetchContainer, commitMutation } from 'react-relay';
import Page from 'components/Page/Page';

import { withAuth } from 'modules/auth/utils';
import { Button, Segment, Header, Label, Statistic, Form, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'found';
import styles from './FeedbackScreen.scss';
import classNames from 'classnames';


const FinishBlockMutation = graphql`
  mutation FeedbackScreen_FinishBlock_Mutation (
    $blockId: ID!
  ) {
    finishBlock(blockId: $blockId) {
      block {
        id
      }
    }
  }
`;

class FeedbackScreen extends React.Component {

  state = {
    sessionId: this.props.match.params.sessionId,
    blockConfigId: this.props.viewer.blockConfigs[parseInt(this.props.match.params.blockNumber)-1].id,
    blockNumber: parseInt(this.props.match.params.blockNumber),
    blockId: this.props.match.params.blockId,
    nextScreen: "",
    feedbackConfig: {
      heading: "",
      text: "",
    },
    errors: []
  }

  setErrors = (errors) => {
    this.setState({ ...this.state, errors });
  }


  componentWillMount(){
    this.initialize()
  }

  initialize = () => {

    const blockConfigs = this.identifyRelevantBlockConfigs()

    const blockConfig = blockConfigs[this.state.blockNumber-1]

    const feedbackConfig = this.state.feedbackConfig
    const heading = blockConfig.feedback.heading
    const text = blockConfig.feedback.text

    feedbackConfig['heading'] = heading
    feedbackConfig['text'] = text

    this.setState({feedbackConfig: feedbackConfig})


  }

  identifyRelevantBlockConfigs = () => {
      // Identify all blockConfigs that match to current session
      const sessions = this.props.viewer.sessions
      var sessionConfigId  = ""

      for (var i = 0; i < sessions.length; i++){
        if (sessions[i].id == this.state.sessionId){
          sessionConfigId = sessions[i].sessionConfig.id
        }
      }

      const sessionBlockConfigs = this.props.viewer.sessionBlockConfigs
      var blockConfigIds = []

      for (var i = 0; i < sessionBlockConfigs.length; i++){
        if (sessionBlockConfigs[i].sessionConfig.id == sessionConfigId){
          blockConfigIds.push(sessionBlockConfigs[i].blockConfig.id)
        }
      }

      var blockConfigs = []
      const allBlockConfigs = this.props.viewer.blockConfigs

      for (var i = 0; i < blockConfigIds.length; i++){
        for (var j = 0; j < allBlockConfigs.length; j++){
          if (allBlockConfigs[j].id == blockConfigIds[i]){
            blockConfigs.push(allBlockConfigs[j])
          }
        }
      }
      return(blockConfigs)
  }

  handleButtonClick = () => {
    const FinishBlockVariables = {
      blockId: this.state.blockId,
    };

    commitMutation(this.props.relay.environment, {
          mutation: FinishBlockMutation,
          variables: FinishBlockVariables,
          onCompleted: (resp) => {
            console.log("Finished Block")
            this.nextScreen()
          },
          onError: (err) => {
            console.error(err)
          },
        }
      );
  }

  nextScreen = () => {
    var nextScreen = ""
    if (this.state.blockNumber+1 > this.props.viewer.blockConfigs.length){
        nextScreen = `/done/${this.state.sessionId}`
    }
    else {
        const blockNumber = this.state.blockNumber + 1
        nextScreen = `/context/${blockNumber}/${this.state.sessionId}`
    }
    this.setState({ ...this.state, nextScreen });
    this.props.router.push(nextScreen)
  }

  render() {
    return (
      <Page title='Mobility Nudging' viewer={this.props.viewer}>
        <section className={styles.container}>
          <Segment padded='very'>
            <p>{this.state.feedbackConfig.heading}</p>
            {this.state.feedbackConfig.text}
            <p></p>
            <Button onClick={this.handleButtonClick} fluid color="green" className={styles.Button} >
              Weiter
            </Button>
          </Segment>
      </section>
      </Page>
    );
  }
}

export default createRefetchContainer(
  withAuth(FeedbackScreen),
  {
  viewer: graphql`
      fragment FeedbackScreen_viewer on Viewer{
        ...Page_viewer
        sessions{
          id
          sessionConfig{
            id
          }
        }
        sessionBlockConfigs{
          id
          sessionConfig{
            id
          }
          blockConfig{
            id
          }
        }
        blockConfigs{
          id
          feedback{
            id
            name
            heading
            text
          }
        }
      }

      `,
  },

);
