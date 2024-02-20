
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav>
            <Link to="/" className=''>All</Link>
            <Link to="/?todos=active" className=''>Tasks</Link>
            <Link to="/?todos=completed" className=''>Finished</Link>
        </nav>
    )
}

export default Navbar