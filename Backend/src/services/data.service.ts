import { IQuestion } from "./../types/index.d";
/*
This service provides hardcoded data that must be consumed by the server in different endpoints & models.
*/

function recordData() {
  return [
    {
      title: "Identify Hypothesis or Research Question",
      description:
        "Identify Hypothesis or Research Question deliver to the mentor (Research proposal).;Deliver the subject to the mentor.",
      studentId: "",
      mentorId: "",
    },
    {
      title: "Research Literature",
      description:
        "Research literature about the selected subject. Books, articles or any other reference source that attempt to explain, describe, define and provide a background or theoretical framework for a field of inquiry.;Deliver the references to the mentor.",
      studentId: "",
      mentorId: "",
    },
    {
      title: "Define Methodology",
      description:
        "Define how the investigation will be conducted including the discussion and explanation of the data collection and analysis method used in the research.;Deliver the defined methodology to the mentor.",
      studentId: "",
      mentorId: "",
    },
    {
      title: "Run Experiment / Fieldwork",
      description:
        "Complete the investigation process following the methodology defined.;Deliver the progress on the experiment and fieldwork process to the mentor.",
      studentId: "",
      mentorId: "",
    },
    {
      title: "Gather Data",
      description: "Deliver raw data to the mentor.",
      studentId: "",
      mentorId: "",
    },
    {
      title: "Analyze",
      description:
        "Analyze the data gathered.;Deliver any findings, patterns or results obtained by the data analysis to the mentor.",
      studentId: "",
      mentorId: "",
    },
    {
      title: "Report",
      description:
        "Develop a full report of the results obtained by the analysis of the data gathered.;Deliver a document with all the details related with your research to the mentor including Subject, Problem, Hypothesis, Methodology, Data Analysis (Tables & Graphs), Analysis of Results, and Conclusion.",
      studentId: "",
      mentorId: "",
    },
  ];
}

function initialDevelopmentPlanData(): IQuestion[] {
  return [
    {
      question: "What are your Immediate goals (6 months - 1 year)?",
      type: "Multi-Answer",
      isDevelopmentPlan: true,
    },
    {
      question: "What are your short-term goals (1 - 2 years)?",
      type: "Multi-Answer",
      isDevelopmentPlan: true,
    },
    {
      question: "What are your intermediate-term goals (2 - 5 years)?",
      type: "Multi-Answer",
      isDevelopmentPlan: true,
    },
    {
      question: "What are your long-term goals (5 - 10 years)??",
      type: "Multi-Answer",
      isDevelopmentPlan: true,
    },
    {
      question: "What are your utlimate goal?",
      type: "Multi-Answer",
      isDevelopmentPlan: true,
    },
    {
      question: "What competencies and skills will you need to successfully reach your goals?",
      type: "Text",
      isDevelopmentPlan: true,
    },
    {
      question:
        "What activities and experiencies will you engage in to gain the competencies and skills?",
      type: "Text",
      isDevelopmentPlan: true,
    },
    {
      question: "How will you assess your progress in masteriung these competencies and skills?",
      type: "Text",
      isDevelopmentPlan: true,
    },
    {
      question: "Who will help you reach your goals and how?",
      type: "Text",
      isDevelopmentPlan: true,
    },
  ];
}

