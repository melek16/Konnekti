import React from 'react'

const GeneralInfoField = ({formData,modifyData}) => {
    return (<fieldset>
        <h2>Intro</h2>
                <fieldset id="general_info_field">
                    <label>Bio: </label>
                    <textarea name="bio" cols="30" rows="5" value={formData.bio} onChange={(e)=>modifyData(e,'bio')}></textarea>
                    <label>Lives in: </label>
                    <input type="text" value={formData.location} onChange={(e)=>modifyData(e,'location')}/>
                    <label>Originally from: </label>
                    <input type="text" value={formData.from} onChange={(e)=>modifyData(e,'from')}/>
                    <label>Birthdate: </label>
                    <input type="date" value={formData.birthdate&&new Date(formData.birthdate).toISOString().slice(0,10)} onChange={(e)=>modifyData(e,'birthdate')}/>
                </fieldset>
            </fieldset>
    )
}

export default GeneralInfoField
