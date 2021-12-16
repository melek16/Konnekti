import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProfile } from '../../actions/profile'
import EduField from './EduField'
import ExpField from './ExpField'
import GeneralInfoField from './GeneralInfoField'


const CreateProfile = () => {
    const {profile} = useSelector(state => state.profile)
    const [formData, setFormData] = useState(profile) 
    
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const modifyData=(e,field,secondField,i)=>{
        let copy={...formData}
        let n=e.target.value
        if(!secondField){
            copy[field]=n
        }else{
            copy[field][i][secondField]=n
        }
        setFormData({...copy})
    }

    const addExpOrEdu=(which)=>{
        const emptyEdu={school:'',degree:'',fieldOfStudy:'',from:'',to:''}
        const emptyExp={title:'',location:'',from:'',to:''}
        const newEmpty=which==='education'?emptyEdu:emptyExp
        let copy={...formData}
        if(copy[which]===undefined || copy[which]===null){
            copy[which]=[newEmpty]
        }else{
            copy[which].unshift(newEmpty)
        }
        setFormData({...copy})
    }

    const removeExpOrEdu=(which,i)=>{
        let copy={...formData}
        copy[which].splice(i,1)
        setFormData({...copy})
    }

    const onSubmit=e=>{
        e.preventDefault()
        const emptyEdu={school:'',degree:'',fieldOfStudy:'',from:'',to:''}
        const emptyExp={title:'',location:'',from:'',to:''}
        let copy={...formData}
        copy.education=copy.education?copy.education.filter(edu=> JSON.stringify(edu) !== JSON.stringify(emptyEdu) ):copy.education
        copy.experience=copy.experience?copy.experience.filter(exp=> JSON.stringify(exp) !== JSON.stringify(emptyExp) ):copy.experience
        copy.education= !(Array.isArray(copy.education) && copy.education.length)?null :copy.education
        copy.experience= !(Array.isArray(copy.experience) && copy.experience.length)?null  :copy.experience
        dispatch(createProfile(copy))
        setTimeout(()=>navigate('/profile'),1000)
    }

    return (
        <div id="create_profile_form">
            <form onSubmit={onSubmit}>
                <fieldset id="main_fieldset">
                <GeneralInfoField modifyData={modifyData} formData={formData}/>
                <EduField formData={formData} modifyData={modifyData} addExpOrEdu={addExpOrEdu} removeExpOrEdu={removeExpOrEdu}/>
                <ExpField formData={formData} modifyData={modifyData} addExpOrEdu={addExpOrEdu} removeExpOrEdu={removeExpOrEdu}/> 
                </fieldset>  
                <div id="formDone">                
                <button type="submit" id="ApplyChange">Apply change</button>
                <button id="back" onClick={()=>navigate('/profile')}>Back</button>
                </div> 
                
            </form>
        </div>
    )
}

export default CreateProfile
