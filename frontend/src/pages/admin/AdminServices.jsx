import useApi from "../../hooks/useApi"
import api from "../../api/api"
import { Link } from "react-router-dom"

export default function AdminServices(){

  const {data:services, loading, refetch} = useApi("/services")

  const deleteService = async(id)=>{

    if(!confirm("Delete this service?")) return

    try{
      await api.delete(`/services/${id}`)
      refetch()
    }catch(err){
      alert("Failed to delete service")
    }
  }

  if(loading) return <p>Loading...</p>

  return(

    <div className="container">

      <h1>Services</h1>

      <Link to="/admin/services/create" className="btn btn-solid">
        Add Service
      </Link>

      <table style={{marginTop:30,width:"100%"}}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {services?.map(s=>(
            <tr key={s._id}>

              <td>{s.title}</td>
              <td>{s.slug}</td>

              <td>

                <Link to={`/admin/services/edit/${s._id}`}>
                  Edit
                </Link>

                {" | "}

              <button onClick={() => deleteService(s._id)}>
  Delete
</button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}