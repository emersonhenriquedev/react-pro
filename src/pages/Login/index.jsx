import RegisterImage from '../../assets/registerLoginImage.svg';
import LoginCard from './components/LoginCard';

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className=" flex-1 pr-3">
        <img src={RegisterImage} alt="" className='h-full' />
      </div>
      <div className="bg-gray-100 flex justify-center items-center flex-1 border-l">
        <LoginCard />
      </div>
    </div>
  );
}
