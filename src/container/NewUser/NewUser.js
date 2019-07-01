import React, { Component } from "react";
import "./NewUser.css";
import { Link, withRouter } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import axios from "axios";
import { reqURL, reqConfig } from "../../config/req";

class NewUser extends Component {
  state = {
    editableUser: null,
    isFormValid: false,
    formControls: {
      first_name: {
        value: "",
        label: "First Name",
        type: "text",
        valid: false,
        touched: false,
        errorMessage: "first name is required",
        validation: {
          required: true
        }
      },
      last_name: {
        value: "",
        label: "Last Name",
        type: "text",
        valid: false,
        touched: false,
        errorMessage: "Last name is required",
        validation: {
          required: true
        }
      },
      gender: {
        value: "male",
        label: "Gender",
        options: ["male", "female"],
        valid: false,
        touched: false,
        errorMessage: "gender is required",
        validation: {
          required: true
        }
      },
      dob: {
        value: "",
        label: "Date of birth",
        options: ["male", "female"],
        valid: false,
        touched: false,
        validation: {
          required: false
        }
      },
      email: {
        value: "",
        label: "Email",
        type: "text",
        valid: false,
        touched: false,
        errorMessage: "email is required",
        validation: {
          required: true
        }
      },
      phone: {
        value: "",
        label: "Phone",
        type: "number",
        valid: false,
        touched: false,
        validation: {
          required: false
        }
      },
      website: {
        value: "",
        label: "Website",
        type: "text",
        valid: false,
        touched: false,
        validation: {
          required: false
        }
      },
      address: {
        value: "",
        label: "address",
        type: "text",
        valid: false,
        touched: false,
        validation: {
          required: false
        }
      }
    }
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
  };

  renderFormFields = () => {
    return Object.keys(this.state.formControls).map((key, index) => {
      const field = { ...this.state.formControls[key] };

      const { value, label, type, valid, touched, errorMessage } = field;
      if (key === "gender") {
        return (
          <select
            key={key}
            onChange={event => this.onChangeHandler(event, key)}
            value={field.value}
          >
            {field.options.map((opt, i) => {
              return (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              );
            })}
          </select>
        );
      }
      return (
        <React.Fragment key={key}>
          <Input
            type={type}
            placeholder={label}
            defaultValue={value}
            touched={touched.toString()}
            valid={valid.toString()}
            onChange={event => this.onChangeHandler(event, key)}
          />
          {!valid && <span style={{ color: "red" }}>{errorMessage}</span>}
        </React.Fragment>
      );
    });
  };

  onSubmitHandler = async () => {
    const field = this.state.formControls;
    const userId = this.props.match.params.id;

    const data = {
      first_name: field.first_name.value,
      last_name: field.last_name.value,
      gender: field.gender.value,
      email: field.email.value,
      dob: field.dob.value,
      phone: field.phone.value,
      website: field.website.value,
      address: field.address.value
    };
    if (this.props.edit) {
      const res = await axios.patch(
        `${reqURL.getAll}/${userId}`,
        data,
        reqConfig
      );
      console.log(res);
    } else {
      const res = await axios.post(reqURL.getAll, data, reqConfig);
    }
    // console.log(this.state.formControls);
  };

  componentDidMount() {
    if (this.props.edit) {
      const userId = this.props.match.params.id;
      const url = reqURL.getAll + `/${userId}`;
      const fields = { ...this.state.formControls };
      axios
        .get(url, reqConfig)
        .then(res => {
          const data = res.data.result;
          Object.keys(fields).map(key => {
            let copyField = fields[key];
            copyField.value = data[key];
          });
          this.setState({
            formControls: fields
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    return (
      <div className="NewUser wrapper">
        <h1>Sign UP!</h1>

        {this.renderFormFields()}

        <button onClick={() => this.onSubmitHandler()}>
          {this.props.edit ? "Edit" : "Add"}
        </button>

        <Link to="/">Back home</Link>
      </div>
    );
  }
}

export default withRouter(NewUser);
