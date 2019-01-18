import React, { Component } from 'react';
import {Button,Alert,Container} from 'reactstrap';
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import client from './feathers';

class Temp extends Component {
  constructor(props) {
    super(props);
  this.state.dataLine.datasets[0].data =[35, 29, 30, 21, 36, 35, 40,30,40,33,30,31,33,34,30,34,34,33,26,21,23,27,25,26]
  }
  state = {
      dataLine: {
        labels: ["00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00","07:00:00","08:00:00","09:00:00","10:00:00","11:00:00","12:00:00",
                  "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00","20:00:00","21:00:00","22:00:00","23:00:00"],
        datasets: [
          {
            label: "ds18bx10",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(0,204,102,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(0,204,102,5)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            //debe ser igual a los datos de las ultimas 24 horas
            data: [35, 29, 30, 21, 36, 35, 40,30,40,33,30,31,33,34,30,34,34,33,26,21,23,27,25,26]
          },
          {
            label: "ds18bx20",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(51,153,255,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(51,153,255,5)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            //debe ser igual a los datos de las ultimas 24 horas
            data: [6, 5, 8, 8, 6, 5, 4,6,3,2,9,1,3,9,10,23,15,27,18,20,12,28,30,20]
          }
        ]
      }
    }
    componentDidMount(){
      const temp_service = client.service('temperatura');
    }
  render() {
      return (
        <Container>
          <MDBContainer>
            <h3 className="mt-5">Celcious Grades</h3>
            <Line data={this.state.dataLine} options={{ responsive: true }} />
          </MDBContainer>
        </Container>
      );
    }
  }


export default Temp;
