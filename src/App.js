import React, { useLayoutEffect } from 'react';
import './App.css';
import { Table, Input, Layout, Button, Row, message, Space, Col } from 'antd';
import Buscador from './Buscador'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class App extends React.Component {
  state = {
    informacion: '',
    buttonDisabled: true,
    User: 'xchohermenegildo',
    Token: '11.8839813279919',
    origen_acceso_id: '',
    valor_acceso: '',
    codigo_estado: 1,
    usuario_id: 15
  }

  datosDeBusqueda = (newInfo) => {
    this.setState({ informacion: newInfo })
  }


  handlePost = () => {
    var { User, Token, usuario_id, codigo_estado, usuario_id } = this.state
    let data = this.state.informacion.data[0].origen_acceso;
    data.map((elemento, i) => {
      if (elemento.update === true) {
        fetch('https://app.crmetric.com/srv-crmetric-web-cdc-test/rest/usuario/actualizarOrigenAcceso',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "Sess": {
                "User": User,
                "Token": Token,
                "origen_acceso_id": elemento.origen_acceso_id, // element
                "valor_acceso": elemento.valor_acceso, // element
                "codigo_estado": codigo_estado,
                "usuario_id": usuario_id
              }
            })
          })
          .then(x => x.json())
          .then(x => message.success(<p>Código: {x.codigo} <br/> Mensaje: {x.mensaje} </p>))
      }
    })
  }

  handleUpdate = ({ target }) => {
    this.setState({
      buttonDisabled: false
    })
    var { name, value } = target
    this.state.informacion.data[0].origen_acceso[name].valor_acceso = value;
    this.state.informacion.data[0].origen_acceso[name].update = true;
  }



  render() {
    var stateData = this.state.informacion
    const { Footer, Content } = Layout;

    if (stateData.data != null && stateData.data.length > 0) {
      var recorrer = stateData.data[0].origen_acceso
      var fila = recorrer.map((elemento, i) => {
        var datos = elemento
        datos.key = i
        return datos
      })
    }

    const columns = [
      {
        title: 'Codigo Estado',
        dataIndex: 'codigo_estado',
        key: 'codigo_estado',
      },
      {
        title: 'Fecha Actualizacion',
        dataIndex: 'fecha_actualizacion',
        key: 'fecha_actualizacion',
      },
      {
        title: 'Origen Acceso ID',
        dataIndex: 'origen_acceso_id',
        key: 'origen_acceso_id',
      },
      {
        title: 'Tipo Acceso',
        key: 'tipo_acceso',
        dataIndex: 'tipo_acceso',
      },
      {
        title: 'Usuario Actualizacion',
        key: 'usuario_actualizacion',
        dataIndex: 'usuario_actualizacion'
      },
      {
        title: 'Usuario Login Actualizacion',
        key: 'usuario_login_actualizacion',
        dataIndex: 'usuario_login_actualizacion'
      },
      {
        title: 'Valor Acceso',
        key: 'valor_acceso',
        dataIndex: 'valor_acceso',
        render: (value, row, index) => {
          return <Input value={value} name={index} onChange={this.handleUpdate} />
        }
      },
    ];


    return (
      <Layout>
        <Content >
          <Row justify="center">
            <Col >
              <Buscador datosDeBusqueda={this.datosDeBusqueda} />
              <Space size="large">
                <Row>
                  <Table columns={columns} dataSource={fila} locale={{ emptyText: 'No hay datos para mostrar' }} scroll={{ x: '1024px' }} />
                </Row>
              </Space>
              <Footer>
                <Button onClick={this.handlePost} type="primary" disabled={this.state.buttonDisabled} >Actualizar Data</Button>
              </Footer>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
export default App;