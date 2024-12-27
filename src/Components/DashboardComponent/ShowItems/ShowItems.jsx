import "./ShowItems.css";

const ShowItems = ({title,items}) => {
  return (
    <div className="w-100">
        <h4 className="text-center border-bottom">{title}</h4>
        <div className="row gap-2 py-4 px-5">
           {items.map((item,index) =>{
            return(
                <p key={index * 55} className="col-md-2">{item}</p>
            )
           })}
        </div>
    </div>
  )
}

export default ShowItems
