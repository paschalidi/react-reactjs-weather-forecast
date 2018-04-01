import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Grid } from 'semantic-ui-react';
import Layout from '../components/layout';
import ButtonPlusMinusNumber from '../components/ButtonPlusMinusNumber';


const LineChart = require('react-chartjs').Line;
const MS = 1000;

class Index extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static async getInitialProps() {
    const CITY = 'Berlin,DE';
    const UNITS = 'metric';
    const APP_ID = 'f30a039a18a689aa85bfbd0b1a09de2a';
    const entry = await axios({
      method: 'get',
      url: `http://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${APP_ID}`
    });
    return entry.data;
  }
  
  constructor(props) {
    super(props);
    this.state = {
      
      lastAddedDate: props.dt,
      timeData: [props.dt],
      formattedTimeData: [this.timstampToFormattedDate(props.dt)],
      temperatureData: [props.main.temp],
      minTemperature: 10,
      maxTemperature: 15,
      timeInterval: 30
    };
    this.generateNextDataPoint.bind(this);
  }
  
  generateNextDataPoint = () => {
    const nextRandomTemperature = Math.floor(Math.random() * this.state.maxTemperature) + this.state.minTemperature;
    const nextDate = this.state.lastAddedDate + this.state.timeInterval * MS;
    const timeData = [...this.state.timeData, nextDate];
    const formattedTimeData = timeData.map(time => this.timstampToFormattedDate(time));
    this.setState({
      timeData,
      formattedTimeData,
      temperatureData: [...this.state.temperatureData, nextRandomTemperature],
      lastAddedDate: nextDate
    });
    
    setTimeout(this.generateNextDataPoint.bind(this), this.state.timeInterval * MS);
  };
  
  timstampToFormattedDate = (unix) => moment(unix).format('ddd, kk:mm:ss');
  
  onClick;
  
  render() {
    let chartOptions = {
      responsive: true,
      scales: {
        xAxes: [{
          type: 'time', time: { format: 'HH:mm' },
          scaleLabel: { display: true, labelString: 'Date' }
        }],
        yAxes: [{
          stacked: true,
          ticks: { min: this.timstampToFormattedDate(this.state.lastAddedDate), stepSize: 1 },
          scaleLabel: {
            display: true,
            labelString: 'probability'
          }
        }]
      }
    };
    let chartData = {
      labels: this.state.formattedTimeData,
      datasets: [{
        data: this.state.temperatureData,
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)'
      }]
      
    };
    
    return (
      <Layout title='Snuk code test!'>
        <Grid stackable container>
          <Grid.Row centered columns={1} style={{ paddingTop: '5vw' }}>
            <Grid.Column textAlign='center'>
              <LineChart data={chartData} options={chartOptions} width="800" height="400" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={3}>
            <Grid.Column textAlign='center'>
              <ButtonPlusMinusNumber
                title='Min. Temperature (Celsius)'
                value={this.state.minTemperature}
                clickPlus={(value) =>
                  this.state.minTemperature < this.state.maxTemperature - 1
                  &&
                  this.setState({ minTemperature: value + 1 })}
                clickMinus={(value) =>
                  this.state.minTemperature < this.state.maxTemperature
                  &&
                  this.state.minTemperature > 1
                  &&
                  this.setState({ minTemperature: value - 1 })}
              />
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <ButtonPlusMinusNumber
                title='Max. Temperature (Celsius)'
                value={this.state.maxTemperature}
                clickPlus={(value) =>
                  this.state.minTemperature < this.state.maxTemperature
                  &&
                  this.setState({ maxTemperature: value + 1 })}
                clickMinus={(value) =>
                  this.state.minTemperature < this.state.maxTemperature - 1
                  &&
                  this.setState({ maxTemperature: value - 1 })}
              />
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <ButtonPlusMinusNumber
                title='Time interval (Seconds)'
                value={this.state.timeInterval}
                clickPlus={(value) => this.setState({ timeInterval: value + 1 })}
                clickMinus={(value) =>
                  this.state.timeInterval > 1
                  &&
                  this.setState({ timeInterval: value - 1 })}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default Index;