import React from 'react'

const ProfileInfoSection = ({profile,formatDate,dateGetYear}) => {
    return (
        <section id="profile_info_section">
        {((profile.loaction||profile.from||profile.birthdate)&&profile.creationDate)&&<div>
                <h2>Intro</h2>
                {profile.location&&profile.location.trim()&&<h4>Lives in <span>{profile.location.trim()}</span></h4>}
                {profile.from&&profile.from.trim()&&<h4>From <span>{profile.from.trim()}</span></h4>}
                {profile.birthdate&&<h4>Born in <span>{formatDate(profile.birthdate)}</span></h4>}
                {profile.creationDate&&<h4>Member since <span>{formatDate(profile.creationDate)}</span></h4>}
        </div>}
       
            


            {profile.education&&profile.education.length!==0&&<div>
                <h2>Education</h2>
            {
            profile.education.map((edu,key)=>
                            <div key={key} className='ee'>
                                <h4>Studied {edu.fieldOfStudy &&<span>{edu.fieldOfStudy}</span>}{edu.school&&' at '}{edu.school&&<span>{edu.school}</span>}</h4>
                                <h5>From <span>{dateGetYear(edu.from)}</span> to <span>{dateGetYear(edu.to)}</span></h5>
                            </div>)
            }
            </div>}



            {profile.experience&&profile.experience.length!==0&&<div>
                <h2>Work experience</h2>
            {
            profile.experience.map((exp,key)=>
                            <div key={key} className='ee'>
                                <h4>Worked at <span>{exp.location}</span> as <span>{exp.title}</span></h4>
                                <h5>From <span>{dateGetYear(exp.from)}</span> to <span>{dateGetYear(exp.to)}</span></h5>
                            </div>)
            }
            </div> }             
        
        </section>
    )
}

export default ProfileInfoSection
