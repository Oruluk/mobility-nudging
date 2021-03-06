import React from 'react';
import { graphql, createFragmentContainer, commitMutation } from 'react-relay';
import Page from 'components/Page/Page';
import createEventMutation from 'components/mutations/CreateEventMutation/CreateEventMutation';

import { withAuth } from 'modules/auth/utils';
import { Button, Segment, Header, Label, Statistic, Form, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'found';
import styles from './FinishedScreen.scss';
import classNames from 'classnames';


const FinishSessionMutation = graphql`
  mutation FinishedScreenMutation (
    $sessionId: ID!
  ) {
    finishSession(sessionId: $sessionId) {
      session {
        id
      }
    }
  }
`;


class FinishedScreen extends React.Component {
  state = {
    sessionId: this.props.match.params.sessionId,
    lastBlockId: this.props.match.params.lastBlockId,
    surveyLink: '',
  }

  componentWillMount(){
    this.identifySessionConfigId()

    const eventVariables =  {
      event: "Finish session",
      userId: this.props.viewer.user.id,
      blockId: this.state.lastBlockId,
      sessionId: this.state.sessionId,

      screen: "FinishedScreen",
      providedFlexibilityTime: 0,
      targetChargingLevel: 0,
      targetMinimumChargingLevel: 0,
      chargingLevelRepresentation: "None",
    }

    this.createEvent(eventVariables)

    const FinishSessionVariables = {
      sessionId: this.state.sessionId,
    };

    commitMutation(this.props.relay.environment, {
          mutation: FinishSessionMutation,
          variables: FinishSessionVariables,
          onCompleted: (resp) => {
            console.log("Finished Session")

          },
          onError: (err) => {
            console.error(err)
          },
        }
      );
  }

  identifySessionConfigId = () => {
    const sessions = this.props.viewer.sessions
    const sessionId = this.state.sessionId
    var surveyLink = ''
    for (var i = 0; i < sessions.length; i++){
      if (sessions[i].id == this.state.sessionId){
        surveyLink = sessions[i].sessionConfig.surveyLink
        break;
      }
    }
    this.setState({surveyLink: surveyLink})
    console.log(surveyLink)
  }

  // onButtonClick = () => {
  //   const eventVariables =  {
  //     event: "Finished experiment",
  //     userId: this.props.viewer.user.id,
  //     blockId: this.state.lastBlockId,
  //     sessionId: this.state.sessionId,
  //
  //     screen: "FinishedScreen",
  //     providedFlexibilityTime: 0,
  //     targetChargingLevel: 0,
  //     targetMinimumChargingLevel: 0,
  //     chargingLevelRepresentation: "None",
  //   }
  //
  //   this.createEvent(eventVariables)
  //
  //   this.props.router.push('/');
  //
  // }

  createEvent = (eventVariables) => {
    createEventMutation(this.props.relay.environment, eventVariables, this.onCompletedCreateEvent, this.setErrors);
  }

  onCompletedCreateEvent = () => {
    console.log('created event')
  }


  render() {
    const lime_src = this.state.surveyLink+"&id="+this.state.sessionId+"|"+this.state.lastBlockId
    console.log(lime_src)
    return (
      <Page title='Edision' viewer={this.props.viewer}>
        <section className={styles.container}>
          <Segment padded='very' className={styles.segment}>
            Done
            <a href={lime_src}>
              <Button fluid color="green" className={styles.confirmationButton} >
                Umfrage starten und Experiment abschließen
              </Button>
            </a>
          </Segment>
      </section>
      </Page>
    );
  }
}

export default createFragmentContainer(
  withAuth(FinishedScreen),
  graphql`
    fragment FinishedScreen_viewer on Viewer {
      ...Page_viewer
      user{
        id
      }
      sessions{
        id
        sessionConfig{
          surveyLink
        }
      }
    }
  `,
);
