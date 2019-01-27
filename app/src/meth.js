import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";
import client from './feathers';

class Meth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensores_array:[ ],
      sensores_name_array:[ ],
      rgbaindex: 0,
      rgbacolors : ["rgba(216, 251, 172,1)","rgba(19, 196, 223,1)","rgba(13, 191, 134,1)","rgba(231, 75, 34,1)",],
      dataLine: {
        labels: ["00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00","07:00:00","08:00:00","09:00:00","10:00:00","11:00:00","12:00:00",
                  "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00","20:00:00","21:00:00","22:00:00","23:00:00"],
        datasets: [ ]
      }
    }
  }
/******************************************************************************/
/*** utilitaries functions                                                  ***/

 concat_meths(array){
  var index;
  var meths_array = [ ];
  for (index in array){
     meths_array = meths_array.concat(array[index].meth)
  }
  if(meths_array.length > 23){
    meths_array = meths_array.slice(Math.max(meths_array.length - 24, 1));
  }
  return meths_array;
}
 concat_sensors(array){
  var index;
  var sensors_array = [ ];
  for (index in array){
    sensors_array = sensors_array.concat(array[index].SsID)
  }
  return sensors_array;
}
 concat_sensors_names(array){
  var index;
  var names_array = [ ];
  for (index in array){
    names_array = names_array.concat(array[index].name)
  }
  return names_array;
}

 data_chart(meth_array,SsID,rgba){
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
    data: meth_array
  };
  return data_set;
}



/*****                                                                    *****/
/******************************************************************************/
    componentDidMount(){
      this.setdata();

    }
    componentWillUnmount(){
      this.setdata();
    }

    setdata =()=>{
      const methane_service = client.service('metano');
      const sensors_service = client.service('sensores');
      Promise.all([sensors_service.find({
        query:{
          type: "metano"
        }
      }
    )]).then((response) =>{
        var sensores =  response[0].data;
        var sensores_array = this.concat_sensors(sensores);
        var sensores_name_array = this.concat_sensors_names(sensores);
          this.setState((state, props) => ({
            sensores_array :sensores_array,
            sensores_name_array:sensores_name_array
          }));
          var index ;
          for (index in sensores_array){
              Promise.all([methane_service.find({
                query:{
                  $limit:100,
                  $sort:{
                    createdAt:1
                  },
                  SsID: sensores_array[index]
                }
              })]).then((response)=>{
                var sensor_data = response[0].data;
                console.log('sensor datos :', sensor_data);
                var rgba_index = this.state.rgbaindex;
                var rgba_colors = this.state.rgbacolors;
                var sensores_names = this.state.sensores_name_array;
                var sensores_meth_array = this.concat_meths(sensor_data);
                var dataset = this.data_chart(sensores_meth_array,sensores_names[rgba_index],rgba_colors[rgba_index]);
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
      const dataLine = this.state.dataLine;
      console.log('data render:',dataLine);
      return (
        <div>
          <MDBContainer>
            <h3 className="mt-5">Methane Sensors Indicators </h3>
            <Line data={this.state.dataLine} options={{responsive: true }} />
          </MDBContainer>
        </div>
      );
  }
}

export default Meth;
