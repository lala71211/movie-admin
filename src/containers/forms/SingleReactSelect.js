import React, { Component } from "react";
import { Row } from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { Colxx } from "../../components/common/CustomBootstrap";

export default class SingleReactSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      selectedOption: ""
    };
  }
  handleChangeMulti = selectedOptions => {
    var e = {
      target: {
        name: "roles", value: selectedOptions
      }
    }
    this.props.handleChangeSelect(e)
  };
  handleSelect = selectedOption => {
    var e = {
      target: {
        name: "nation", value: selectedOption
      }
    }
    this.props.handleChangeSelect(e)
  };

  render() {
    // console.log(this.props.handleChangeSelect)
    const { options, isMulti,selectedOption,selectedOptions } = this.props
    // console.log(options)
    return !isMulti ? (
      <Row>
        <Colxx xxs="12" md="12" className="mb-5">
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            isMulti={isMulti}
            value={selectedOption}
            onChange={this.handleSelect}
            options={options}
          />
        </Colxx>
      </Row>) : (
        <Row>
          <Colxx xxs="12" md="12">
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              isMulti={isMulti}
              name="form-field-name"
              value={selectedOptions}
              onChange={this.handleChangeMulti}
              options={options}
            />
          </Colxx>
        </Row>
      )
  }
}
