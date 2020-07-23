import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormikReactSelect,
  FormikDatePicker
} from "./FormikFields";
import { Row, Card, CardBody, FormGroup, Label, Button,CardTitle } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import DropzoneExample from "../forms/DropzoneExample";
// import Todo from "../../components/applications/TodoListItem"

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  select: Yup.string().required("A select option is required!"),
  quality: Yup.string().required("Chọn chất lượng"),
  imdb: Yup.number()
    .min(0, "Lớn hơn 0")
    .max(10, "Nhỏ hơn 10")
    .required("Nhập giá trị"),
  runtime: Yup.number()
    .min(0, "Lớn hơn 0")
    .required("Nhập giá trị"),
  reactSelect: Yup.array()
    .min(3, "Pick at least 3 tags")
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
    ),
  checkboxSingle: Yup.bool().oneOf([true], "Must agree to something"),
  checkboxCustomSingle: Yup.bool().oneOf([true], "Must agree to something"),
  checkboxGroup: Yup.array()
    .min(2, "Pick at least 2 tags")
    .required("At least one checkbox is required"),

  customCheckGroup: Yup.array()
    .min(2, "Pick at least 2 tags")
    .required("At least one checkbox is required"),

  radioGroup: Yup.string().required("A radio option is required"),
  customRadioGroup: Yup.string().required("A radio option is required"),
  tags: Yup.array()
    .min(3, "Pick at least 3 tags")
    .required("At least one checkbox is required"),
  switch: Yup.bool().oneOf([true], "Must agree to something"),
  date: Yup.date()
    .nullable()
    .required("Date required"),
  details: Yup.string().required("Please provide the details")
});

const options = [
  { value: "food", label: "Food" },
  { value: "beingfabulous", label: "Being Fabulous", disabled: true },
  { value: "reasonml", label: "ReasonML" },
  { value: "unicorns", label: "Unicorns" },
  { value: "kittens", label: "Kittens" }
];

class FormikCustomComponents extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log(props)
  }

  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      reactSelect: values.reactSelect.map(t => t.value)
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  render() {
    let {movie} = this.props;
    // console.log(movie);
    return (
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  email: movie.title,
                  select: "3",
                  reactSelect: [{ value: "reasonml", label: "ReasonML" }],
                  checkboxGroup: ["kittens"],
                  customCheckGroup: ["unicorns"], 
                  checkboxSingle: true,
                  checkboxCustomSingle: false,
                  radioGroup: "",
                  customRadioGroup: "",
                  tags: ["cake", "dessert"],
                  switch: false,
                  date: null
                }}
                validationSchema={SignupSchema}
                onSubmit={this.handleSubmit}>
                {({
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  isSubmitting
                }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <FormGroup row>
                        {/* Title */}
                        <Colxx sm={6}>
                          <FormGroup className="error-l-100" >
                            <Label>
                              <IntlMessages id="forms.title" />
                            </Label>
                            <Field className="form-control" name="email" />
                            {errors.email && touched.email ? (
                              <div className="invalid-feedback d-block">
                                {errors.email}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        {/* Quality */}
                        <Colxx sm={3}>
                          <FormGroup className="error-l-100">
                            <Label>
                              <IntlMessages id="forms.quality" />
                            </Label>
                            <select
                              name="select"
                              className="form-control"
                              value={values.select}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Select an option..</option>
                              <option value="1">SD</option>
                              <option value="2">HD</option>
                              <option value="3">FullHD</option>
                              <option value="4">4K</option>
                            </select>

                            {errors.select && touched.select ? (
                              <div className="invalid-feedback d-block">
                                {errors.select}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        {/* Ngôn ngữ */}
                        <Colxx sm={3}>
                          <FormGroup className="error-l-100">
                            <Label>
                              <IntlMessages id="forms.language" />
                            </Label>
                            <select
                              name="select"
                              className="form-control"
                              value={values.select}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Select an option..</option>
                              <option value="1">Phụ đề Việt</option>
                              <option value="2">Tiếng việt</option>
                              <option value="3">Engsub</option>
                            </select>

                            {errors.select && touched.select ? (
                              <div className="invalid-feedback d-block">
                                {errors.select}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>

                        {/* Imdb */}
                        <Colxx sm={3}>
                          <FormGroup className="error-l-100" >
                            <Label>
                              <IntlMessages id="forms.imdb" />
                            </Label>
                            <Field className="form-control" name="imdb" type="number" />
                            {errors.imdb && touched.imdb ? (
                              <div className="invalid-feedback d-block">
                                {errors.imdb}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        {/* Runtime */}
                        <Colxx sm={3}>
                          <FormGroup className="error-l-100" >
                            <Label>
                              <IntlMessages id="forms.runtime" />
                            </Label>
                            <Field className="form-control" name="runtime" type="number" />
                            {errors.runtime && touched.runtime ? (
                              <div className="invalid-feedback d-block">
                                {errors.runtime}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        {/* Release date */}
                        <Colxx sm={3}>
                          <FormGroup className="error-l-100">
                            <Label className="d-block">
                              <IntlMessages id="forms.release-date" />
                            </Label>
                            <FormikDatePicker
                              name="date"
                              value={values.date}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.date && touched.date ? (
                              <div className="invalid-feedback d-block">
                                {errors.date}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>

                        {/* View */}
                        <Colxx sm={3}>
                          <FormGroup className="error-l-100" >
                            <Label>
                              <IntlMessages id="forms.view" />
                            </Label>
                            <Field className="form-control" name="runtime" type="number" />
                            {errors.runtime && touched.runtime ? (
                              <div className="invalid-feedback d-block">
                                {errors.runtime}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                      </FormGroup>

                      <FormGroup className="error-l-100">
                        <Label>React Select </Label>
                        <FormikReactSelect
                          name="reactSelect"
                          id="reactSelect"
                          value={values.reactSelect}
                          isMulti={true}
                          options={options}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.reactSelect && touched.reactSelect ? (
                          <div className="invalid-feedback d-block">
                            {errors.reactSelect}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="error-l-50">
                        <Label>Details</Label>
                        <Field
                          className="form-control"
                          name="details"
                          component="textarea"
                        />
                        {errors.details && touched.details ? (
                          <div className="invalid-feedback d-block">
                            {errors.details}
                          </div>
                        ) : null}
                      </FormGroup>

                      <Row className="mb-4">
                        <Colxx xxs="12">
                          <Card>
                            <CardBody>
                              <CardTitle>
                                <IntlMessages id="form-components.dropzone" />
                              </CardTitle>
                              <DropzoneExample />
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>
                      
                      <Row className="mb-4">
                        <Colxx xxs="12">
                          <Card>
                            <CardBody>
                              <CardTitle>
                                <IntlMessages id="form-components.dropzone-multi" />
                              </CardTitle>
                              <DropzoneExample />
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>
                      <Button color="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                  )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
export default FormikCustomComponents;
