// style
import H from "../styles/Home.module.css";

// styles
import PS from "../styles/projectScreen.module.css";

// react
import React, { useEffect, useState } from "react";

// context
import { useWrapper } from "../lib/contextApi";

// router
import { useRouter } from "next/router";

// head
import Head from "next/head";

// theme
import { themes } from "../lib/theme";

// components
import ResponsiveAppBar from "../components/navbar";
import MultiActionAreaCard from "../components/card";
import Footer from "../components/footer";
import Profile from "../components/profile";
import { callAPI } from "../api/api";

// image
const bannerImage = "/images/banner.jpg";
const banner2Image = "/images/banner2.avif";

// loader
import { Loader3 } from "../components/loader";

interface ResponseType {
  message: string;
  data: {};
  errors: Array<{}>;
}

const Home = () => {
  const router = useRouter();

  const [themeColor, setThemeColor] = useState(themes.light);
  const [matches, setMatches] = useState(false);
  const [showName, setShowName] = useState(false);
  const [projects, setProjects] = useState([]);
  const { session, theme, themeCallback,data } = useWrapper();
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loader, setLoader] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  // const [data, setData] = useState<object>({});

  const loadProject = async () => {
    setLoader(true);
    const response: ResponseType = await callAPI("project");
    setLoader(false);

    const { message, data, errors } = response;
    if (message === "success") {
      if (typeof data === "object") {
        setProjects(data["data"]);
      }
    } else if (message === "failure") {
      errors.map((errorObject: any) => {
        const { errorMessage } = errorObject;
        alert(errorMessage);
      });
    } else {
      alert("Some Server error");
    }
  }
  const loadPhoneNumber = async () => {
    setLoader(true);
    const response: ResponseType = await callAPI(
      'phoneNumber',
    );
    setLoader(false);
    const { message, data, errors } = response;
    if (message === "success") {
      if (typeof data === "object") {
        const phoneNumber = data['data'].phoneNumber
        setPhoneNumber(phoneNumber);
      }
    } else if (message === "failed") {
      errors.map((errorObject: any) => {
        const { errorMessage } = errorObject;
        alert(errorMessage);
      });
    } else {
      alert("Some Server error");
    }
  }

  const componentDidMount = async () => {
    loadPhoneNumber();
    loadProject();
    setLoader(true);
    // const response: ResponseType = await callAPI(
    //   'profile',
    // );
    // setLoader(false);
    // const { message, data, errors } = response;
    // if (message === "success") {
    //   if (typeof data === "object") {
    //     setData(data['data']);
    //   }
    // } else if (message === "failed") {
    //   errors.map((errorObject: any) => {
    //     const { errorMessage } = errorObject["error"];
    //     alert(errorMessage);
    //   });
    // } else {
    //   alert("Some Server error");
    // }

  };




  const moveToProject = (name: string) => {
    const check: any[] = projects.filter((data: any, index: number) => {
      return data["title"].toLowerCase() === name.toLowerCase();
    });
    if (check.length > 0) {
      return alert("Project name already exist");
    }
    if (name.length > 0) {
      router.push(
        {
          pathname: "/projectScreen",
          query: { name: name },
        },
        "/projectScreen"
      );
    } else {
      alert("Enter correct project name");
    }
  };

  const AddName = ({ close, save }) => {
    const [fieldName, setName] = useState("");

    return (
      <div className={PS.glass}>
        <div
          className={PS.cBox}
          style={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "space-between",
            background: "white",
            height: "20%",
          }}
        >
          <div
            style={{
              // borderBottom: "1px solid black",
              display: "flex",
              height: "20%",
              width: "100%",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                fontFamily: "arieal",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                color: " rgb(41, 91, 228)",
                marginLeft: "10px",
              }}
            >
              Add ProjectName
              <span
                style={{
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={close}
              >
                <span
                  style={{ height: "14px", color: "red", fontWeight: "400" }}
                >
                  {" "}
                  CLOSE
                </span>
              </span>
            </span>
          </div>

          <div
            className={PS.details}
            style={{ width: "90%", marginLeft: "3%", color: " black" }}
          >
            <span>Name</span>
            <input
              style={{
                marginLeft: "3%",
                height: "30px",
                width: "60%",
                borderRadius: "3px",
                border: "1px solid black",
              }}
              type="name"
              name="Name"
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
          </div>

          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                save(fieldName);
              }}
              style={{
                height: "30px",
                width: "20%",
                borderRadius: "5px",
                cursor: "pointer",
                background: "#007bff",
                marginLeft: "3%",
                marginBottom: "1%",
                border: "none",
                color: "white",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (typeof window !== "undefined") {
    window.matchMedia("(min-width: 900px)").matches;
  }

  useEffect(() => {
    window
      .matchMedia("(max-width: 900px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    componentDidMount();
    if (theme === "light") {
      setThemeColor(themes.light);
    } else {
      setThemeColor(themes.dark);
    }
    return () => { };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HOME</title>
      </Head>
      {session === null ? (
        <div></div>
      ) : (
        <div
          style={{
            backgroundColor: themeColor.background,
            height: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ResponsiveAppBar
            callBack={() => {
              if (theme == "light") {
                themeCallback("dark");
                setThemeColor(themes.dark);
              } else {
                themeCallback("light");
                setThemeColor(themes.light);
              }
            }}
            color={themeColor.navbackground}
            colour={themeColor.text}
            createProject={() => { setShowName(true) }}
            phoneNumber={phoneNumber}
            profile={() => { setShowProfile(true) }}
          />

          {matches == false && (
            <div className={H.banner}>
              <div className={H.rbanner}>
                { data!==undefined ? 
                <img
                src={data['bannerImage']}
                style={{
                  height: "100%",
                  width: "100%",
                  margin: "0px",
                  borderRadius: "50px",
                }}
              />
                : <img
                  src={banner2Image}
                  style={{
                    height: "100%",
                    width: "100%",
                    margin: "0px",
                    borderRadius: "50px",
                  }}
                />}
              </div>

              <div className={H.lbanner}>
                {data===undefined?<h1
                  style={{
                    color: themeColor.headColor,
                    width: "80%",
                    fontFamily: "monospace",
                    letterSpacing: ".3rem",
                  }}
                >
                  {" "}
                  Welcome to my Portal!{" "}
                </h1>:<h1
                  style={{
                    color: themeColor.headColor,
                    width: "80%",
                    fontFamily: "monospace",
                    letterSpacing: ".3rem",
                  }}
                >
                  {" "}
                  {data['homePageTitle']}
                </h1>}
                {data === undefined ? <p style={{ color: themeColor.text, width: "80%" }}>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  adipisci mollitia facilis reiciendis quibusdam nulla repellat,
                  consequuntur commodi maiores officiis ea ducimus quidem
                  voluptates eaque nesciunt non, magni nobis enim?
                  Reprehenderit, fugiat architecto. Assumenda veritatis ratione
                  temporibus, nostrum sunt impedit quas molestias eos
                  doloremque, dolore qui ullam? Vero illum veritatis ullam nihil
                  perferendis enim assumenda, nisi dolorum. Ipsam dolores quas
                  facilis nisi ipsa pariatur, ullam modi quam iure labore,
                  ducimus non magnam enim sequi omnis obcaecati veniam tempore!
                  Tempora itaque porro sit at placeat suscipit vero, quos
                  officiis atque ipsam vel unde rem eum modi vitae repellendus
                  id, expedita tempore?{" "}
                </p> :
                  <p style={{ color: themeColor.text, width: "80%" }}>
                    { data['description']}
                  </p>}
              </div>
            </div>
          )}

          {matches == true && (
            <div className={H.banner}>
              <div className={H.bannertext}>
              {data===undefined?<h1
                  style={{
                    color: themeColor.headColor,
                    width: "80%",
                    fontFamily: "monospace",
                    letterSpacing: ".3rem",
                  }}
                >
                  {" "}
                  Welcome to my Portal!{" "}
                </h1>:<h1
                  style={{
                    color: themeColor.headColor,
                    width: "80%",
                    fontFamily: "monospace",
                    letterSpacing: ".3rem",
                  }}
                >
                  {" "}
                  {data['homePageTitle']}
                </h1>}
                {data === undefined ? <p style={{ color: themeColor.text, width: "80%" }}>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  adipisci mollitia facilis reiciendis quibusdam nulla repellat,
                  consequuntur commodi maiores officiis ea ducimus quidem
                  voluptates eaque nesciunt non, magni nobis enim?
                  Reprehenderit, fugiat architecto. Assumenda veritatis ratione
                  temporibus, nostrum sunt impedit quas molestias eos
                  doloremque, dolore qui ullam? Vero illum veritatis ullam nihil
                  perferendis enim assumenda, nisi dolorum. Ipsam dolores quas
                  facilis nisi ipsa pariatur, ullam modi quam iure labore,
                  ducimus non magnam enim sequi omnis obcaecati veniam tempore!
                  Tempora itaque porro sit at placeat suscipit vero, quos
                  officiis atque ipsam vel unde rem eum modi vitae repellendus
                  id, expedita tempore?{" "}
                </p> :
                  <p style={{ color: themeColor.text, width: "80%" }}>
                    {" "}
                    {data && data['description']}
                  </p>}
              </div>
            </div>
          )}

          <div className={H.content}>
            <h1
              style={{
                color: themeColor.headColor,
                fontFamily: "monospace",
                letterSpacing: ".3rem",
                fontSize: "30px",
              }}
            >
              {" "}
              Projects{" "}
            </h1>
            {projects.length > 0 ? (
              loader ? (
                <Loader3 />
              ) : (
                <div className={H.cards}>
                  {projects.map((data: any, index: number) => {
                    return (
                      <MultiActionAreaCard
                        key={index}
                        description={data["description"]}
                        id={data["id"]}
                        title={data["title"]}
                        thumbanailUrl={data["thumbnailurl"]}
                        date={data["date"]}
                        backgroundColor={themeColor.cardBackground}
                        textColor={themeColor.text}
                        headColor={themeColor.headColor}
                        update={true}
                        projectUrl={data["projectLink"]}
                        phoneNumber={phoneNumber}
                      />
                    );
                  })}
                </div>
              )
            ) : (
              <div
                style={{
                  color: themeColor.text,
                  height: "300px",
                  backgroundColor: themeColor.cardBackground,
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px doted blue",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowName(true);
                }}
              >
                <h3> CREATE PROJECT +</h3>
              </div>
            )}
          </div>
          {matches !== true ? (
            <div className={H.content}>
              <h1
                style={{
                  color: themeColor.headColor,
                  fontFamily: "monospace",
                  letterSpacing: ".3rem",
                  fontSize: "30px",
                }}
              >
                Declaration
              </h1>
              <div
                className={H.declaration}
                style={{
                  boxShadow: "1px 1px 2px 2px grey",
                  width: "50%",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    color: themeColor.text,
                    fontWeight: "bold",
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                    marginLeft: "15px",
                  }}
                >
                  {" "}
                  I do hereby state that all the details mentioned above are
                  accurate to the best of my familiarity and confidence. I bear
                  the accountability for any blunder or mistake in the future.{" "}
                </p>
                <span
                  style={{
                    color: themeColor.text,
                    fontWeight: "bold",
                    marginTop: "40px",
                    marginBottom: "20px",
                    marginLeft: "15px",
                  }}
                >
                  {data['user']!==undefined ? data['user'].name:<>userName</>}
                </span>
              </div>
            </div>
          ) : (
            <div className={H.content}>
              <h1
                style={{
                  color: themeColor.headColor,
                  fontFamily: "monospace",
                  letterSpacing: ".3rem",
                  fontSize: "30px",
                }}
              >
                Declaration
              </h1>
              <div
                className={H.declaration}
                style={{
                  boxShadow: "1px 1px 2px 2px grey",
                  width: "80%",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    color: themeColor.text,
                    fontWeight: "bold",
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                    marginLeft: "15px",
                  }}
                >
                  {" "}
                  I do hereby state that all the details mentioned above are
                  accurate to the best of my familiarity and confidence. I bear
                  the accountability for any blunder or mistake in the future.{" "}
                </p>
                <span
                  style={{
                    color: themeColor.text,
                    fontWeight: "bold",
                    marginTop: "40px",
                    marginBottom: "20px",
                    marginLeft: "15px",
                  }}
                >
                  {data!==undefined && data['user'].name}
                </span>
              </div>
            </div>
          )}
          <Footer
            textColor={themeColor.text}
            iconColor={themeColor.iconColor}
            borderColor={themeColor.borderColor}
            backgroundColor={themeColor.navbackground}
            data={data}
          />
        </div>
      )}

      {showName && (
        <AddName
          close={() => {
            setShowName(false);
          }}
          save={moveToProject}
        />
      )}
      {showProfile && <Profile phoneNumber={phoneNumber} callBack={() => { setShowProfile(false) }} />}
    </React.Fragment>
  );
};

export default Home;
