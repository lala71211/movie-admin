import React, { useState, Fragment, useEffect } from 'react';
import { Row } from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import FormikCustomComponents from "../../../../containers/form-validations/FormikCustomComponents";
import axios from "axios";
import { apiActor } from "../../../../constants/defaultValues";


const EditActorPage = (props) => {
  const [actor, setActor] = useState({
    id:0,
    name:"",
    avatar:"",
    nation:"",
    characters:[],
  })

  useEffect(() => {
    editData()
  },[props.match.params]);
  
  const editData = () => {
    axios.get(`${apiActor}` + props.match.params.id)
      .then(res => {
        return res.data;
      }).then(data => {
        // console.log(data);
        setActor(data.result);
      })
  }
  // console.log(actor)
  return (
    <Fragment>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb
            heading="menu.form-edit-actor"
            match={props.match}
          />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xs="12" md="6" className="mb-3">
          <h5 className="mb-4">
            <IntlMessages id="forms.edit-actor-title" />
          </h5>
          <FormikCustomComponents actor={actor} />

        </Colxx>
      </Row>
    </Fragment>
  )
}
EditActorPage.propTypes = {};

export default EditActorPage;

// export default class EditActor extends Component {
//     constructor(props) {
//       super(props);
//       // console.log(props);
//       this.state = {
//         actor: null
//       }
//     }
//     editActor(){
//       axios.get(`${apiActor}`+ this.props.match.params.id)
//       .then(res => {
//         // console.log(res);
//         return res.data;
//       }).then(data => {
//         this.setState({
//           actor: data.data,
//         })
//       })
//     }
//     componentDidMount(){
//      console.log('componentDidMount');
//       this.editActor();
//     }
//     componentDidUpdate(){
//       // console.log('componentDidUpdate');
//       this.editActor();
//     }
//     render() {
//       const {actor} = this.state
//       return (

//       );
//     }
//   }