import React from 'react'
import './form.css'
import { useForm } from 'react-hook-form'

const Add = () => {
    const { register, handleSubmit } = useForm()

    // const url = whatEever
    const addCard = (data, event) => {
        event.preventDefault();
        console.log(data);
        //Make a  call to the api to send/ post the data to the database
        // try {
        // const response = await axios.post(url, {
        // label: data.label
        // description: data.description
        // console.log(response.data)
        //}) catch (error) {
        // console.log(error.response)
        //}
        //
    }
    return (
        <section>
            <form onSubmit={handleSubmit(addCard)}>
                <label htmlFor="label" className="formLabel">Label:</label>
                <input type="text" id="label" className="formInput" {...register(label)} />

                <label htmlFor="description" className="formLabel">Description</label>
                <input type="text" id="description" className="formInput" {...register(label)} />

                <button type="submit" className="formButton">Add</button>
            </form>
        </section>
    )
}

export default Add;