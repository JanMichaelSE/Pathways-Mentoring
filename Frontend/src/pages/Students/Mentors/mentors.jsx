import styles from "./mentors.module.css"
import Navbar from "../../../components/Students/StudentsNavbar/students-navbar"

function Mentors() {
  return (
    <>
      <div className={styles.mentorsBackground}>
        <Navbar />
        <div className={styles.mentorsCardContainer}>
          <div className={styles.MentorCardBox}>
          <div>
              <Avatar size='lg' name='Jan Montalvo' src='assets/Jan.png' />
            </div>
            <h3>Jan Montalvo</h3>
            <h4>CS/COE</h4>
            <div className={styles.linkBoxes}>
              <img 
              src="/assets/Gmail-logo.svg"
              alt="EmailIcon"
              className={styles.LogoLink}
              />
              <img 
              src="/assets/Phone-Squared.svg"
              alt="PhoneIcon"
              className={styles.LogoLink}
              />
              <img 
              src="/assets/Company.svg"
              alt="CompanyIcon"
              className={styles.LogoLink}
              />
            </div>
          </div>
          <div className={styles.MentorCardBox}>
          <div>
              <Avatar size='lg' name='Jan Montalvo' src='assets/Jan.png' />
            </div>
            <h3>Jan Montalvo</h3>
            <h4>CS/COE</h4>
            <div className={styles.linkBoxes}>
              <img 
              src="/assets/Gmail-logo.svg"
              alt="EmailIcon"
              className={styles.LogoLink}
              />
              <img 
              src="/assets/Phone-Squared.svg"
              alt="PhoneIcon"
              className={styles.LogoLink}
              />
              <img 
              src="/assets/Company.svg"
              alt="CompanyIcon"
              className={styles.LogoLink}
              />
            </div>
          </div>
          <div className={styles.MentorCardBox}>
          <div>
              <Avatar size='lg' name='Jan Montalvo' src='assets/Jan.png' />
            </div>
            <h3>Jan Montalvo</h3>
            <h4>CS/COE</h4>
            <div className={styles.linkBoxes}>
              <img 
              src="/assets/Gmail-logo.svg"
              alt="EmailIcon"
              className={styles.LogoLink}
              />
              <img 
              src="/assets/Phone-Squared.svg"
              alt="PhoneIcon"
              className={styles.LogoLink}
              />
              <img 
              src="/assets/Company.svg"
              alt="CompanyIcon"
              className={styles.LogoLink}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mentors