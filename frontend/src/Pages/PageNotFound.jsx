import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-5">
        <h1 className="text-3xl">Error 404 Page Not Found</h1>
        <p>Click here for <Link to={'/'} className="bg-zinc-600 p-2 rounded-md text-white">Home</Link></p>
    </div>
  )
}

export default PageNotFound