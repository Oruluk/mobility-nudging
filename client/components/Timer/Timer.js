import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import { Button, Segment, Header, Label, Statistic, Form, Icon, Popup , TimePicker } from 'semantic-ui-react';
import { Link } from 'found';
// import { DateTimePicker } from 'react-widgets'
import TimePicker1 from 'rc-time-picker'
// import 'react-widgets/dist/css/react-widgets.css';
// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets-globalize';
import classNames from 'classnames';
import moment from 'moment'
import 'rc-time-picker/assets/index.css';
// import momentLocaliser from 'react-widgets-moment'
// import styles from './Timer.scss';


const now = moment().hour(14).minute(30);


class Timer extends React.Component {


  onChangeTimer = (value) => {
    console.log(value && value.format(str));
  }

  render() {

    return (

        <TimePicker1
          defaultValue={now}
          showSecond={false}
          onChange={this.onChangeTimer}/>
    );
  }
}

export default Timer
