import LoggedinUser from './includes/loggedin';
import SessionDetails from './includes/session';

const Header = () => {
    return (
        <>
            <LoggedinUser />
            <SessionDetails />
        </>
    );
}

export default Header;
