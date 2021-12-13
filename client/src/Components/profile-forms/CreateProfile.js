import React from 'react'

const CreateProfile = () => {
//     const [formData, setFormData] = useState(   
//     {bio:'',
//     location:'',
//     from:'',
//     birthdate:'',
//     creationDate:'',
//     experience:[{
//         title:'',
//         location:'',
//         from:'',
//         to:''
//     }],
//     education:[{
//         school:'',
//         degree:'',
//         fieldOfStudy:'',
//         from:'',
//         to:''
//     }]
// })
    return (
        <div>
            <form>
                <label>Bio:</label>
                <textarea name="bio" cols="30" rows="10"></textarea>
                <label></label>
            </form>
        </div>
    )
}

export default CreateProfile
