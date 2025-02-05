

export const Button = ({btn}:{btn:string}) => {
  return (
    <div>
        <button type="button" className="text-white bg-green-700   font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">{btn}</button>
      
    </div>
  )
}

export default Button
