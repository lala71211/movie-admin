import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormikReactSelect,
  // FormikDatePicker
} from "./FormikFields";
import { DEFAULT_IMAGE, FIREBASE_PATH } from "../../constants/defaultValues";
import { storage } from "../../helpers/Firebase";
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import DropzoneExample from "../forms/DropzoneExample";
// import { getUrlImage } from "../../helpers/Utils";

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
  runtime: Yup.number().min(0, "Lớn hơn 0").required("Nhập giá trị"),
  reactSelect: Yup.array()
    .min(3, "Pick at least 3 tags")
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
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
  date: Yup.date().nullable().required("Date required"),
  details: Yup.string().required("Please provide the details"),
});

const options = [
  { value: "Việt Nam", label: "Việt Nam" },
  { value: "Trung Quốc", label: "Trung Quốc" },
  { value: "Mỹ", label: "Mỹ" },
  { value: "Nhật Bản", label: "Nhật Bản" },
  { value: "Hàn Quốc", label: "Hàn Quốc" },
];

const FormikCustomComponents = ({ actor }) => {
  const [imgUrl, setImgUrl] = useState(DEFAULT_IMAGE);
  const [editImg,setEditImg] = useState(DEFAULT_IMAGE);
  useEffect(() => {

    if (actor.avatar !== "") {
      let pathReference = storage.refFromURL(`${FIREBASE_PATH}/avatar`);
      let starsRef = pathReference.child(actor.avatar);

      starsRef
        .getDownloadURL()
        .then((url) => {
          setImgUrl(url);
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              break;

            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;

            default:
              break;
          }
        });
    }
  }, [actor]);

  useEffect(() => {
    actor.nation = options.filter((nation) => nation.value === actor.nation);
    // console.log('asb')
  })
  // useEffect(() => {
  //   handleSubmit();
  // },[])
  function handleSubmit(values, { setSubmitting }) {
    const payload = {
      ...values,
      nation: values.nation.map((t) => t.value),
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  }

  return (
    <Row className="mb-4">
      <Card className="mb-4"></Card>
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <img
              src={imgUrl}
              alt="Detail"
              className="card-img-top"
              style={{ marginBottom: "20px", height:"15%", width:"15%" }}
            />
            <Formik
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
              initialValues={actor}
              enableReinitialize={true}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup className="error-l-100">
                        <Label>
                          <IntlMessages id="forms.actor-name" />
                        </Label>
                        <Field
                          className="form-control"
                          name="name"
                          value={values.name}
                        ></Field>
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                  <FormGroup className="error-l-100">
                    <Label>
                      <IntlMessages id="forms.actor-nation" />
                    </Label>
                    <FormikReactSelect
                      name="nation"
                      id="nation"
                      value={values.nation}
                      isMulti={false}
                      options={options}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  </FormGroup>

                  <Row className="mb-4">
                    <Colxx xxs="12">
                      <Card>
                        <CardBody>
                          <CardTitle>
                            <IntlMessages id="forms.actor-avatar" />
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
};

export default FormikCustomComponents;
