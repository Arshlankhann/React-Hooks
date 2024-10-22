import { useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  const onSubmit = async (data) => {
    // await delay(2)
    let r = await fetch("http://localhost:3000/", {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(data)
    })
    let res = await r.text()
    console.log(data, res);
  }

  return (
    <>
      {isSubmitting && <div>Loading...</div>}
      <div className="container">
        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='Username' {...register("username", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 8, message: "Max length is 8" } })} type='text'></input>
          {errors.username && <div>{errors.username.message}</div>}
          <br></br>
          <input placeholder='Password' {...register("password")} type='password'></input>
          <br></br>
          <input disabled={isSubmitting} type='submit' value='submit'></input>
        </form>
      </div >

    </>
  )
}

export default App

