import React, { Component } from 'react';
import { Input, Button, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class Buscador extends Component {
  state = {
    User: 'xchohermenegildo',
    Token: '11.8839813279919',
    usuario_id: 51,
    busquedaUser: '',
    busquedaToken: '',
    busquedaId: ''
  }

  busqueda = React.createRef();
  busqueda1 = React.createRef();
  busqueda2 = React.createRef();

 /* componentDidMount(){
    this.handleCall()
  }
  */

  handleCall = () => {
    var { User, Token, usuario_id, busquedaUser, busquedaToken, busquedaId } = this.state
    fetch('https://app.crmetric.com/srv-crmetric-web-cdc-test/rest/usuario/listarOrigenAcceso',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Sess": {
            "User": busquedaUser || User,
            "Token": busquedaToken || Token,
            "usuario_id": busquedaId || usuario_id
          }

        })
      })
      .then(x => x.json())
      .then(x => datosDeBusqueda(x))
      var datosDeBusqueda = this.props.datosDeBusqueda
  }


  handleBuscar = ({ target }) => {
    var { name, value } = target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Row>
        <Input.Group compact >
          <Input ref={this.busqueda} style={{ width: '20%' }} placeholder="User" name="busquedaUser" type="text" onChange={this.handleBuscar} />
          <Input ref={this.busqueda1} style={{ width: '20%' }} placeholder="Token" name="busquedaToken" type="number" onChange={this.handleBuscar} />
          <Input ref={this.busqueda2} style={{ width: '20%' }} placeholder="User ID" name="busquedaId" type="number" onChange={this.handleBuscar} />
          <Button onClick={this.handleCall} type="primary" icon={<SearchOutlined />}>Buscar</Button>
        </Input.Group>
      </Row>
    );
  }
}

export default Buscador;