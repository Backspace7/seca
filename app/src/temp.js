import React, { Component } from 'react';
import {Button,Alert,Container} from 'reactstrap';
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import client from './feathers';

class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rgbaindex: 0,
      sensores_array:[ ],
      sensores_name_array:[ ],
      rgbacolors : ["rgba(216, 251, 172,1)","rgba(19, 196, 223,1)","rgba(13, 191, 134,1)","rgba(231, 75, 34,1)",],
      dataLine: {
        labels: ["00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00","07:00:00","08:00:00","09:00:00","10:00:00","11:00:00","12:00:00",
                  "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00","20:00:00","21:00:00","22:00:00","23:00:00"],
        datasets: [ ]
      }
    }
  }

/******************************************************************************/
/***                 Utilitaries functions                                  ***/
 concat_temps(array){
  var index;
  var temp_array = [ ];
  for (index in array){
    temp_array = temp_array.concat(array[index].temp)
  }
  if(temp_array.length > 23){
    temp_array = temp_array.slice(Math.max(temp_array.length - 24, 1));
  }
  return temp_array;
}
 concat_sens(array){
  var index;
  var sens_array = [ ];
  for (index in array){
    sens_array = sens_array.concat(array[index].SsID)
  }
  return sens_array;
}
 concat_sens_name(array){
  var index;
  var sens_array = [ ];
  for (index in array){
    sens_array = sens_array.concat(array[index].name)
  }
  return sens_array;
}

 data_chart(temp_array,SsID,rgba){
  var data_set = {
    label: SsID,
    fill: true,
    lineTension: 0.1,
    backgroundColor: "rgba(25,182,222,0.4)",
    borderColor: rgba,
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: "rgba(0,204,102,5)",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 2.5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: rgba,
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHoverBorderWidth: 2,
    pointRadius: 3,
    pointHitRadius: 15,
    data: temp_array
  };
  // console.log('data_set', data_set);
  return data_set;
}
/*****                                                                    *****/
/******************************************************************************/
    componentDidMount(){
        this.setdata();
    }
    setdata =()=>{
      const temperature_service = client.service('temperatura');
      const sensors_service = client.service('sensores');
      Promise.all([sensors_service.find({
        query:{
          type: "temperatura"
        }
      }
    )]).then((response) =>{
        var sensors_data =  response[0].data;
        var sensors_array = this.concat_sens(sensors_data);
        var sensors_name_array = this.concat_sens_name(sensors_data);
          this.setState((state, props) => ({
            sensors_array :sensors_array,
            sensors_name_array:sensors_name_array
          }));
          var index ;
          for (index in sensors_array){
              Promise.all([temperature_service.find({
                query:{
                  $limit:24,
                  $sort:{
                    createdAt:1
                  },
                  SsID: sensors_array[index]
                }
              })]).then((response)=>{
                var sensor_data = response[0].data;
                console.log('sensor datos :', sensor_data);
                var rgba_index = this.state.rgbaindex;
                var rgba_colors = this.state.rgbacolors;
                var sensores_name = this.state.sensors_name_array;
                var sensores_temp_array = this.concat_temps(sensor_data);
                var dataset = this.data_chart(sensores_temp_array,sensores_name[rgba_index],rgba_colors[rgba_index]);
                var dataLine =  this.state.dataLine;
                 dataLine.datasets =  dataLine.datasets.concat(dataset);
                rgba_index = rgba_index +1;
                this.setState((state,props)=>({
                  dataLine: dataLine,
                  rgbaindex: rgba_index
                }));
              });
          }
      });
    };
/*****                                                                    *****/
/******************************************************************************/
  render() {
      return (
        <div>
          <MDBContainer>
            <h3 className="mt-5">Temperature Sensors Indicators</h3>
            <Line data={this.state.dataLine} options={{responsive: true }} />
          </MDBContainer>
        </div>
      );
  }
}

export default Temp;
