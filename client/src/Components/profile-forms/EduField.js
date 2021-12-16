

const EduField = ({formData,modifyData,addExpOrEdu,removeExpOrEdu}) => {
    return (
        <fieldset>
        <h2>Education</h2>
        <div className='addBtn' onClick={()=>addExpOrEdu('education')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path d="M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
        </svg>
            Add Education
            </div>
        {formData.education&&formData.education.map((edu,i)=>
        <fieldset className='edu_exp_fields' key={i}>
            <label>School: </label>
            <input type="text" value={edu.school} onChange={e=>modifyData(e,'education','school',i)}/>
            <label>Degree: </label>
            <input type="text" value={edu.degree} onChange={e=>modifyData(e,'education','degree',i)}/>
            <label>Field of study: </label>
            <input type="text" value={edu.fieldOfStudy} onChange={e=>modifyData(e,'education','fieldOfStudy',i)}/>
            <fieldset className='duration_field'>
                <label>From: </label>
                <input type="date" className="dateField"  value={edu.from&&new Date(edu.from).toISOString().slice(0,10)} onChange={e=>modifyData(e,'education','from',i)}/>
                <label>to: </label>
                <input type="date" className="dateField"  value={edu.to&&new Date(edu.to).toISOString().slice(0,10)} onChange={e=>modifyData(e,'education','to',i)}/>
            </fieldset>
            <div className='rmvBtn' onClick={()=>removeExpOrEdu('education',i)}>Remove</div>
        </fieldset>)}
        
        </fieldset>
    )
}

export default EduField
