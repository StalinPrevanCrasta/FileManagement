import ShowItems from "../ShowItems/ShowItems"


const HomeComponents = () => {
    const folder = ["New folder","new folder 2"]
    const files = ["New File","New File 2"]

  return (
    <div className="col-md-12 w-100">
        <ShowItems title={"Created Folders"} items={folder}/>
        <ShowItems title={"Created Files"} items={files}/>
      
    </div>
  )
}

export default HomeComponents
