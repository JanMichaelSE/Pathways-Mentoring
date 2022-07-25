import styles from "./contact-us.module.css"
import Navbar from "../../../components/Students/StudentsNavbar/students-navbar"
import Input from "../../../components/common/Input/input"
import { Checkbox } from '@chakra-ui/react'

export default function ContactUs() {
  return (
    <>
    <div className={styles.contactUsBackground}>
    <Navbar />
    <div className={styles.segmentContainer}>
      <div className={styles.contactUsForm}>
          <div className={styles.formSegment}>
            <img
            src="/assets/Contact.svg"
            alt="ContactIcon"
            className={styles.LogoLink}
            />
            <h2 className={styles.SubHeading}>
              Contact Pathways
            </h2>
          </div>
          <div className={styles.formSegment}>
            <Input label={"Name *"}/>
            <Input label={"Topic *"}/>
          </div>
          <div className={styles.formSegment}>
            <Input label={"Email *"}/>
            <Input label={"Phone Number *"}/>
          </div>
          <div className={styles.formSegment}>
            <Input label={"Message *"}/>
          </div>
          <div className={styles.formSegment}>
            <Checkbox iconColor='grey.400' iconSize='1rem'>
              I have read and agree to the Privacy Policy of the Polytechnic University of Puerto Rico.
            </Checkbox>
          </div>
      </div>
      <div className={styles.pathwaysStaff}>
          <div className={styles.StaffContactBox}>
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
    </div>
    </>
  )
}