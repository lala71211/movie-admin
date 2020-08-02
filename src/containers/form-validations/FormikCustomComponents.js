import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormikReactSelect,
  FormikDatePicker
} from "./FormikFields";

import { Row, Card, CardBody, FormGroup, Label, Button, CardTitle } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import DropzoneExample from "../forms/DropzoneExample";
// import MultiDropzone from "../forms/MultiDropzone";
import { connect } from "react-redux";
import { getListGenres } from "../../redux/genre/actions"
import { addMovie } from "../../redux/movie/actions"

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nhập tên phim"),
  selectQuality: Yup.string().required("Chọn chất lượng"),
  selectLanguage: Yup.string().required("Chọn ngôn ngữ"),
  imdb: Yup.number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .max(10, "Nhỏ hơn 10")
    .required("Nhập giá trị"),
  runtime: Yup.number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .required("Nhập giá trị"),
  view: Yup.number()
    .min(0, "Lớn hơn 0")
    .required("Nhập giá trị"),
  genres: Yup.array()
    .min(1, "Chọn ít nhất 1 thể loại")
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
    ),
  nation: Yup.string()
    .required("Nhập tên quốc gia"),
  adult: Yup.number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .required("Nhập giá trị"),
  date: Yup.date()
    .nullable()
    .required("Date required"),
  details: Yup.string().required("Cung cấp chi tiết phim")
});


class FormikCustomComponents extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.fillOptions = this.fillOptions.bind(this);
    this.state = {
      options: [],
      dropzoneconfig: { addedfile: (file) => this.handleImage(file) },
    }

  }

  handleSubmit = (values, { setSubmitting }) => {
    let temp = [];
    let { image } = this.state;
    values.genres.map(t =>
      temp.push({
        name: t.value,
        id: t.id,
      }))
    const payload = {
      ...values,
      genres: temp
    };

    console.log(payload);

    const formSubmit = new FormData();
    formSubmit.append('id', 0);
    formSubmit.append('title', payload.name);
    formSubmit.append('nation', payload.nation);
    formSubmit.append('adult', payload.adult);
    console.log(JSON.stringify(payload.genres))
    formSubmit.append('genres', JSON.stringify(payload.genres));
    formSubmit.append('imdb', payload.imdb);
    formSubmit.append('language', payload.selectLanguage);
    formSubmit.append('quality', payload.selectQuality);
    formSubmit.append('overview', payload.details);
    formSubmit.append('release_date', payload.date);
    formSubmit.append('view', payload.view);
    formSubmit.append('runtime', payload.runtime);
    if (image !== undefined) {
      formSubmit.append('poster', image);
    }
    console.log(image)
    this.props.addMovie(formSubmit)
    setSubmitting(false);

  };
  handleImage = file => {
    console.log(file)
    this.setState({ image: file })
    console.log(this.state.image)
  };
  getGenres() {
    if (this.props.items === null || this.props.items === undefined) {
      this.props.getListGenres("", "")
    }
  }
  fillOptions() {
    let options = [];
    if (this.props.genres !== undefined) {
      this.props.genres.map(item =>
        options.push({
          id: item.id,
          value: item.name,
          label: item.name
        })
      )
      // console.log(options)
      this.setState({ options: options })
    }
  }

  componentDidMount() {
    this.getGenres();
    setTimeout(() => {
      this.fillOptions();
    }, 1000)
  }

  render() {
    let { options, dropzoneconfig } = this.state;
    return (
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  name: '',
                  selectQuality: '',
                  selectLanguage: '',
                  runtime: 0,
                  view: 0,
                  imdb: 0,
                  genres: '',
                  date: null,
                  details: '',
                  nation: '',
                  adult: 0
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
                    <Form className="av-tooltip tooltip-label-right" onSubmit={handleSubmit}>
                      <FormGroup row>
                        {/* Title */}
                        <Colxx sm={6}>
                          <FormGroup className="error-l-100" >
                            <Label>
                              <IntlMessages id="forms.title" />
                            </Label>
                            <Field className="form-control" name="name" />
                            {errors.name && touched.name ? (
                              <div className="invalid-feedback d-block">
                                {errors.name}
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
                              name="selectQuality"
                              className="form-control"
                              value={values.selectQuality}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Select an option..</option>
                              <option value="SD">SD</option>
                              <option value="HD">HD</option>
                              <option value="FullHD">FullHD</option>
                              <option value="4K">4K</option>
                            </select>

                            {errors.selectQuality && touched.selectQuality ? (
                              <div className="invalid-feedback d-block">
                                {errors.selectQuality}
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
                              name="selectLanguage"
                              className="form-control"
                              value={values.selectLanguage}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Select an option..</option>
                              <option value="ja">Japsub</option>
                              <option value="vn">Vietsub</option>
                              <option value="en">Engsub</option>
                            </select>

                            {errors.selectLanguage && touched.selectLanguage ? (
                              <div className="invalid-feedback d-block">
                                {errors.selectLanguage}
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
                              va
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
                            <Field className="form-control" name="view" type="number" />
                            {errors.view && touched.view ? (
                              <div className="invalid-feedback d-block">
                                {errors.view}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                      </FormGroup>
                      <FormGroup row>
                        <Colxx sm={6}>
                          <FormGroup className="error-l-100">
                            <Label>
                              <IntlMessages id="forms.genre" />
                            </Label>
                            <FormikReactSelect
                              name="genres"
                              id="genres"
                              value={values.genres}
                              isMulti={true}
                              options={options}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.genres && touched.genres ? (
                              <div className="invalid-feedback d-block">
                                {errors.genres}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup className="error-l-100" >
                            <Label>
                              <IntlMessages id="forms.nation" />
                            </Label>
                            <Field className="form-control" name="nation" />
                            {errors.nation && touched.nation ? (
                              <div className="invalid-feedback d-block">
                                {errors.nation}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup className="error-l-100" >
                            <Label>
                              <IntlMessages id="forms.adult" />
                            </Label>
                            <Field className="form-control" name="adult" type="number" />
                            {errors.adult && touched.adult ? (
                              <div className="invalid-feedback d-block">
                                {errors.adult}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                      </FormGroup>
                      <FormGroup className="error-l-50">
                        <Label>
                          <IntlMessages id="forms.details" />
                        </Label>
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
                              <DropzoneExample eventHandler={dropzoneconfig} />
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>
                      {/* 
                      <Row className="mb-4">
                        <Colxx xxs="12">
                          <Card>
                            <CardBody>
                              <CardTitle>
                                <IntlMessages id="form-components.dropzone-multi" />
                              </CardTitle>
                              <MultiDropzone eventHandler={handleMultiImage}/>
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>. */}
                      <Button color="primary" type="submit" >Submit</Button>
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
const mapStateToProps = ({ genreData }) => {
  const { genres } = genreData;
  return { genres };

};

export default connect(
  mapStateToProps, {
  getListGenres,
  addMovie
}
)(FormikCustomComponents);