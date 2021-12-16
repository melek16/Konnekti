

const ExpField = ({formData,modifyData,addExpOrEdu,removeExpOrEdu}) => {
    return (
<fieldset>
                            <h2>Work experience</h2>
                            <div className='addBtn' onClick={()=>addExpOrEdu('experience')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                                <path d="M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                            </svg>
                                Add Work experience
                                </div>
                            {formData.experience&&formData.experience.map((exp,i)=>
                            <fieldset className='edu_exp_fields' key={i}>
                                <label>Title: </label>
                                <input type="text" value={exp.title} onChange={e=>modifyData(e,'experience','title',i)}/>
                                <label>Location: </label>
                                <input type="text" value={exp.location} onChange={e=>modifyData(e,'experience','location',i)}/>
                                <fieldset className='duration_field'>
                                    <label>From: </label>
                                    <input type="date" className="dateField"  value={exp.from&&new Date(exp.from).toISOString().slice(0,10)} onChange={e=>modifyData(e,'experience','from',i)}/>
                                    <label>to: </label>
                                    <input type="date" className="dateField" value={exp.to&&new Date(exp.to).toISOString().slice(0,10)} onChange={e=>modifyData(e,'experience','to',i)}/>
                                </fieldset>
                                <div className='rmvBtn' onClick={()=>removeExpOrEdu('experience',i)}>Remove</div>
                            </fieldset>)}
                            
                    </fieldset>
    )
}

export default ExpField
