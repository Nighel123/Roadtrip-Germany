import { useEffect, useState, FocusEvent } from "react";
import "../css/register.css";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  emailValidator,
  userNameValidator,
  passwordValidator,
  dateValidator,
} from "../API/validators";
import { register as registerUser } from "../API/users";
import { IRegisterInputs } from "common";

const Register: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [resError, setResError] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setError,
    clearErrors,
    watch,
  } = useForm<IRegisterInputs>({
    mode: "onBlur",
    defaultValues: {
      userName: "Nighel",
      email: "nickel.paulsen@gmail.com",
      password: "123Aa%jafjdak;",
      day: 3,
      month: "Januar",
      year: 2023,
    },
  });

  const day = watch("day"),
    month = watch("month"),
    year = watch("year");

  /* to see if the date is valid */
  useEffect(() => {
    /* check whether something was inputted in the concering fields */
    const { day: dayDirty, month: monthDirty, year: yearDirty } = dirtyFields;
    if (dayDirty && monthDirty && yearDirty) {
      dateValidator(day, month, year).then(({ data, status }) => {
        if (status !== 200) {
          setError("day", {
            type: "manual",
            message: data.message,
          });
          return;
        }
        clearErrors("day");
      });
    }
  }, [day, month, year]);

  const onSubmit: SubmitHandler<IRegisterInputs> = (
    data: IRegisterInputs,
    e
  ) => {
    e?.preventDefault();
    registerUser(data).then(({ data, status }) => {
      if (status !== 201) {
        setResError(data.message);
        return;
      }
      setSuccess(true);
      setTimeout(() => navigate(-1), 3000);
    });
  };

  return (
    <div className="register">
      <header>Roadtrip-Konto erstellen</header>
      <div id="content">
        <div id="registerSide"></div>
        {success ? (
          <p id="succErrMessg" style={{ color: "green" }}>
            Die Registrierung war erfolgreich!
          </p>
        ) : (
          <div id="registerFrame">
            <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
              <p>Nutzername</p>
              <input
                type="text"
                id="usrName"
                {...register("userName", {
                  required: { value: true, message: "Name fehlt" },
                  validate: (value) =>
                    userNameValidator(value).then(({ data, status }) => {
                      if (status !== 200) {
                        return data.message;
                      }
                      return true;
                    }),
                })}
              />
              {errors.userName && <p role="alert">{errors.userName.message}</p>}
              <p>E-Mail-Adresse</p>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: { value: true, message: "email fehlt" },
                  validate: (value) =>
                    emailValidator(value).then(({ data, status }) => {
                      if (status !== 200) {
                        return data.message;
                      }
                      return true;
                    }),
                })}
              />
              {errors.email && <p role="alert">{errors.email.message}</p>}

              <p>Passwort</p>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: { value: true, message: "Passwort fehlt" },
                  validate: (value) =>
                    passwordValidator(value).then(({ data, status }) => {
                      if (status !== 200) {
                        return data.message;
                      }
                      return true;
                    }),
                })}
              />
              {errors.password && <p role="alert">{errors.password.message}</p>}

              <p>Geburtstag</p>
              <input
                placeholder="Tag"
                style={{ width: "15%" }}
                id="day"
                {...register("day", {
                  required: { value: true, message: "Tag fehlt" },
                  min: {
                    value: 1,
                    message: "Der Tag sollte größer als 0 sein.",
                  },
                  max: {
                    value: 31,
                    message: "Der Tag sollte kleiner als 32 sein.",
                  },
                })}
              />

              <select
                style={{ width: "40%" }}
                id="month"
                {...register("month", {
                  required: { value: true, message: "Monat fehlt" },
                })}
              >
                <option value="default" defaultValue="wähle Monat">
                  wähle Monat
                </option>
                <option value="Januar">Januar</option>
                <option value="Februar">Februar</option>
                <option value="März">März</option>
                <option value="April">April</option>
                <option value="Mai">Mai</option>
                <option value="Juni">Juni</option>
                <option value="Juli">Juli</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="Oktober">Oktober</option>
                <option value="November">November</option>
                <option value="Dezember">Dezember</option>
              </select>
              <input
                placeholder="Jahr"
                style={{ width: "30%" }}
                {...register("year", {
                  required: { value: true, message: "Jahr fehlt" },
                  min: {
                    value: new Date().getFullYear() - 1,
                    message: "Das Jahr sollte in der Zukunft liegen!",
                  },
                })}
              />
              {errors.day && <p role="alert">{errors.day.message}</p>}
              {errors.month && <p role="alert">{errors.month.message}</p>}
              {errors.year && <p role="alert">{errors.year.message}</p>}
              <p>Geschlecht</p>
              <select
                style={{ width: "100%" }}
                {...register("sex", {
                  required: { value: true, message: "Geschlecht fehlt" },
                })}
              >
                <option value="Weiblich">Weiblich</option>
                <option value="Männlich">Männlich</option>
              </select>

              <input type="submit" id="registrieren" value="" />
              {resError && (
                <p
                  role="alert"
                  style={{
                    color: "red",
                    marginTop: "3em",
                    textAlign: "center",
                  }}
                >
                  {resError}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
