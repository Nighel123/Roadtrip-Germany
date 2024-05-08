import "../css/global.css";
import "../css/insertRoadtrip.css";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addressValidator,
  dateValidator,
  descriptionValidator,
} from "../API/validators";
import {
  ChangeEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IRoadtripForm, AddressFrontend } from "common";
import React from "react";
import { addRoadtrip } from "../API/roadtrips";
import profilePrev from "../IMG/global/profilePrev.jpg";
import { useNavigate } from "react-router-dom";

const InsertRoadtrip: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setError,
    clearErrors,
    watch,
  } = useForm<IRoadtripForm>({
    mode: "onBlur",
    defaultValues: {
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      startTown: "Hamburg",
      startLand: "Deutschland",
      destTown: "Spain",
      destLand: "Barcelona",
      day: 3,
      month: "Oktober",
      year: 2025,
      file: undefined,
    },
  });
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(profilePrev);
  const [roadtrip, setRoadtrip] = useState("");
  const { ref, ...rest } = register("file");
  useImperativeHandle(ref, () => hiddenInputRef.current);
  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    rest.onChange(event);
    if (!event.target.files) return;
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
  };
  const onUpload = () => {
    hiddenInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<IRoadtripForm> = (data: IRoadtripForm, e) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "file") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key as keyof IRoadtripForm] as string);
      }
    }

    addRoadtrip(formData).then(({ data: { message }, status }) => {
      if (status !== 201) {
        setRoadtrip(message);
        return;
      }
      setRoadtrip("Der Roadtrip wurde erfolgreich eingestellt.");
      navigate("/routsOverview", { state: { reloadRoadtrips: true } });
    });
  };

  const startTown = watch("startTown"),
    startLand = watch("startLand");
  useEffect(() => {
    /* check whether something was inputted in the concering fields */
    const { startTown: startTownDirty, startLand: startLandDirty } =
      dirtyFields;
    if (startTownDirty && startLandDirty) {
      const address: AddressFrontend = { land: startLand, town: startTown };
      addressValidator(address).then(({ data, status }) => {
        if (status !== 200) {
          setError("startTown", {
            type: "manual",
            message: data.message,
          });
          return;
        }
        clearErrors("startTown");
      });
    }
  }, [startLand, startTown]);

  const destTown = watch("destTown"),
    destLand = watch("destLand");
  useEffect(() => {
    /* check whether something was inputted in the concering fields */
    const { destTown: destTownDirty, destLand: destLandDirty } = dirtyFields;
    if (destTownDirty && destLandDirty) {
      const address: AddressFrontend = { land: destLand, town: destTown };
      addressValidator(address).then(({ data, status }) => {
        if (status !== 200) {
          setError("destTown", {
            type: "manual",
            message: data.message,
          });
          return;
        }
        clearErrors("destTown");
      });
    }
  }, [destLand, destTown]);

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

  return (
    <div className="insertRoadtrip">
      <header>
        <h1 id="heading">eigenen Roadtrip erstellen</h1>
      </header>

      <div id="insertRoadtripImage"></div>
      <form id="insertRoadtripForm" onSubmit={handleSubmit(onSubmit)}>
        <p>Wo wollt ihr losfahren?</p>
        <div id="startAddress">
          <input
            type="text"
            id="startLand"
            {...register("startLand", {
              required: {
                value: true,
                message: "bitte gebe ein Land in dem du starten möchtest ein.",
              },
            })}
            placeholder="Land"
          />

          <input
            type="text"
            id="startTown"
            {...register("startTown", {
              required: {
                value: true,
                message:
                  "bitte gebe eine Stadt ein, in der du starten möchtest.",
              },
            })}
            placeholder="Stadt"
          />
        </div>

        <div className="startLand startTown errorDisplay">
          {errors.startTown && <p role="alert">{errors.startTown.message}</p>}
          {errors.startLand && <p role="alert">{errors.startLand.message}</p>}
        </div>
        <p>Wo wollt ihr hin?</p>
        <div id="destAddress">
          <input
            id="destLand"
            {...register("destLand", {
              required: {
                value: true,
                message: "bitte gebe ein Land in dem du starten möchtest ein.",
              },
            })}
            placeholder="Land"
          />

          <input
            id="destTown"
            {...register("destTown", {
              required: {
                value: true,
                message:
                  "bitte gebe eine Stadt ein, in der du starten möchtest.",
              },
            })}
            placeholder="Stadt"
          />
        </div>

        <div className="destLand destTown errorDisplay">
          {errors.destTown && <p role="alert">{errors.destTown.message}</p>}
          {errors.destLand && <p role="alert">{errors.destLand.message}</p>}
        </div>
        <p>Wann wollt ihr losfahren?</p>
        <div id="date">
          <input
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
            placeholder="Tag"
            style={{ width: "15%" }}
          />
          <select
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
            {/* You could also try to do it like this. But somehow it does not work...
             {months.map((month,i)=><option value={month} key={i}>{month}</option>)} */}
          </select>
          <input
            id="year"
            {...register("year", {
              required: { value: true, message: "Jahr fehlt" },
              min: {
                value: new Date().getFullYear() - 1,
                message: "Das Jahr sollte in der Zukunft liegen!",
              },
            })}
            placeholder="Jahr"
            style={{ width: "30%" }}
          />
        </div>
        <div className="date errorDisplay">
          {errors.day && <p role="alert">{errors.day.message}</p>}
          {errors.month && <p role="alert">{errors.month.message}</p>}
          {errors.year && <p role="alert">{errors.year.message}</p>}
        </div>
        <p>
          Beschreibe in einem Text wer du bist und was du auf deiner Reise
          vorhast:
        </p>
        <textarea
          id="descr"
          {...register("description", {
            required: { value: true, message: "Beschreibungstext fehlt." },
            validate: (value) =>
              descriptionValidator(value).then(({ data, status }) => {
                if (status !== 200) {
                  return data.message;
                }
                return true;
              }),
          })}
        ></textarea>
        <div className="descr errorDisplay">
          {errors.description && (
            <p role="alert">{errors.description.message}</p>
          )}
        </div>
        {/* image uploader */}
        <div id="imgUpl">
          <input
            type="file"
            {...rest}
            onChange={handleUploadedFile}
            ref={hiddenInputRef}
            style={{ display: "none" }}
          />
          <img src={preview} id="imgPre" />
          <label id="selFile" onClick={onUpload}></label>
          {roadtrip ? <p style={{ color: "red" }}>{roadtrip}</p> : null}
        </div>
        <input type="submit" id="insertRoadtrip" value="" />
      </form>
    </div>
  );
};

export default InsertRoadtrip;
