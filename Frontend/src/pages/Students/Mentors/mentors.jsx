import styles from "./mentors.module.css";
import MentorsNavbar from "../../../components/Mentors/MentorsNavbar/mentors-navbar";

function Mentors() {
  const avatarimgs = [
    "#avatar01",
    "#avatar02",
    "#avatar03",
    "#avatar04",
    "#avatar05",
    "#avatar06",
    "#avatar07",
    "#avatar08",
    "#avatar09",
    "#avatar10",
    "#avatar11",
    "#avatar12",
    "#avatar13",
    "#avatar14",
    "#avatar15",
    "#avatar16",
    "#avatar17",
    "#avatar18",
    "#avatar19",
    "#avatar20",
    "#avatar21",
    "#avatar22",
    "#avatar23",
    "#avatar24",
    "#avatar25",
    "#avatar26",
    "#avatar27",
    "#avatar28",
    "#avatar29",
    "#avatar30",
    "#avatar31",
    "#avatar32",
    "#avatar33",
    "#avatar34",
    "#avatar35",
    "#avatar36",
    "#avatar37",
    "#avatar38",
    "#avatar39",
    "#avatar40",
    "#avatar41",
    "#avatar42",
    "#avatar43",
    "#avatar44",
    "#avatar45",
    "#avatar46",
    "#avatar47",
    "#avatar48",
    "#avatar49",
    "#avatar50",
    "#avatar51",
    "#avatar52",
  ];

  const ImageList = (props) => {
    console.log(props.images);
    const images = props.images.map((image) => {
      return (
        <svg key={image} className={styles.icon}>
          <use xlinkHref={"/assets/avatarAssets/sprite.svg" + image}></use>
        </svg>
      );
    });

    return <div>{images}</div>;
  };
  return (
    <div>
      View Mentors
      <ImageList images={avatarimgs} />
    </div>
  );
}

export default Mentors;
