import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import Neighbour from 'components/Nudges/Neighbour/Neighbour'
import RankingScreen from 'components/Nudges/RankingScreen/RankingScreen';
import { withAuth } from 'modules/auth/utils';
import { Button, Segment, Header, Label, Statistic, Form, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'found';
import styles from './HomeView.scss';
import classNames from 'classnames';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
//import Slider, { Range } from 'rc-slider';
//import 'rc-slider/assets/index.css';

//import Tooltip from 'rc-tooltip';
//import ReactSlider from 'react-slider';
import HorizontalSlider from 'components/Slider/Slider';
import SliderUI from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const REACT_VERSION = React.version

class HomeView extends React.Component {

  state = {
    endTime: '19:28',
    active: 'flexibility',
    sliderValue: 90,
  }

  onClickFlexibility = () => {
    const endTime = '19:28';
    const newStatus = 'flexibility';
    this.setState({...this.state, endTime: '19:28', active: newStatus});
  }

  onClickNoFlexibility = () => {
    const endTime = '18:15';
    const newStatus = 'noFlexibility';
    this.setState({...this.state, endTime: '18:15', active: newStatus});
  }


  handleSliderChange = (event, value) => {
     this.setState({sliderValue: value});
   };
  // handleOnSliderChange = (value) => {
  //   this.setState({
  //     value: value
  //   })
  // }
  //
  // handle = (value) => {
  //   this.setState({
  //     value: value
  //   })
  // }

  render() {
    console.log(this.props.viewer)
    return (
      <Page title='Mobility Nudging' viewer={this.props.viewer}>
        <section className={styles.container}>




          <Segment padded='very'>



            <div className={styles.currentTime}>
              <Segment floated='right'>
                  <Icon name='clock' size='large' />
                16:11
              </Segment>


            </div>


           <Popup position='top-left'
           trigger={
              <Icon name='winner' size='huge' />
            }
            content={<RankingScreen/>}
            />


            <div className={styles.timeContainer}>


              <div className={styles.timeSegment}>

                <Statistic className={styles.timeLabel}>
                  <Statistic.Label>Geladen um</Statistic.Label>
                  <Statistic.Value>{this.state.endTime}</Statistic.Value>
                </Statistic>

              </div>
            </div>



            <div className={styles.sliderContainer}>
              <MuiThemeProvider>
                <SliderUI
                  styles={{marginBottom: '10px !important'}}
                  className={styles.slider}
                  min={0}
                  max={100}
                  step={1}
                  value={this.state.sliderValue}
                  onChange={this.handleSliderChange}/>
              </MuiThemeProvider>

              <div className={styles.chargingLabel}>
                Ladeziel {this.state.sliderValue} %
              </div>
            </div>










        <Form className={styles.form}>
          <Button.Group widths="2" basic className={styles.buttonGroup}>
            <Button
              id="flexibility"
              onClick={this.onClickFlexibility}
              active={this.state.active == "flexibility"}
              >
              Flexibilität bereitstellen
            </Button>

            <Button
              id="noFlexibility"
              onClick={this.onClickNoFlexibility}
              active={this.state.active == "noFlexibility"}
              >
              Keine Flexibilität bereitstellen
            </Button>

          </Button.Group>

          <Button fluid color="green" className={styles.conformationButton}>
            Bestätigen
          </Button>
        </Form>
          </Segment>

      </section>
      </Page>
    );
  }
}

export default createFragmentContainer(
  withAuth(HomeView),
  graphql`
    fragment HomeView_viewer on Viewer {
      ...Page_viewer
      user{
        id
      }
      blockConfigs {
          id
          nudge
          chargeStatus
          nudge
          clocktime
      }
    }
  `,
);
