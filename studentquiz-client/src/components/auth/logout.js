export default function Logout(props) {
    localStorage.clear();
    props.history.push('/login');
    return null;
}