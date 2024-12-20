
/*---------- Recruiters Array---------*/
let recruiterId = 2
const recruiters = [
    {
    id:1,
    name:"Suraj Nishad",
    email:"surajn838@gmail.com",
    password:'123'
    }
]


/*----------Applicants Array---------*/
let applicantsId = 2
let applicants = [
    {
        id:1,
        name:"Vivek Soni",
        email:"vivek123@gmail.com",
        password:'321',
        appliedJob:[] 
    }
]


/*---------- Jobs Array---------*/
let jobId = 4
let jobsArray = [
    {
        id: 1,
        jobCreater:"surajn838@gmail.com",
        jobCategory: "Tech",
        jobDesignation: "SDE",
        jobLocation: "Gurgaon HR IND Remote",
        companyName: "Coding Ninjas",
        salary:"15-20 Lpa",
        applyBy: "30 Nov 2024",
        skillsRequired: ["React", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
        numberOfOpenings: "5",
        jobPosted: "12/7/2024, 08:31:31 AM",
        applicants:[]
    },
    {
        id: 2,
        jobCreater:"vivek123@gmail.com",
        jobCategory: "Tech",
        jobDesignation: "DevOps",
        jobLocation: "Delhi IND",
        companyName: "Google",
        salary:"10-15 Lpa",
        applyBy: "15 Sep 2024",
        skillsRequired: ["React", "NodeJs", "MongoDB", "Express", "AWS"],
        numberOfOpenings: "10",
        jobPosted: "28/8/2024, 10:15:2 PM",
        applicants:[]
    },
    {
        id: 3,
        jobCreater:"surajn838@gmail.com",
        jobCategory: "Tech",
        jobDesignation: "Full-Stack Developer",
        jobLocation: "Chennai India",
        companyName: "CapgaMini",
        salary:"5-10 Lpa",
        applyBy: "31 Dec 2024",
        skillsRequired: ["React", "SQL", "MongoDB", "Express", "AWS"],
        numberOfOpenings: "7",
        jobPosted: "21/9/2024, 11:10:55 AM",
        applicants:[]
    }
]


const applicantsFunc = () =>{
    return applicants;
}

const recruitersFunc = () =>{
    return recruiters;
}
const jobsArrayFunc = () =>{
    return jobsArray;
}

const createRecruiterModel = (user) =>{
    const {name, email, password} = user
    const id = recruiterId;
    let newRecruiter = { id, name, email, password}
    const getRecruiters = recruitersFunc()
    getRecruiters.push(newRecruiter)
    recruiterId++
}


const findRecruiterModel = (user) => {
    const { email, password} = user;
    const getRecruiters = recruitersFunc()
    const findRecruiter = getRecruiters.filter(recruiter=>recruiter.email == email && recruiter.password == password);
    return findRecruiter;
}

const createJob = (job, creater) => {
    const {
        jobCategory,
        jobDesignation,
        jobLocation,
        companyName,
        salary,
        numberOfOpenings,
        skillsRequired,
        appliedDate
    } = job;
    
    /*------Applied Date-----*/

    const applyBy = dateFormat(appliedDate)

    /*------Posted Date & Time-----*/

    const jobPosted = PostedDateNTime()

    const newJob = {
        id:jobId,
        jobCreater:creater,
        jobCategory,
        jobDesignation,
        jobLocation,
        companyName,
        salary,
        applyBy,
        skillsRequired,
        numberOfOpenings,
        jobPosted,
        applicants:[]
    }

    const jobArray = jobsArrayFunc()
    jobArray.push(newJob)
    jobId++
}

function dateFormat(appliedDate){
    const AppDate = appliedDate;
    const dateApply = new Date(AppDate)
    const applyBy = dateApply.toLocaleDateString('en-GB', { 
        day: 'numeric',
        month: 'short',
        year: 'numeric' });
    return applyBy
}

function PostedDateNTime(){
    const currentDate = new Date()
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;// Month are zero indexed
    const year = currentDate.getFullYear();

    let hours = currentDate.getHours();
    const min = currentDate.getMinutes();
    const sec = currentDate.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12 ;

    const postedDate = `${date}/${month}/${year}`;
    const postedTime = `${hours}:${min}:${sec} ${ampm}`;
    const jobPosted = `${postedDate}, ${postedTime}`;
    return jobPosted;
}


const getJobFromId = (jobId) =>{
    const{ id } = jobId;
    const allJobs = jobsArrayFunc();
    const getJob = allJobs.filter(job =>job.id == id);
    const job = getJob[0];
    return job;
}

const updateJobWithId = (jobId, jobData) =>{
    
    const {
        jobCategory,
        jobDesignation,
        jobCompany,
        jobLocation,
        jobSalary,
        totalPositions,
        jobSkills,
        jobAppliedDate,
    } = jobData;

    /*------Applied Date-----*/

    const applyBy = dateFormat(jobAppliedDate)

    /*------Posted Date & Time-----*/
    

    const updatedJobData = {
        jobCategory:jobCategory,
        jobDesignation:jobDesignation,
        companyName:jobCompany,
        jobLocation:jobLocation,
        salary:jobSalary,
        numberOfOpenings:totalPositions,
        skillsRequired:jobSkills,
        applyBy
    }

    jobsArray = jobsArray.map(job=>{
        if(job.id === jobId){
            return {...job,...updatedJobData}
        } 
            
        return job
    })

    return jobsArray;

}

const deletejobWithId = (jobId) => {
    const id = Number(jobId);
    jobsArray = jobsArray.filter(job=>job.id !== id)
    applicants = applicants.map(app=>({
        ...app,
        appliedJob:app.appliedJob.filter(job=>job.jobId !== id)
    }))
    return jobsArray;
}

const findJobText = (search) =>{
    let searched = search.toLowerCase()
    const job = jobsArray.filter(job=>job.companyName.toLowerCase().includes(searched));
    return job;
}

const addApplicantsInArray = (app) =>{
    const applicant = {id:applicantsId,...app}
    applicantsId++
    console.log(applicant)
    return applicants.push(app)   
}

const checkApplicantsExist = (app) =>{
    const { email, password} = app;
    const findApp = applicants.filter(applicant=>applicant.email == email && applicant.password == password);
    return findApp;
}

/*

const createApplicants = (app, jobCreaterId, applicantsId) =>{
    const appId = Number(applicantsId);
    const jobId = jobCreaterId;

    const allJobs = jobsArrayFunc();
    const getJob = allJobs.filter(job =>job.id == jobId);
    const job = getJob[0];
    const companyName = job.companyName;
    job.applicants.push({appId:appId})

    applicants = applicants.map(applicant=>{
        if(applicant.id === appId){
            applicant.applyFor.push(companyName)
            return {...applicant,...app}
        }        
        return applicant
    })    
}

*/

const createApplicants = (app, jobCreaterId, applicantsId) =>{
    const appId = Number(applicantsId);
    const jobId = Number(jobCreaterId);

    const allJobs = jobsArrayFunc();
    const getJob = allJobs.filter(job =>job.id == jobId);
    const job = getJob[0];
    const companyName = job.companyName;
    job.applicants.push({appId:appId})

    const appDetail = applicants.find(applicant=>applicant.id === appId)
    appDetail.appliedJob.push({jobId, companyName,...app})

}

const applicantsFormData = (jobId) =>{
    const{ id } = jobId;
    const allJobs = jobsArrayFunc();
    const getJob = allJobs.filter(job =>job.id == id);
    const jobApplicants = getJob[0].applicants;

    let applicantAppliedJob = []
    let app = jobApplicants.map(jobApp=>{
    const allApplicants = applicantsFunc()
        // return allApplicants.find(app=> app.id === jobApp.appId)
        allApplicants.find(app=> {
            if(app.id === jobApp.appId){
                app.appliedJob.filter(applied=>{
                    if(applied.jobId == id){
                        applicantAppliedJob.push(applied)
                    }
                })
            }
        })

    })
    return applicantAppliedJob;
}

export {
    createRecruiterModel,
    findRecruiterModel,
    applicantsFunc,
    recruitersFunc,
    jobsArrayFunc,
    createJob,
    getJobFromId,
    updateJobWithId,
    deletejobWithId,

    findJobText,

    addApplicantsInArray,
    checkApplicantsExist,
    createApplicants,
    applicantsFormData
}