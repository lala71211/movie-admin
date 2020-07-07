import React, { Component } from "react";
import { Row } from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { Colxx } from "../../components/common/CustomBootstrap";

const selectData = [
    { label: "Trung Quốc", value: "tq", key: 0 },
    { label: "Việt Nam", value: "vn", key: 1 },
    { label: "Mỹ", value: "usa", key: 2 }
  ];

export default class SingleReactSelect extends Component {
  constructor(props) {
    super(props);
  //   this.state = {
  //     selectedOption: ""
  //   };
  }
  handleSelect = selectedOption => {
    var e = {
      target:{
        name:"nation", value: selectedOption}
    }
    this.props.handleChangeSelect(e)
  };

  render() {
    // console.log(this.props.handleChangeSelect)
    return (
      <Row>
        <Colxx xxs="12" md="6" className="mb-5">
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            value={this.props.selectedOption}
            onChange={this.handleSelect}
            options={selectData}
          />
        </Colxx>
      </Row>
    );
  }
}
