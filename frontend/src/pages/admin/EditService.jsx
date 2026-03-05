import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../api/api"
import "../../pages/admin/CreateService.css"

export default function EditService(){

 const { id } = useParams()
 const navigate = useNavigate()

 const [form,setForm] = useState(null)

 useEffect(()=>{

   api.get("/services").then(res=>{
     const service = res.data.find(s => s._id === id)
     setForm(service)
   })

 },[id])


 const updateDetail = (index, field, value)=>{

   const updated = [...form.details]
   updated[index][field] = value

   setForm({...form,details:updated})
 }


 const addDetail = ()=>{

   setForm({
     ...form,
     details:[...form.details,{heading:"",body:""}]
   })

 }


 const removeDetail = (index)=>{

   const updated = form.details.filter((_,i)=>i!==index)

   setForm({...form,details:updated})

 }


 const handleSubmit = async(e)=>{

   e.preventDefault()

   await api.put(`/services/${id}`,form)

   navigate("/admin/services")

 }

 if(!form) return <p>Loading...</p>


 return(

  <div className="container">

   <h1>Edit Service</h1>

   <form onSubmit={handleSubmit} className="admin-form">

    <div className="form-row">

      <div>
        <label>Title</label>
        <input
          value={form.title}
          onChange={(e)=>setForm({...form,title:e.target.value})}
        />
      </div>

      <div>
        <label>Slug</label>
        <input
          value={form.slug}
          onChange={(e)=>setForm({...form,slug:e.target.value})}
        />
      </div>

    </div>


    <div className="form-row">

      <div>
        <label>Icon</label>
        <input
          value={form.icon || ""}
          onChange={(e)=>setForm({...form,icon:e.target.value})}
        />
      </div>

      <div>
        <label>Color</label>
        <input
          type="color"
          value={form.color || "#6366f1"}
          onChange={(e)=>setForm({...form,color:e.target.value})}
        />
      </div>

    </div>


    <div>

      <label>Description</label>

      <textarea
        value={form.description}
        onChange={(e)=>setForm({...form,description:e.target.value})}
      />

    </div>


    <h3>Service Details</h3>

    {form.details?.map((detail,index)=>(
      <div className="detail-block" key={index}>

        <input
          placeholder="Heading"
          value={detail.heading}
          onChange={(e)=>updateDetail(index,"heading",e.target.value)}
        />

        <textarea
          placeholder="Body"
          value={detail.body}
          onChange={(e)=>updateDetail(index,"body",e.target.value)}
        />

        <button
          type="button"
          onClick={()=>removeDetail(index)}
        >
          Remove
        </button>

      </div>
    ))}


    <button type="button" onClick={addDetail}>
      Add Detail
    </button>


    <button type="submit" className="btn btn-solid">
      Update Service
    </button>


   </form>

  </div>

 )
}