function initialAssessmentQuestionsData(): IQuestion[] {
  return [
    {
      question: "Whats your email?",
      type: "Text",
    },
    {
      question: "What is your first name?",
      type: "Text",
    },
    {
      question: "What is your last name?",
      type: "Text",
    },
    {
      question:
        "Do you know going to graduate school is one possible career move after completing a bachelors degree?",
      type: "Select",
      options: "Yes;No;Maybe",
    },
    {
      question: "Do you consider going to graduate school as a possible career move?",
      type: "Select",
      options: "Yes;No;Maybe",
    },
    {
      question: "Would you like additional information about how to get into graduate school?",
      type: "Select",
      options: "Yes;No;Maybe",
    },
    {
      question:
        "Do you need help with understanding of necessary research courses in my discipline?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with understanding the stages of a research project?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with narrowing down my research ideas?",
      type: "Rating",
      options: "1;2;3;4;5",
    },

    {
      question: "Do you need help with identifying sources related to my research topic?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with using appropriate citation styles?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with writing a literature review?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Do you need help with identifying methodologies that are appropriate for my topic?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with understanding quantitative methods?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with identifying statistical tests appropriate for my data?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with writing for academic journals and/or conferences?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with presenting research orally?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with developing visual aids based on my research?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with creating a poster based on my research?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Do you need help with identifying a research experience?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Indicate your level of knowledge in your ability to design a scientific study.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Indicate your level of knowledge in your ability to identify and focus on a specific research topic.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Indicate your level of knowledge in your ability to identify sources for my topic.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "Indicate your level of knowledge in your ability to write a literature review.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Indicate your level of knowledge in your ability to identify a methodology that matches the limitations and enhances the possibilities of my question/topic of inquiry.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Indicate your level of knowledge in your ability to gather data following a methodology.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Indicate your level of knowledge in your ability to identify a statistical test that suits the design of my study.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Indicate your level of knowledge in your ability to identify analysis tools and processes that suit my data.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Indicate your level of knowledge in your ability to write effectively for a scholarly publication.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Indicate your level of knowledge in your ability to present my research effectively at a scholarly venue.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Please indicate your level of agreement with working in groups has helped me ensure mastery of the subject matter.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Please indicate your level of agreement with working in groups has helped me develop my ability to use concepts in thinking and problem-solving in the subject matter.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Please indicate your level of agreement with working in groups has enhanced my interpersonal and team interaction skills.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Please indicate your level of agreement with working in groups has prepared me to be a lifelong learner.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "Please indicate your level of agreement with working in groups has been a satisfactory experience.",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides advice on planning coursework to complete bachelor's?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides advice on planning coursework to prepare for graduate school?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides help with evaluating my choice of major?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides advice on improving academic performance (GPA)?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides assistance in improving my computer and library research skills?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides tutoring services for specific classes?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides help with learning about the benefits of graduate school?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides help with learning about the graduate school application process?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides help with learning about graduate degree options?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides help with preparing for graduate entrance examination?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides letters of recommendation?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides help with writing an effective personal statement?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides advice to fit my interests to a field of study/major?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question:
        "How important do you feel is having a service that provides orientation about financial aid?",
      type: "Rating",
      options: "1;2;3;4;5",
    },
    {
      question: "What is your major/field of study?",
      type: "Text",
    },
    {
      question: "What is your gender?",
      type: "Select",
      options: "Male;Female;Prefer not to say;Other",
    },
    {
      question:
        "To the best of your knowledge, are you first generation (neither parent completed college), low income (according to your/your parent's tax returns), underrepresented (African-American, American Indian/Alaska Native, Hispanic or Latino, and Native Hawaiian or other Pacific Islander)? (Multiple answer allowed)",
      type: "Multi-Select",
      options: "First Generation;Low Income;Underrepresented;None",
    },
    {
      question: "What is your classification?",
      type: "Select",
      options:
        "Freshman (1) (0 – 36);Sophomore (2) (37 – 72);Junior (3) (73 – 108);Senior (4) (109 +)",
    },
    {
      question: "What is your cumulative GPA range?",
      type: "Select",
      options: "Under 2.0;2.0-2.5;2.51-3.0;3.01-3.5;3.51-4.0",
    },
    {
      question:
        "Do you plan to attend graduate school immediately after receiving the bachelor's degree?",
      type: "Select",
      options: "Yes;No;Maybe",
    },
    {
      question: "Have you had any formal research experience?",
      type: "Select",
      options: "Yes;No",
    },
  ];
}

export { recordData, initialDevelopmentPlanData, initialAssessmentQuestionsData };
